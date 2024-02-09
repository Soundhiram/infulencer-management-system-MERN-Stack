import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './footer';
import { HeaderNav } from './header-nav';
import { SideNav } from './side-nav';

const { Header, Sider, Content } = Layout;

export const AppLayout: React.FC = () => {
  const [navCollapsed, setNavCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // useEffect to update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Update breakpoint as needed
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getLayoutGutter = () => {
    return isMobile || navCollapsed ? 100 : 265;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <HeaderNav
          isMobile={isMobile}
          navCollapsed={navCollapsed}
          setNavCollapsed={setNavCollapsed}
        />
      <Layout>
      {!isMobile ? <SideNav navCollapsed={navCollapsed} /> : null}

        <Layout style={{ marginLeft: getLayoutGutter(), transition: 'margin-left 0.2s',marginTop:'65px',marginRight:'15px' }}>
          <Content >
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

