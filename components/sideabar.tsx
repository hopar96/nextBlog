'use client';

import { UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';

export default function SideBar({ isMobile }: { isMobile: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  /* const items = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UserOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`
  }))
 */
  const [selectKey, setSelectKey] = useState('');
  useEffect(() => {
    if (pathname.startsWith('/cate/')) {
      let selectedCateId = pathname.substring(6);
      setSelectKey(
        selectedCateId.indexOf('/') == -1 ? selectedCateId : selectedCateId.substring(0, selectedCateId.indexOf('/')),
      );
    } else if (pathname.startsWith('/tools')) {
      setSelectKey(pathname.split('?')[0]);
    }
  }, [pathname]);

  const onClickMenu = (props: any) => {
    let url;
    if (isNaN(props.key)) {
      url = props.key;
    } else {
      url = `/cate/${props.key}`;
    }
    router.push(url);
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      defaultCollapsed={isMobile}
      zeroWidthTriggerStyle={{ opacity: '0.6', top: '10px' }}
      /* onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }} */
    >
      <div className="logo-area flex items-center justify-center w-full">
        <Link href={'/'}>
          <span className="logo">Is Just Blog</span>
        </Link>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[String(selectKey)]} items={menuItems} onClick={onClickMenu} />
    </Sider>
  );
}

export const menuItems = [
  {
    key: '/tools',
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🛠️' } }),
    label: `도구 모음`,
    children: [
      /* {
        key: '/tools/calcul',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🛠️' } }),
        label: `계산기`,
      }, */
      {
        key: '/tools/ip',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '📡' } }),
        label: `내 IP 확인`,
      },
      {
        key: '/tools/fixPixel',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🖥️' } }),
        label: `죽은픽셀 살리기`,
      },
      {
        key: '/tools/reactionTest',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html:  '👴🏻'} }),
        label: `반응속도 테스트`,
      },
      {
        key: '/tools/ifBuyMore',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html:  '🏄🏻'} }),
        label: `물타기 계산기`,
      },
    ],
  },
  /* {
    key: String(1),
    icon: React.createElement(SmileOutlined),
    label: `유머`,
  },
  {
    key: String(2),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🙆‍♂️' } }),
    label: `노하우`,
  },
  {
    key: String(3),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '' } }),
    label: `스토리`,
  },
  {
    key: String(4),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🎬' } }),
    label: `연예가이슈`,
  },
  {
    key: String(5),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '👨‍⚖️' } }),
    label: `정치`,
  },
  {
    key: String(6),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '💰' } }),
    label: `경제`,
  },
  {
    key: String(7),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '' } }),
    label: `사회`,
  },
  {
    key: String(8),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🥊' } }),
    label: `사건사고`,
  },
  {
    key: String(9),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '⚽️' } }),
    label: `스포츠`,
  },
  {
    key: String(10),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🐶' } }),
    label: `애완동물`,
  },
  {
    key: String(11),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '👨🏻‍🦱🎬' } }),
    label: `해외연예`,
  },
  {
    key: String(12),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '' } }),
    label: `해외뉴스`,
  }, */
];
