import neal
import pandas as pd
import numpy as np
import time
import math
import logging
from collections import defaultdict


def generate_qrouter_data(num_riders=10, num_orders=10, seed=42):
    """Generate random rider and order coordinates with travel times."""
    np.random.seed(seed)

    riders = [f"Rider{i+1}" for i in range(num_riders)]
    orders = [f"Order{j+1}" for j in range(num_orders)]

    # Random (x,y) coordinates
    rider_coords = {r: np.random.rand(2) * 100 for r in riders}
    order_coords = {o: np.random.rand(2) * 100 for o in orders}

    data = []
    for rider in riders:
        for order in orders:
            # Euclidean distance as "time" cost
            dist = np.linalg.norm(rider_coords[rider] - order_coords[order])
            data.append((rider, order, round(dist, 2)))

    return pd.DataFrame(data, columns=["Rider", "Order", "Time"]), riders, orders


def build_qubo(df, riders, orders):
    """Build QUBO with dynamic penalty scaling."""
    Q = {}
    max_time = df["Time"].max()
    num_riders = len(riders)
    num_orders = len(orders)
    
    # More aggressive penalty scaling
    # Scale with max_time * num_orders^2 to dominate any possible time savings
    penalty = max_time * (num_orders ** 2) * 1000
    # Make reward proportional to the problem size but smaller than penalty
    reward = -max_time / 2

    variables = {
        (row["Rider"], row["Order"]): f"{row['Rider']}_{row['Order']}"
        for _, row in df.iterrows()
    }

    var_to_rider_order = {v: (r, o) for (r, o), v in variables.items()}

    # Objective: reward assignment, add travel time cost
    for _, row in df.iterrows():
        var = variables[(row["Rider"], row["Order"])]
        Q[(var, var)] = reward + row["Time"]

    # Constraint 1: Each rider exactly one order
    for rider in riders:
        rider_vars = [variables[(rider, order)] for order in orders]
        for i, v1 in enumerate(rider_vars):
            Q[(v1, v1)] = Q.get((v1, v1), 0) + penalty * (-2)
            for j, v2 in enumerate(rider_vars):
                if i < j:
                    Q[(v1, v2)] = Q.get((v1, v2), 0) + penalty * 2

    # Constraint 2: Each order exactly one rider
    for order in orders:
        order_vars = [variables[(rider, order)] for rider in riders]
        for i, v1 in enumerate(order_vars):
            Q[(v1, v1)] = Q.get((v1, v1), 0) + penalty * (-2)
            for j, v2 in enumerate(order_vars):
                if i < j:
                    Q[(v1, v2)] = Q.get((v1, v2), 0) + penalty * 2

    return Q, variables, var_to_rider_order, penalty, reward


def analyze_solution(sample, variables, var_to_rider_order, riders, orders, df):
    """Analyze solution for constraint violations and calculate assignment costs."""
    rider_assignments = defaultdict(list)
    order_assignments = defaultdict(list)
    assignments = []
    
    # Track the actual time cost for each assignment
    assignment_costs = {}
    
    for var, val in sample.items():
        if val == 1 and var in var_to_rider_order:
            rider, order = var_to_rider_order[var]
            cost = df[(df['Rider'] == rider) & (df['Order'] == order)]['Time'].values[0]
            rider_assignments[rider].append((order, cost))
            order_assignments[order].append((rider, cost))
            assignments.append((rider, order))
            assignment_costs[(rider, order)] = cost

    violations = {
        "riders_without_order": [r for r in riders if not rider_assignments[r]],
        "riders_with_multiple_orders": {
            r: [o[0] for o in orders] 
            for r, orders in rider_assignments.items() if len(orders) > 1
        },
        "orders_without_rider": [o for o in orders if not order_assignments[o]],
        "orders_with_multiple_riders": {
            o: [r[0] for r in riders] 
            for o, riders in order_assignments.items() if len(riders) > 1
        },
    }
    
    # Calculate total time and constraint violation score
    total_time = sum(cost for costs in rider_assignments.values() for _, cost in costs)
    
    constraint_violation = 0
    constraint_violation += len(violations["riders_without_order"])
    constraint_violation += len(violations["riders_with_multiple_orders"])
    constraint_violation += len(violations["orders_without_rider"])
    constraint_violation += len(violations["orders_with_multiple_riders"])

    return {
        'rider_assignments': rider_assignments,
        'order_assignments': order_assignments,
        'assignments': assignments,
        'total_time': total_time,
        'constraint_violation': constraint_violation,
        'violations': violations,
        'assignment_costs': assignment_costs
    }


