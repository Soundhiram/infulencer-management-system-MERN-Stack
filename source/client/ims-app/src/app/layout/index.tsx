import { Layout, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './footer';
import { HeaderNav } from './header-nav';
import { SideNav } from './side-nav';

const { Header, Sider, Content } = Layout;

export const AppLayout: React.FC = () => {
  const [navCollapsed, setNavCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const getLayoutGutter = () => {
    if (isMobile) {
      return 0;
    }
    return navCollapsed ? '80' : '250';
  };
  return (
    <Layout>
      <HeaderNav
        isMobile={isMobile}
        navCollapsed={navCollapsed}
        setNavCollapsed={setNavCollapsed}
      />
      {/* {(isNavTop && !isMobile) ? <TopNav routeInfo={currentRouteInfo}/> : null} */}
      <Layout className="app-container">
        {!isMobile ? <SideNav navCollapsed={navCollapsed} /> : null}
        <Layout
          className="app-layout "
          style={{ paddingLeft: `${getLayoutGutter()}px` }}
        >
          <div className={`app-content app-content-layout`}>
            <Content>
              <Outlet />
            </Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
      {/* {isMobile && <MobileNav />} */}
    </Layout>
  );
};
