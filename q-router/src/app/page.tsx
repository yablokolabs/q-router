'use client'

import styles from './Button.module.css';
import {
  Row,
  Col,
  Button,
  Card,
  Form,
  Input,
  Select,
  Layout,
  Typography,
  Space,
  Divider,
  message,
} from 'antd'
import Analytics from '@/components/Analytics'
import { generateQRouterPdf } from '@/utils/generatePdf';
import BackToTop from '@/components/BackToTop';
import {
  ThunderboltOutlined,
  ApiOutlined,
  DashboardOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  SendOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import NetworkAnimation from '@/components/NetworkAnimation'

const { Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const features = [
  {
    title: 'Quantum-Assisted Optimization',
    description: 'Leverage quantum computing principles for exponentially faster route calculations',
    icon: <ThunderboltOutlined style={{ fontSize: '2rem', color: '#5EF1FF' }} />
  },
  {
    title: 'Real-time Analytics',
    description: 'Get instant insights into your routes and operations',
    icon: <ApiOutlined style={{ fontSize: '2rem', color: '#5EF1FF' }} />
  },
  {
    title: 'Enterprise Integration',
    description: 'Seamlessly integrate with your existing systems',
    icon: <DashboardOutlined style={{ fontSize: '2rem', color: '#5EF1FF' }} />
  }
]

export default function Home() {
  const [form] = Form.useForm()
  return (
    <>
      <Analytics />
      <BackToTop />
      <Layout style={{ background: 'transparent' }}>
        <Content>
          <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <NetworkAnimation />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '0 24px' }}>
              <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
                    <div className={styles.floatingLogo}>
                      <img 
                        src="/q-router-logo-cropped.svg" 
                        alt="Q-Router" 
                        width={600}
                        height={159}
                        style={{ 
                          objectFit: 'contain',
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          margin: '0 auto'
                        }}
                      />
                    </div>
                    <style jsx>{`
                      @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                      }
                    `}</style>
.
                    <Paragraph style={{ 
                      fontSize: '1.25rem', 
                      color: '#9CA3AF', 
                      marginBottom: '24px',
                      maxWidth: '600px',
                      margin: '0 auto 32px'
                    }}>
                      Quantum-powered route optimization with AI traffic prediction for faster, more cost-efficient deliveries.
                    </Paragraph>
                    <Space size="large" wrap style={{ justifyContent: 'center' }}>
                      <Button 
                        type="primary" 
                        size="large" 
                        onClick={() => {
                          document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ 
                          height: '56px', 
                          padding: '0 32px', 
                          fontSize: '18px',
                          fontWeight: 600
                        }}
                      >
                        Book a Demo
                      </Button>
                      <Button 
                        size="large" 
                        icon={<DownloadOutlined />}
                        onClick={async () => {
                          try {
                            await generateQRouterPdf();
                            message.success('Downloading Q-Router One-Pager');
                          } catch (error) {
                            console.error('Error generating PDF:', error);
                            message.error('Failed to generate PDF');
                          }
                        }}
                        className={styles.customButton}
                      >
                        Download One-Pager
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            </section>

            {/* Problem & Solution */}
            <section style={{ padding: '48px 24px' }}>
              <Row gutter={[48, 48]} justify="center">
                <Col xs={24} lg={10}>
                  <Card className="quantum-card" style={{ height: '100%' }}>
                    <Title level={3} style={{ color: '#FF6B6B', marginBottom: '24px' }}>
                      The Problem
                    </Title>
                    <Paragraph style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.6 }}>
                      Traditional routing systems are inefficient, leading to:
                    </Paragraph>
                    <ul style={{
                      color: '#9CA3AF',
                      fontSize: '16px',
                      lineHeight: 1.8,
                      paddingLeft: '10px',
                      marginLeft: '10px'
                    }}>
                      <li>30% longer delivery times</li>
                      <li>25% higher fuel costs</li>
                      <li>Poor customer satisfaction</li>
                      <li>Manual planning bottlenecks</li>
                      <li>Inability to adapt to real-time changes</li>
                    </ul>
                  </Card>
                </Col>
                <Col xs={24} lg={10}>
                  <Card className="quantum-card" style={{ height: '100%' }}>
                    <Title level={3} style={{ color: '#5EF1FF', marginBottom: '24px' }}>
                      The Solution
                    </Title>
                    <Paragraph style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.6 }}>
                      Q-Router combines quantum computing with AI to deliver:
                    </Paragraph>
                    <ul style={{
                      color: '#9CA3AF',
                      fontSize: '16px',
                      lineHeight: 1.8,
                      paddingLeft: '10px',
                      marginLeft: '10px'
                    }}>
                      <li>Exponentially faster optimization</li>
                      <li>Real-time traffic prediction</li>
                      <li>Dynamic route adjustments</li>
                      <li>Multi-constraint optimization</li>
                      <li>Seamless API integration</li>
                    </ul>
                  </Card>
                </Col>
              </Row>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '48px 24px', background: 'rgba(5, 6, 10, 0.5)' }}>
              <Row gutter={[32, 32]} justify="center">
                {features.map((feature, index) => (
                  <Col key={index} xs={24} md={12} lg={8}>
                    <Card className="quantum-card" style={{ height: '100%' }}>
                      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        {feature.icon}
                      </div>
                      <Title level={3} style={{ color: '#E5E7EB', textAlign: 'center', marginBottom: '16px' }}>
                        {feature.title}
                      </Title>
                      <Paragraph style={{ color: '#9CA3AF', textAlign: 'center' }}>
                        {feature.description}
                      </Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>



        {/* Features Grid */}
        <section style={{ padding: '48px 24px', background: 'rgba(5, 6, 10, 0.5)' }}>
          <Row justify="center" style={{ marginBottom: '48px' }}>
            <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#E5E7EB', marginBottom: '24px' }}>
                Quantum-Powered Features
              </Title>
              <Paragraph style={{ fontSize: '18px', color: '#9CA3AF' }}>
                Advanced capabilities that set Q-Router apart from traditional routing solutions
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[32, 32]} justify="center">
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card className="quantum-card" style={{ height: '100%', textAlign: 'center' }}>
                  <div style={{ marginBottom: '16px' }}>
                    {feature.icon}
                  </div>
                  <Title level={4} style={{ color: '#E5E7EB', marginBottom: '16px' }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: '#9CA3AF' }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Pricing Pitch */}
        <section style={{ padding: '48px 24px' }}>
          <Row justify="center" style={{ marginBottom: '40px' }}>
            <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#5EF1FF', marginBottom: '24px' }}>
                No Savings, No Fee
              </Title>
              <Title level={3} style={{ color: '#E5E7EB', fontWeight: 400, marginBottom: '32px' }}>
                Pay Only for Results
              </Title>
              <Paragraph style={{ fontSize: '18px', color: '#9CA3AF', maxWidth: '800px', margin: '0 auto 32px' }}>
                Q-Router&apos;s performance-based pricing means you only pay when we deliver real, measurable savings to your bottom line.
              </Paragraph>
              <Button 
                type="primary" 
                size="large" 
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ 
                  height: '56px', 
                  padding: '0 48px', 
                  fontSize: '18px',
                  marginBottom: '40px',
                  background: 'linear-gradient(135deg, #5EF1FF 0%, #A855F7 100%)',
                  border: 'none'
                }}
              >
                Start Your Risk-Free Trial
              </Button>
            </Col>
          </Row>
          <Row gutter={[48, 48]} justify="center">
            <Col xs={24} md={8}>
              <Card className="quantum-card" style={{ height: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <DollarOutlined style={{ fontSize: '2.5rem', color: '#5EF1FF' }} />
                </div>
                <Title level={4} style={{ color: '#E5E7EB', textAlign: 'center', marginBottom: '16px' }}>
                  Performance-Based Pricing
                </Title>
                <Paragraph style={{ color: '#9CA3AF' }}>
                  Pay only 10% of the actual cost savings we generate for your business. No savings = No fee.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="quantum-card" style={{ height: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <ThunderboltOutlined style={{ fontSize: '2.5rem', color: '#5EF1FF' }} />
                </div>
                <Title level={4} style={{ color: '#E5E7EB', textAlign: 'center', marginBottom: '16px' }}>
                  Quantum + AI Optimization
                </Title>
                <Paragraph style={{ color: '#9CA3AF' }}>
                  Our advanced algorithms combine quantum computing and AI traffic prediction to find the most efficient routes.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="quantum-card" style={{ height: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <CheckCircleOutlined style={{ fontSize: '2.5rem', color: '#5EF1FF' }} />
                </div>
                <Title level={4} style={{ color: '#E5E7EB', textAlign: 'center', marginBottom: '16px' }}>
                  Measurable Results
                </Title>
                <Paragraph style={{ color: '#9CA3AF' }}>
                  Clear, transparent reporting shows exactly how much you&apos;re saving with Q-Router&apos;s optimization.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Savings Calculation */}
        <section style={{ padding: '48px 24px', background: 'rgba(5, 6, 10, 0.5)' }}>
          <Row justify="center">
            <Col xs={24} lg={16}>
              <Card className="quantum-card">
                <Title level={3} style={{ color: '#5EF1FF', textAlign: 'center', marginBottom: '32px' }}>
                  Transparent Savings Calculation
                </Title>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  borderRadius: '8px', 
                  padding: '32px',
                  marginBottom: '16px'
                }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '32px',
                    color: '#E5E7EB',
                    width: '100%'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px',
                      alignItems: 'center'
                    }}>
                      <div style={{ color: '#5EF1FF', fontSize: '1.25rem' }}>Cost Savings</div>
                      <div style={{ 
                        fontSize: '2rem',
                        lineHeight: '1.5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>C<sub>S</sub></span>
                        <span style={{ fontSize: '1.5rem' }}>=</span>
                        <span style={{ fontSize: '1.5rem' }}>C<sub>B</sub></span>
                        <span style={{ fontSize: '1.5rem' }}>−</span>
                        <span style={{ fontSize: '1.5rem' }}>C<sub>O</sub></span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
                        Where: C<sub>S</sub> = Cost Savings, C<sub>B</sub> = Baseline Cost, C<sub>O</sub> = Optimized Cost
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px',
                      alignItems: 'center'
                    }}>
                      <div style={{ color: '#5EF1FF', fontSize: '1.25rem' }}>Q-Router Fee (10%)</div>
                      <div style={{ 
                        fontSize: '2rem',
                        lineHeight: '1.5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>F</span>
                        <span style={{ fontSize: '1.5rem' }}>=</span>
                        <span style={{ fontSize: '1.5rem' }}>C<sub>S</sub></span>
                        <span style={{ fontSize: '1.5rem' }}>×</span>
                        <span style={{ fontSize: '1.5rem' }}>0.1</span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
                        Where: F = Q-Router Fee
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px',
                      alignItems: 'center'
                    }}>
                      <div style={{ color: '#5EF1FF', fontSize: '1.25rem' }}>Your ROI</div>
                      <div style={{ 
                        fontSize: '2rem',
                        lineHeight: '1.5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>ROI</span>
                        <span style={{ fontSize: '1.5rem' }}>=</span>
                        <span style={{ fontSize: '1.5rem' }}>(</span>
                        <span style={{ fontSize: '1.5rem' }}>C<sub>S</sub></span>
                        <span style={{ fontSize: '1.5rem' }}>÷</span>
                        <span style={{ fontSize: '1.5rem' }}>F</span>
                        <span style={{ fontSize: '1.5rem' }}>)</span>
                        <span style={{ fontSize: '1.5rem' }}>×</span>
                        <span style={{ fontSize: '1.5rem' }}>100</span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
                        Where: ROI is expressed as a percentage
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px',
                      alignItems: 'center'
                    }}>
                      <div style={{ color: '#5EF1FF', fontSize: '1.25rem' }}>Cost Per Action (CPA) Impact</div>
                      <div style={{ 
                        fontSize: '2rem',
                        lineHeight: '1.5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>CPA<sub>new</sub></span>
                        <span style={{ fontSize: '1.5rem' }}>=</span>
                        <span style={{ fontSize: '1.5rem' }}>C<sub>O</sub></span>
                        <span style={{ fontSize: '1.5rem' }}>÷</span>
                        <span style={{ fontSize: '1.5rem' }}>D</span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#9CA3AF', textAlign: 'center' }}>
                        Where: CPA<sub>new</sub> = New Cost Per Action,<br/>
                        C<sub>O</sub> = Optimized Cost,<br/>
                        D = Number of Deliveries
                      </div>
                    </div>
                  </div>
                </div>
                <Paragraph style={{ 
                  textAlign: 'center', 
                  fontSize: '16px', 
                  color: '#5EF1FF',
                  fontStyle: 'italic',
                  marginBottom: 0
                }}>
                  We charge only if we save you money — your success drives our success.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Lead Capture */}
        <section id="contact-form" style={{ padding: '80px 24px', background: 'rgba(5, 6, 10, 0.5)' }}>
          <Row justify="center">
            <Col xs={24} lg={12}>
              <Card className="quantum-card">
                <Title level={2} style={{ color: '#E5E7EB', textAlign: 'center', marginBottom: '32px' }}>
                  Ready to Optimize Your Routes?
                </Title>
                <Form
                  form={form}
                  layout="vertical"
                  action="https://formspree.io/f/myzplqly"
                  method="POST"
                  onFinish={async (values) => {
                    try {
                      const response = await fetch('https://formspree.io/f/myzplqly', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          name: values.name,
                          email: values.email,
                          company: values.company,
                          volume: values.volume,
                          _gotcha: '' // This is a honeypot field for spam prevention
                        })
                      });
                      
                      if (response.ok) {
                        message.success('Thank you! We will be in touch soon.');
                        form.resetFields();
                      } else {
                        throw new Error('Form submission failed');
                      }
                    } catch (error) {
                      console.error('Form submission failed:', error);
                      message.error('Something went wrong. Please try again.');
                    }
                  }}
                  size="large"
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input placeholder="John Doe" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' }
                        ]}
                      >
                        <Input placeholder="john@company.com" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="company"
                        label="Company"
                        rules={[{ required: true, message: 'Please enter your company' }]}
                      >
                        <Input placeholder="Your Company" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="volume"
                        label="Monthly Delivery Volume"
                        rules={[{ required: true, message: 'Please select volume' }]}
                      >
                        <Select placeholder="Select volume">
                          <Select.Option value="<100">Less than 100</Select.Option>
                          <Select.Option value="100-1000">100 - 1,000</Select.Option>
                          <Select.Option value="1000-10000">1,000 - 10,000</Select.Option>
                          <Select.Option value=">10000">More than 10,000</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="_gotcha" style={{display: 'none'}} aria-hidden="true">
                  <input type="text" name="_gotcha" tabIndex={-1} />
                </Form.Item>
                <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      size="large" 
                      block
                      icon={<SendOutlined />}
                    >
                      Get Started with Q-Router
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </section>
      </Content>

      {/* Footer */}
      <Footer style={{ 
        background: 'rgba(5, 6, 10, 0.9)', 
        borderTop: '1px solid rgba(94, 241, 255, 0.2)',
        padding: '48px 24px 24px'
      }}>
        <Row gutter={[32, 32]} justify="space-between">
          <Col xs={24} lg={8}>
            <Title level={4} style={{ color: '#5EF1FF', marginBottom: '16px' }}>
              Q-Router™
            </Title>
            <Paragraph style={{ color: '#9CA3AF' }}>
              The quantum way to the fastest route. Revolutionizing logistics with quantum-powered optimization.
            </Paragraph>
          </Col>
          {/* <Col xs={24} lg={4}>
            <Title level={5} style={{ color: '#E5E7EB', marginBottom: '16px' }}>
              Product
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#" style={{ color: '#9CA3AF' }}>Features</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Pricing</a>
              <a href="#" style={{ color: '#9CA3AF' }}>API Docs</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Integrations</a>
            </div>
          </Col> */}
          <Col xs={24} lg={4}>
            <Title level={5} style={{ color: '#E5E7EB', marginBottom: '16px' }}>
              Company
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="https://yablokolabs.com" style={{ color: '#9CA3AF' }}>About</a>
              <a href="https://yablokolabs.com/#contact" style={{ color: '#9CA3AF' }}>Contact</a>
            </div>
          </Col>
          {/* <Col xs={24} lg={4}>
            <Title level={5} style={{ color: '#E5E7EB', marginBottom: '16px' }}>
              Support
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#" style={{ color: '#9CA3AF' }}>Help Center</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Documentation</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Status</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Security</a>
            </div>
          </Col> */}
        </Row>
        <Divider style={{ borderColor: 'rgba(94, 241, 255, 0.2)', margin: '32px 0 24px' }} />
        <Row justify="center" align="middle">
          <Col>
            <Text style={{ color: '#9CA3AF', textAlign: 'center' }}>
              © 2025{' '}
              <a 
                href="https://yablokolabs.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#5EF1FF' }}
              >
                Yabloko Labs Pvt. Ltd.
              </a>
              {' '}All rights reserved.
            </Text>
          </Col>
        </Row>
      </Footer>
      </Layout>
    </>
  );
}