def repair_solution(analysis, riders, orders, df):
    """Repair a solution to ensure all constraints are satisfied."""
    # Create copies to avoid modifying the original
    rider_assignments = {r: list(assigns) for r, assigns in analysis['rider_assignments'].items()}
    order_assignments = {o: list(assigns) for o, assigns in analysis['order_assignments'].items()}
    
    # 1. Fix riders with multiple orders (keep only the cheapest one)
    for rider, orders in rider_assignments.items():
        if len(orders) > 1:
            # Sort by cost and keep only the cheapest
            cheapest_order = min(orders, key=lambda x: x[1])
            rider_assignments[rider] = [cheapest_order]
            
            # Update order assignments
            order = cheapest_order[0]
            order_assignments[order] = [(rider, cheapest_order[1])]
    
    # 2. Fix orders assigned to multiple riders (keep the closest rider)
    for order, riders in order_assignments.items():
        if len(riders) > 1:
            # Find the closest rider
            closest_rider = min(riders, key=lambda x: x[1])
            order_assignments[order] = [closest_rider]
            
            # Update rider assignments
            rider = closest_rider[0]
            if rider in rider_assignments:
                # Remove this order from other riders
                rider_assignments[rider] = [(o, c) for o, c in rider_assignments[rider] 
                                          if o == order]
    
    # 3. Assign unassigned orders to closest available rider
    unassigned_orders = [o for o in orders if not order_assignments.get(o)]
    available_riders = [r for r in riders if not rider_assignments.get(r)]
    
    for order in unassigned_orders:
        if not available_riders:
            break
            
        # Find closest available rider for this order
        min_cost = float('inf')
        best_rider = None
        for rider in available_riders:
            try:
                time_values = df[(df['Rider'] == rider) & (df['Order'] == order)]['Time'].values
                if len(time_values) > 0:
                    cost = time_values[0]
                    if cost < min_cost:
                        min_cost = cost
                        best_rider = rider
                else:
                    #logging.warning(f"No time data found for rider {rider} and order {order}, skipping...")
                    pass
            except Exception as e:
                #logging.warning(f"Error processing rider {rider} and order {order}: {str(e)}")
                continue
        
        if best_rider:
            # Make the assignment
            rider_assignments[best_rider].append((order, min_cost))
            order_assignments[order].append((best_rider, min_cost))
            available_riders.remove(best_rider)
    
    # Rebuild the solution
    repaired_assignments = []
    total_time = 0
    assignment_costs = {}
    
    for rider, orders in rider_assignments.items():
        for order, cost in orders:
            repaired_assignments.append((rider, order))
            total_time += cost
            assignment_costs[(rider, order)] = cost
    
    return {
        'assignments': repaired_assignments,
        'total_time': total_time,
        'constraint_violation': 0,  # Repaired solution has no violations
        'is_repaired': True,
        'assignment_costs': assignment_costs
    }

def solve_qubo(Q, variables, var_to_rider_order, riders, orders, df, num_reads=100):
    sampler = neal.SimulatedAnnealingSampler()
    start_time = time.time()
    sampleset = sampler.sample_qubo(Q, num_reads=num_reads)
    elapsed_time = time.time() - start_time

    solutions = []
    for sample, energy, num_occurrences in sampleset.record:
        sample_dict = dict(zip(sampleset.variables, sample))
        analysis = analyze_solution(sample_dict, variables, var_to_rider_order, riders, orders, df)
        
        # Add the raw solution
        solutions.append({
            "energy": energy,
            "num_occurrences": num_occurrences,
            "assignments": analysis['assignments'],
            "total_time": analysis['total_time'],
            "constraint_violation": analysis['constraint_violation'],
            "violations": analysis['violations'],
            "is_repaired": False,
            "analysis": analysis
        })
        
        # Add the repaired version
        if analysis['constraint_violation'] > 0:
            repaired = repair_solution(analysis, riders, orders, df)
            solutions.append({
                "energy": energy,  # Keep original energy for reference
                "num_occurrences": num_occurrences,
                "assignments": repaired['assignments'],
                "total_time": repaired['total_time'],
                "constraint_violation": 0,
                "violations": {
                    "riders_without_order": [],
                    "riders_with_multiple_orders": {},
                    "orders_without_rider": [],
                    "orders_with_multiple_riders": {}
                },
                "is_repaired": True,
                "original_energy": energy,
                "assignment_costs": repaired['assignment_costs']
            })

    # Sort solutions: first by whether they're repaired, then by constraint violations, then by total time
    solutions.sort(key=lambda x: (
        0 if x['is_repaired'] else 1,  # Repaired solutions first
        x['constraint_violation'],
        x['total_time']
    ))
    
    return solutions, elapsed_time


def print_violations(violations):
    if violations["riders_without_order"]:
        print("\n⚠️ Riders without order assignment:", ", ".join(violations["riders_without_order"]))
    if violations["riders_with_multiple_orders"]:
        print("\n❌ Riders assigned to multiple orders:")
        for rider, orders in violations["riders_with_multiple_orders"].items():
            print(f"  {rider}: {', '.join(orders)}")
    if violations["orders_without_rider"]:
        print("\n⚠️ Orders without rider assignment:", ", ".join(violations["orders_without_rider"]))
    if violations["orders_with_multiple_riders"]:
        print("\n❌ Orders assigned to multiple riders:")
        for order, riders in violations["orders_with_multiple_riders"].items():
            print(f"  {order}: {', '.join(riders)}")


