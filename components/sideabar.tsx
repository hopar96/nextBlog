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
    } else {
      setSelectKey('');
    }
  }, [pathname]);

  const items = [
    {
      key: String(1),
      icon: React.createElement(SmileOutlined),
      label: `썰/잡담`,
    },
    {
      key: String(2),
      icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🙆‍♂️' } }),
      label: `노하우`,
    },
  ];

  const onClickMenu = (props: any) => {
    // console.log(props);
    router.push(`/cate/${props.key}`);
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
        <Link href={'/cate'}>
          <span className="logo">Is Just Blog</span>
        </Link>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[String(selectKey)]} items={items} onClick={onClickMenu} />
    </Sider>
  );
}
