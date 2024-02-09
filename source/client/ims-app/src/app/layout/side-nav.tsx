import Sider from 'antd/es/layout/Sider';
import { MenuContent } from './menu-content';

interface SideNavProps {
  navCollapsed: boolean;
}

export const SideNav: React.FC<SideNavProps> = ({ navCollapsed }) => {
  return (
    <Sider
      className={`side-nav`}
      width={250}
      style={{ position: 'fixed', height: '100vh', zIndex: 1 ,top:'62px'}}
      collapsed={navCollapsed}
    >
      <MenuContent type={'SIDE'} />
    </Sider>
  );
};