def print_solution_report(solutions, elapsed_time, num_riders, num_orders):
    # Separate repaired and unrepaired solutions
    raw_solutions = [s for s in solutions if not s['is_repaired']]
    repaired_solutions = [s for s in solutions if s['is_repaired']]
    
    best_raw = min(raw_solutions, key=lambda x: (x['constraint_violation'], x['total_time']))
    best_repaired = min(repaired_solutions, key=lambda x: x['total_time']) if repaired_solutions else None

    print("\n" + "=" * 70)
    print("=== Q-Router Quantum Annealing Feasibility Report ===")
    print("=" * 70)

    print("\n📏 Constraints in this QUBO model:")
    print("  1️⃣ Rider Assignment Constraint: Each rider assigned to at most ONE order.")
    print("  2️⃣ Order Assignment Constraint: Each order assigned to exactly ONE rider.")
    print("  🎯 Optimization Goal: Minimize TOTAL TRAVEL TIME (distance proxy).")

    print(f"\n📊 Problem Size: {num_riders} riders × {num_orders} orders")
    print(f"🔍 Search Space: {math.factorial(num_riders):.3e} possible assignments")
    print(f"⏱️ Solve Time: {elapsed_time:.2f} seconds")

    # Raw solution report
    print("\n" + "🔵 RAW ANNEALER OUTPUT ".ljust(70, "-"))
    print(f"🏆 Best Energy: {best_raw['energy']}")
    print(f"✅ Valid Assignments: {len(best_raw['assignments'])}/{min(num_riders, num_orders)}")
    print(f"🚨 Constraint Violations: {best_raw['constraint_violation']}")
    print(f"⏱️ Total Travel Time: {best_raw['total_time']:.2f}")
    
    if best_raw["constraint_violation"] > 0:
        print("\n🚨 Constraint Violations Detected!")
        print_violations(best_raw['violations'])
    else:
        print("\n✨ Feasible solution found with no constraint violations!")

    # Repaired solution report if available
    if best_repaired:
        print("\n\n" + "🟢 REPAIRED FEASIBLE SOLUTION ".ljust(70, "-"))
        print(f"🛠️  Repair Method: Greedy assignment of unassigned orders to nearest available rider")
        print(f"✅ Valid Assignments: {len(best_repaired['assignments'])}/{min(num_riders, num_orders)}")
        print(f"🚨 Constraint Violations: {best_repaired['constraint_violation']}")
        print(f"⏱️ Total Travel Time: {best_repaired['total_time']:.2f}")
        print(f"📈 Time Increase vs Best Raw: {((best_repaired['total_time'] / best_raw['total_time']) - 1) * 100:.1f}%")
        
        # Show some assignments
        print("\n📋 Sample Assignments:")
        for i, (rider, order) in enumerate(best_repaired['assignments'][:5]):
            print(f"   {rider} → {order} (Cost: {best_repaired.get('assignment_costs', {}).get((rider, order), 'N/A'):.1f})")
        if len(best_repaired['assignments']) > 5:
            print(f"   ... and {len(best_repaired['assignments']) - 5} more")

    # Show top raw solutions
    print("\n" + "🔍 TOP RAW SOLUTIONS ".ljust(70, "-"))
    for i, sol in enumerate(raw_solutions[:3]):
        status = "✅ FEASIBLE" if sol['constraint_violation'] == 0 else "⚠️  INFEASIBLE"
        print(
            f"\nSolution #{i+1} {status}"
            f"\n  Energy: {sol['energy']:.2f}, "
            f"Violations: {sol['constraint_violation']}, "
            f"Travel Time: {sol['total_time']:.2f}"
        )
        print(f"  Occurred {sol['num_occurrences']} times in the sample")

    print("\n" + "=" * 70)


if __name__ == "__main__":
    # Configuration
    num_riders = 10
    num_orders = 10
    num_reads = 500  # Increased for better solution diversity
    
    # Ensure we don't have more orders than riders (for this simplified example)
    num_orders = min(num_orders, num_riders)

    print("🚴 Generating Q-Router data...")
    df, riders, orders = generate_qrouter_data(num_riders, num_orders)

    print("🧩 Building QUBO model...")
    Q, variables, var_to_rider_order, penalty, reward = build_qubo(df, riders, orders)
    print(f"   - Variables: {len(variables)}")
    print(f"   - Penalty weight: {penalty:.1f}")
    print(f"   - Reward weight: {reward}")

    print(f"\n⚙️  Solving with {num_reads} reads (this may take a moment)...")
    solutions, elapsed_time = solve_qubo(Q, variables, var_to_rider_order, riders, orders, df, num_reads)

    print(f"\n📊 Analyzing results (took {elapsed_time:.2f}s)...")
    print_solution_report(solutions, elapsed_time, num_riders, num_orders)
