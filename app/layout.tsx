import '../styles/global.css'
// import 'antd/dist/reset.css';

import { Metadata } from 'next'
import SideBar from '../components/sideabar'

import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Header, Content, Footer } from 'antd/lib/layout/layout'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { headers } from 'next/headers'
import {UAParser} from 'ua-parser-js'
import { IpMetadata, PixelMetadata } from '../lib/constants'

export const metadata = () => {
  const { get } = headers();

  if(get('x-pathname')?.startsWith('/tools/ip')){
    return IpMetadata;
  }else if(get('x-pathname')?.startsWith('/tools/fixPixel')){
    return PixelMetadata;
  }

  return {
    title: {
      template: '%s',
      default: 'Home',
    },
    description: 'IsJustBlog is just blog made by nextJs created by LHJ',
  };
}
  
export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  
  const colorBgContainer = '#fff'
  const borderRadiusLG = '0.8'

  const { get } = headers()
  const ua = get('user-agent')
  const device = new UAParser(ua || '').getDevice();
  const isMobile = device.type === 'mobile';

  return (
    <html lang="ko">
      <head>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1122134236443449"
      crossOrigin="anonymous"></script>
      </head>
      <body>
        <AntdRegistry>
          <div id="container">
            <Layout className="ant-layout-has-sider">
              <SideBar isMobile={isMobile} />
              <Layout>
                <Header className='hidden lg:block' style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ /* margin: '24px 16px 0' */ }}>
                  <div className='p-0 lg:p-[24px]'
                    style={{
                      minHeight: 360,
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                    }}
                  >
                    {children}
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  Is Just Blog ©{new Date().getFullYear()} Created by LHJ
                </Footer>
              </Layout>
            </Layout>
          </div>
        </AntdRegistry>
      </body>
    </html>
  )
}
