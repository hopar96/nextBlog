'use client';

import { UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { MenuItems } from '../lib/constants';

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
      <Menu theme="dark" mode="inline" selectedKeys={[String(selectKey)]} items={MenuItems} onClick={onClickMenu} />
    </Sider>
  );
}

