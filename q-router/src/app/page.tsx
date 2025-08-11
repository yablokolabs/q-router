'use client'

import { 
  Row, 
  Col, 
  Button, 
  Card, 
  Statistic, 
  Steps, 
  Avatar, 
  Carousel, 
  Form, 
  Input, 
  Select,
  Layout,
  Typography,
  Space,
  Divider
} from 'antd'
import { 
  RocketOutlined,
  ThunderboltOutlined,
  ApiOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  DownloadOutlined,
  SendOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import NetworkAnimation from '@/components/NetworkAnimation'
import styles from './page.module.css'

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

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

const testimonials = [
  {
    quote: "Q-Router transformed our delivery operations. We've seen a 25% reduction in fuel costs and our customers are happier than ever.",
    author: "Sarah Johnson",
    role: "VP of Operations",
    company: "LogiCorp"
  },
  {
    quote: "The quantum optimization is incredible. What used to take hours of planning now happens in seconds.",
    author: "Michael Chen",
    role: "Fleet Manager",
    company: "FastTrack Delivery"
  },
  {
    quote: "Integration was seamless and the ROI was immediate. Q-Router is a game-changer for logistics.",
    author: "Emily Rodriguez",
    role: "CTO",
    company: "Supply Chain Solutions"
  }
]

const plans = [
  {
    title: 'Starter',
    price: '$99',
    buttonText: 'Start Free Trial',
    features: [
      'Up to 100 deliveries/month',
      'Basic route optimization',
      'Email support',
      'API access',
      'Standard integrations'
    ]
  },
  {
    title: 'Growth',
    price: '$299',
    buttonText: 'Start Free Trial',
    features: [
      'Up to 1,000 deliveries/month',
      'Quantum optimization',
      'Real-time tracking',
      'Priority support',
      'Advanced analytics',
      'Custom integrations'
    ]
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    buttonText: 'Contact Sales',
    features: [
      'Unlimited deliveries',
      'Full quantum suite',
      'Dedicated support',
      'Custom development',
      'SLA guarantees',
      'White-label options'
    ]
  }
]

export default function Home() {
  const [form] = Form.useForm()

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      
      if (response.ok) {
        form.resetFields()
        // You could add a success message here
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const onFinish = handleSubmit
  return (
    <Layout style={{ background: 'transparent' }}>
      <Content>
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <NetworkAnimation />
          <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '0 24px' }}>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
              <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
                <Title level={1} className={styles.heroTitle}>
                  Q-Router™
                </Title>
                <Title level={2} style={{ 
                  color: '#E5E7EB', 
                  fontWeight: 300, 
                  marginBottom: '32px',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)'
                }}>
                  The Quantum Way to the Fastest Route
                </Title>
                <Paragraph style={{ 
                  fontSize: '1.25rem', 
                  color: '#9CA3AF', 
                  marginBottom: '48px',
                  maxWidth: '600px',
                  margin: '0 auto 48px'
                }}>
                  Quantum-powered route optimization with AI traffic prediction for faster, more cost-efficient deliveries.
                </Paragraph>
                <Space size="large" wrap>
                  <Button 
                    type="primary" 
                    size="large" 
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
                    style={{ 
                      height: '56px', 
                      padding: '0 32px', 
                      fontSize: '18px',
                      background: 'transparent',
                      borderColor: '#5EF1FF',
                      color: '#5EF1FF'
                    }}
                  >
                    Download One-Pager
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        </section>

        {/* Problem & Solution */}
        <section style={{ padding: '120px 24px' }}>
          <Row gutter={[48, 48]} justify="center">
            <Col xs={24} lg={10}>
              <Card className="quantum-card" style={{ height: '100%' }}>
                <Title level={3} style={{ color: '#FF6B6B', marginBottom: '24px' }}>
                  The Problem
                </Title>
                <Paragraph style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.6 }}>
                  Traditional routing systems are inefficient, leading to:
                </Paragraph>
                <ul style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.8 }}>
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
                <ul style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.8 }}>
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
        <section style={{ padding: '120px 24px', background: 'rgba(5, 6, 10, 0.5)' }}>
          <Row justify="center" style={{ marginBottom: '80px' }}>
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

        {/* Impact Metrics */}
        <section style={{ padding: '120px 24px' }}>
          <Row justify="center" style={{ marginBottom: '80px' }}>
            <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#E5E7EB', marginBottom: '24px' }}>
                Proven Results
              </Title>
              <Paragraph style={{ fontSize: '18px', color: '#9CA3AF' }}>
                Real impact from our quantum-powered optimization
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[48, 48]} justify="center">
            <Col xs={12} lg={6}>
              <Card className="quantum-card" style={{ textAlign: 'center' }}>
                <Statistic
                  title="Faster Deliveries"
                  value={18}
                  suffix="%"
                  valueStyle={{ color: '#5EF1FF', fontSize: '3rem' }}
                />
              </Card>
            </Col>
            <Col xs={12} lg={6}>
              <Card className="quantum-card" style={{ textAlign: 'center' }}>
                <Statistic
                  title="Cost Savings"
                  value={25}
                  suffix="%"
                  valueStyle={{ color: '#5EF1FF', fontSize: '3rem' }}
                />
              </Card>
            </Col>
            <Col xs={12} lg={6}>
              <Card className="quantum-card" style={{ textAlign: 'center' }}>
                <Statistic
                  title="Planning Time Reduced"
                  value={90}
                  suffix="%"
                  valueStyle={{ color: '#5EF1FF', fontSize: '3rem' }}
                />
              </Card>
            </Col>
            <Col xs={12} lg={6}>
              <Card className="quantum-card" style={{ textAlign: 'center' }}>
                <Statistic
                  title="Customer Satisfaction"
                  value={95}
                  suffix="%"
                  valueStyle={{ color: '#5EF1FF', fontSize: '3rem' }}
                />
              </Card>
            </Col>
          </Row>
        </section>

        {/* How It Works */}
        <section style={{ padding: '120px 24px', background: 'rgba(5, 6, 10, 0.5)' }}>
          <Row justify="center" style={{ marginBottom: '80px' }}>
            <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#E5E7EB', marginBottom: '24px' }}>
                How It Works
              </Title>
              <Paragraph style={{ fontSize: '18px', color: '#9CA3AF' }}>
                Three simple steps to quantum-optimized routing
              </Paragraph>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={24} lg={16}>
              <Steps
                direction="vertical"
                size="large"
                current={-1}
                items={[
                  {
                    title: 'Ingest',
                    description: 'Import your delivery data, constraints, and preferences through our API or dashboard',
                    icon: <ApiOutlined />
                  },
                  {
                    title: 'Optimize',
                    description: 'Our quantum algorithms process millions of route combinations in seconds',
                    icon: <ThunderboltOutlined />
                  },
                  {
                    title: 'Orchestrate',
                    description: 'Deploy optimized routes with real-time monitoring and dynamic adjustments',
                    icon: <DashboardOutlined />
                  }
                ]}
              />
            </Col>
          </Row>
        </section>

        {/* Integrations */}
        <section style={{ padding: '120px 24px' }}>
          <Row justify="center" style={{ marginBottom: '80px' }}>
            <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#E5E7EB', marginBottom: '24px' }}>
                Seamless Integrations
              </Title>
              <Paragraph style={{ fontSize: '18px', color: '#9CA3AF', marginBottom: '48px' }}>
                Connect with your existing logistics ecosystem
              </Paragraph>
              <Avatar.Group size="large" max={{ count: 8 }}>
                <Avatar style={{ backgroundColor: '#5EF1FF', color: '#000' }}>SAP</Avatar>
                <Avatar style={{ backgroundColor: '#A855F7', color: '#fff' }}>SF</Avatar>
                <Avatar style={{ backgroundColor: '#5EF1FF', color: '#000' }}>WMS</Avatar>
                <Avatar style={{ backgroundColor: '#A855F7', color: '#fff' }}>TMS</Avatar>
                <Avatar style={{ backgroundColor: '#5EF1FF', color: '#000' }}>ERP</Avatar>
                <Avatar style={{ backgroundColor: '#A855F7', color: '#fff' }}>API</Avatar>
                <Avatar style={{ backgroundColor: '#5EF1FF', color: '#000' }}>GPS</Avatar>
                <Avatar style={{ backgroundColor: '#A855F7', color: '#fff' }}>IoT</Avatar>
              </Avatar.Group>
            </Col>
          </Row>
        </section>

        {/* Testimonials */}
        <section style={{ padding: '120px 24px', background: 'rgba(5, 6, 10, 0.5)' }}>
          <Row justify="center" style={{ marginBottom: '80px' }}>
            <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#E5E7EB', marginBottom: '24px' }}>
                What Our Customers Say
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={24} lg={16}>
              <Carousel autoplay dots={{ className: 'custom-dots' }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index}>
                    <Card className="quantum-card" style={{ textAlign: 'center', margin: '0 16px' }}>
                      <Paragraph style={{ 
                        fontSize: '18px', 
                        color: '#E5E7EB', 
                        fontStyle: 'italic',
                        marginBottom: '32px',
                        lineHeight: 1.6
                      }}>
                        "{testimonial.quote}"
                      </Paragraph>
                      <Title level={5} style={{ color: '#5EF1FF', marginBottom: '8px' }}>
                        {testimonial.author}
                      </Title>
                      <Text style={{ color: '#9CA3AF' }}>
                        {testimonial.role}, {testimonial.company}
                      </Text>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </section>

        {/* Pricing Teaser */}
        <section style={{ padding: '120px 24px' }}>
          <Row justify="center" style={{ marginBottom: '80px' }}>
            <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#E5E7EB', marginBottom: '24px' }}>
                Choose Your Plan
              </Title>
              <Paragraph style={{ fontSize: '18px', color: '#9CA3AF' }}>
                Select the plan that best suits your business needs
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[32, 32]} justify="center">
            {plans.map((plan, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card 
                  className="quantum-card" 
                  style={{ 
                    textAlign: 'center', 
                    height: '100%',
                    position: 'relative'
                  }}
                >
                  {plan.title === 'Growth' && (
                    <div style={{
                      position: 'absolute', 
                      top: '-12px', 
                      left: '50%', 
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #5EF1FF 0%, #A855F7 100%)',
                      color: '#000',
                      padding: '4px 16px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      POPULAR
                    </div>
                  )}
                  <Title level={3} style={{ color: '#E5E7EB', marginBottom: '16px' }}>
                    {plan.title}
                  </Title>
                  <Statistic
                    value={plan.price === 'Custom' ? plan.price : plan.price}
                    valueStyle={{ color: '#5EF1FF', fontSize: '2rem' }}
                    suffix={plan.price !== 'Custom' ? '/month' : ''}
                    style={{ marginBottom: '24px' }}
                  />
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px', textAlign: 'left' }}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} style={{ marginBottom: '12px', color: '#9CA3AF' }}>
                        <CheckCircleOutlined style={{ color: '#5EF1FF', marginRight: '8px' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button type="primary" size="large" block>
                    {plan.buttonText}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Lead Capture */}
        <section style={{ padding: '120px 24px', background: 'rgba(5, 6, 10, 0.5)' }}>
          <Row justify="center">
            <Col xs={24} lg={12}>
              <Card className="quantum-card">
                <Title level={2} style={{ color: '#E5E7EB', textAlign: 'center', marginBottom: '32px' }}>
                  Ready to Optimize Your Routes?
                </Title>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
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
          <Col xs={24} lg={4}>
            <Title level={5} style={{ color: '#E5E7EB', marginBottom: '16px' }}>
              Product
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#" style={{ color: '#9CA3AF' }}>Features</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Pricing</a>
              <a href="#" style={{ color: '#9CA3AF' }}>API Docs</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Integrations</a>
            </div>
          </Col>
          <Col xs={24} lg={4}>
            <Title level={5} style={{ color: '#E5E7EB', marginBottom: '16px' }}>
              Company
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#" style={{ color: '#9CA3AF' }}>About</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Careers</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Contact</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Blog</a>
            </div>
          </Col>
          <Col xs={24} lg={4}>
            <Title level={5} style={{ color: '#E5E7EB', marginBottom: '16px' }}>
              Support
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#" style={{ color: '#9CA3AF' }}>Help Center</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Documentation</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Status</a>
              <a href="#" style={{ color: '#9CA3AF' }}>Security</a>
            </div>
          </Col>
        </Row>
        <Divider style={{ borderColor: 'rgba(94, 241, 255, 0.2)', margin: '32px 0 24px' }} />
        <Row justify="space-between" align="middle">
          <Col>
            <Text style={{ color: '#9CA3AF' }}>
              © 2024 Q-Router™. All rights reserved.
            </Text>
          </Col>
          <Col>
            <Text style={{ color: '#9CA3AF' }}>
              Powered by{' '}
              <a 
                href="https://yablokolabs.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#5EF1FF' }}
              >
                Yabloko Labs
              </a>
            </Text>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}