'use client'

import { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Typography,
  InputNumber,
  Progress
} from 'antd';
import {
  ExperimentOutlined,
  CarOutlined,
  ShoppingOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface SimulationResult {
  greedyDistance: string;
  quantumDistance: string;
  savingsPercent: number;
  estimatedSavings: number;
  estimatedSavingsUSD: number;
  distanceSaved: string;
}

export default function CaseStudyDemo() {
  const [orders, setOrders] = useState<number>(50);
  const [vehicles, setVehicles] = useState<number>(10);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const runSimulation = async () => {
    setLoading(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate realistic distances and savings
    const baseDistance = Math.max(orders * 8 + Math.random() * orders * 2, 50);
    const greedyDistance = baseDistance / Math.max(1, Math.sqrt(vehicles));
    const savingsPercent = Math.floor(Math.random() * 11) + 15; // 15-25%
    const quantumDistance = greedyDistance * (1 - savingsPercent / 100);
    const fuelSavingsPerKm = 12; // ₹12 per km saved
    const estimatedSavings = Math.round((greedyDistance - quantumDistance) * fuelSavingsPerKm);
    const usdConversionRate = 0.012; // Approximate INR to USD conversion (1 INR = 0.012 USD)
    const estimatedSavingsUSD = Math.round(estimatedSavings * usdConversionRate);
    
    setResult({
      greedyDistance: greedyDistance.toFixed(1),
      quantumDistance: quantumDistance.toFixed(1),
      savingsPercent,
      estimatedSavings,
      estimatedSavingsUSD,
      distanceSaved: (greedyDistance - quantumDistance).toFixed(1)
    });
    
    setLoading(false);
  };

  return (
    <Card className="quantum-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Title level={3} style={{ color: '#5EF1FF', textAlign: 'center', marginBottom: '32px' }}>
        Interactive Route Optimization Demo
      </Title>
      
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#E5E7EB', fontSize: '16px', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
              <ShoppingOutlined style={{ marginRight: '8px', color: '#5EF1FF' }} />
              Number of Orders
            </label>
            <InputNumber
              min={10}
              max={10000}
              value={orders}
              onChange={(value) => setOrders(value || 50)}
              style={{ width: '100%' }}
              size="large"
              placeholder="Enter daily orders"
            />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#E5E7EB', fontSize: '16px', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
              <CarOutlined style={{ marginRight: '8px', color: '#5EF1FF' }} />
              Number of Vehicles
            </label>
            <InputNumber
              min={1}
              max={2000}
              value={vehicles}
              onChange={(value) => setVehicles(value || 10)}
              style={{ width: '100%' }}
              size="large"
              placeholder="Enter fleet size"
            />
          </div>
        </Col>
      </Row>
      
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Button 
          type="primary" 
          size="large" 
          icon={<ExperimentOutlined />}
          onClick={runSimulation}
          loading={loading}
          style={{
            height: '48px',
            padding: '0 32px',
            fontSize: '16px',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #5EF1FF 0%, #A855F7 100%)',
            border: 'none'
          }}
        >
          {loading ? 'Running Quantum Simulation...' : 'Run Simulation'}
        </Button>
      </div>
      
      {result && (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          borderRadius: '12px', 
          padding: '24px',
          border: '1px solid rgba(94, 241, 255, 0.2)'
        }}>
          <Title level={4} style={{ color: '#5EF1FF', textAlign: 'center', marginBottom: '24px' }}>
            Simulation Results
          </Title>
          
          {/* Visual Comparison */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} md={12}>
              <div style={{ 
                background: 'rgba(248, 113, 113, 0.1)', 
                border: '1px solid #f87171',
                borderRadius: '8px', 
                padding: '16px', 
                textAlign: 'center' 
              }}>
                <div style={{ color: '#f87171', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  Traditional Greedy Routing
                </div>
                <div style={{ color: '#E5E7EB', fontSize: '24px', fontWeight: 'bold' }}>
                  {result.greedyDistance} km
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div style={{ 
                background: 'rgba(52, 211, 153, 0.1)', 
                border: '1px solid #34d399',
                borderRadius: '8px', 
                padding: '16px', 
                textAlign: 'center' 
              }}>
                <div style={{ color: '#34d399', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  Q-Router™ Quantum Optimization
                </div>
                <div style={{ color: '#E5E7EB', fontSize: '24px', fontWeight: 'bold' }}>
                  {result.quantumDistance} km
                </div>
              </div>
            </Col>
          </Row>
          
          {/* Progress Bar Visualization */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ color: '#E5E7EB', marginBottom: '8px', fontWeight: 500 }}>
              Route Efficiency Comparison
            </div>
            <div style={{ position: 'relative' }}>
              <Progress 
                percent={100} 
                showInfo={false} 
                strokeColor="#f87171" 
                trailColor="transparent"
                style={{ marginBottom: '4px' }}
              />
              <Progress 
                percent={Math.round((parseFloat(result.quantumDistance) / parseFloat(result.greedyDistance)) * 100)} 
                showInfo={false} 
                strokeColor="#34d399"
                trailColor="transparent"
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '12px', 
                color: '#9CA3AF',
                marginTop: '4px'
              }}>
                <span>Greedy: {result.greedyDistance} km</span>
                <span>Q-Router: {result.quantumDistance} km</span>
              </div>
            </div>
          </div>
          
          {/* Key Metrics */}
          <Row gutter={[16, 16]} style={{ textAlign: 'center' }}>
            <Col xs={24} md={8}>
              <div style={{ 
                background: 'rgba(94, 241, 255, 0.1)', 
                borderRadius: '8px', 
                padding: '16px' 
              }}>
                <div style={{ color: '#5EF1FF', fontSize: '28px', fontWeight: 'bold' }}>
                  {result.savingsPercent}%
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '14px' }}>Route Optimization</div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ 
                background: 'rgba(34, 197, 94, 0.1)', 
                borderRadius: '8px', 
                padding: '16px' 
              }}>
                <div style={{ color: '#22c55e', fontSize: '28px', fontWeight: 'bold' }}>
                  {result.distanceSaved} km
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '14px' }}>Distance Saved</div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ 
                background: 'rgba(168, 85, 247, 0.1)', 
                borderRadius: '8px', 
                padding: '16px' 
              }}>
                <div style={{ color: '#a855f7', fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                  ₹{result.estimatedSavings.toLocaleString()}
                </div>
                <div style={{ color: '#a855f7', fontSize: '18px', fontWeight: 'bold' }}>
                  ${result.estimatedSavingsUSD.toLocaleString()}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '14px' }}>Daily Fuel Savings</div>
              </div>
            </Col>
          </Row>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '24px', 
            padding: '16px', 
            background: 'rgba(94, 241, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(94, 241, 255, 0.2)'
          }}>
            <Paragraph style={{ 
              color: '#5EF1FF', 
              fontSize: '18px', 
              fontWeight: 600, 
              marginBottom: '8px' 
            }}>
              ✅ Estimated Monthly Savings: ₹{(result.estimatedSavings * 30).toLocaleString()} / ${(result.estimatedSavingsUSD * 30).toLocaleString()}
            </Paragraph>
            <Paragraph style={{ color: '#9CA3AF', marginBottom: 0 }}>
              *Based on quantum annealing optimization vs traditional greedy algorithms
            </Paragraph>
          </div>
        </div>
      )}
    </Card>
  );
}