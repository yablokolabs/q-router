import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import CustomCursor from '../components/CustomCursor';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Q-Router™ — The Quantum Way to the Fastest Route',
  description: 'Quantum-powered route optimization with AI traffic prediction for faster, more cost-efficient deliveries.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#5EF1FF',
                colorBgBase: 'rgba(11, 14, 20, 0.8)',
                colorText: '#E5E7EB',
                colorTextSecondary: '#9CA3AF',
                borderRadius: 8,
              },
              components: {
                Card: {
                  colorBgContainer: 'rgba(11, 14, 20, 0.8)',
                  colorBorder: 'rgba(94, 241, 255, 0.2)',
                },
                Button: {
                  primaryShadow: '0 4px 20px rgba(94, 241, 255, 0.3)',
                },
              },
            }}
          >
            {children}
            <CustomCursor />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}