export const generateQRouterPdf = async () => {
  // Dynamically import jspdf on the client side only
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: 'Q-Router One-Pager',
    subject: 'Quantum-Powered Route Optimization',
    author: 'Q-Router',
    keywords: 'quantum, routing, optimization, logistics',
    creator: 'Q-Router'
  });

  // Add title with more visible colors
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0); // Black for main title
  doc.text('Q-Router', 15, 25);
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 200); // Dark blue for subtitle
  doc.text('The Quantum Way to the Fastest Route', 15, 35);
  
  // Set default text color to dark gray for better visibility
  doc.setTextColor(40, 40, 40); // Dark gray for content
  
  // Add content sections
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Overview', 15, 55);
  doc.setFont(undefined, 'normal');
  doc.text('Q-Router is a quantum-enhanced route optimization platform built for industries where time, ', 15, 65);
  doc.text('cost, and precision define success. Using Quadratic Unconstrained Binary Optimization ', 15, 73);
  doc.text('(QUBO) models and AI-driven traffic prediction, Q-Router solves Vehicle Routing ', 15, 81);
  doc.text('Problems (VRP) and NP-hard logistics challenges that traditional systems struggle with.', 15, 89);
  doc.text('We find the fastest, most cost-efficient routes across multiple vehicles, orders, and ', 15, 97);
  doc.text('constraints — in real time.', 15, 105);

  // Add Why Q-Router is Different section
  doc.addPage();
  doc.setFont(undefined, 'bold');
  doc.text('Why Q-Router is Different', 15, 25);
  doc.setFont(undefined, 'normal');
  doc.text('In today\'s ultra-competitive logistics space — from 10-minute grocery deliveries to ', 15, 35);
  doc.text('nationwide e-commerce — classical algorithms hit scaling limits when solving complex ', 15, 43);
  doc.text('Capacitated Vehicle Routing Problems (CVRP) or Multi-Trip VRP (MTVRP) with live traffic data.', 15, 51);
  doc.text('Q-Router breaks through these limits by:', 15, 63);
  
  // Bullet points
  doc.text('• Quantum-inspired optimization via QUBO formulations to explore millions of possible routes in parallel.', 20, 75);
  doc.text('• Dynamic Routing that adapts instantly to traffic, weather, and order changes.', 20, 85);
  doc.text('• Cost-first logic that minimizes Deadhead Distance and improves Drop Density for maximum efficiency.', 20, 95);

  // Add Key Features section
  doc.addPage();
  doc.setFont(undefined, 'bold');
  doc.text('Key Features', 15, 25);
  doc.setFont(undefined, 'normal');
  doc.text('• Real-Time Multi-Vehicle Optimization — Solve VRP, CVRP, and MTVRP dynamically.', 20, 35);
  doc.text('• Load Factor Maximization — Better space utilization reduces Cost per Drop.', 20, 45);
  doc.text('• SLA Compliance Boost — Ensure On-Time, In-Full (OTIF) deliveries.', 20, 55);
  doc.text('• Last-Mile Optimization — Reduce lead time and fuel cost in the most expensive delivery segment.', 20, 65);
  doc.text('• Data-Driven Decisions — Route Deviation Index and Stop Time Analysis for operational insight.', 20, 75);

  // Add ROI Formula section
  doc.setFont(undefined, 'bold');
  doc.text('The ROI Formula', 15, 95);
  doc.setFont(undefined, 'normal');
  doc.text('Cost Savings (CS) = Baseline Cost (CB) – Optimized Cost (CO)', 20, 105);
  doc.text('Q-Router Fee = CS × 10%', 20, 115);

  // Add Who Can Benefit section
  doc.addPage();
  doc.setFont(undefined, 'bold');
  doc.text('Who Can Benefit', 15, 25);
  doc.setFont(undefined, 'normal');
  doc.text('• Quick-Commerce — Zepto, Blinkit, Swiggy Instamart, BigBasket, Amazon Fresh', 20, 35);
  doc.text('• E-Commerce Logistics — Flipkart, Delhivery, Shadowfax', 20, 45);
  doc.text('• Field Services & B2B Deliveries — Pharma, industrial supplies, food distribution', 20, 55);

  // Add QUBO Advantage section
  doc.setFont(undefined, 'bold');
  doc.text('The QUBO Advantage', 15, 75);
  doc.setFont(undefined, 'normal');
  doc.text('Traditional solvers slow down when solving NP-hard logistics problems with dozens of ', 15, 85);
  doc.text('constraints (capacity, time windows, shift limits, etc.). QUBO translates these complex ', 15, 93);
  doc.text('constraints into a mathematical model that quantum and quantum-inspired processors ', 15, 101);
  doc.text('can solve dramatically faster — enabling optimizations that were previously impractical in real-time.', 15, 109);

  // Add footer with more visible text
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100); // Darker gray for footer
  doc.text('The Quantum Way to the Fastest Route', 15, 140);
  doc.text('Website: q-router.com', 15, 147);
  
  // Add copyright notice with link
  doc.setTextColor(0, 0, 255); // Blue for link
  doc.textWithLink('© 2025 Yabloko Labs', 15, 157, { url: 'https://yablokolabs.com/' });
  doc.setTextColor(100, 100, 100); // Reset to footer color

  // Save the PDF
  doc.save('Q-Router-One-Pager.pdf');
};
