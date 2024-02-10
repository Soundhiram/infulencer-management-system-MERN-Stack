import './style.css';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

interface HeaderNavProps {
  isMobile: boolean;
  navCollapsed: boolean;
  setNavCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  setNavCollapsed,
  navCollapsed,
  isMobile,
}) => {
  const [isNavTop, setIsNavTop] = useState<boolean>(false);

  const mode = () => {
    return 'light'; 
  };

  const navMode = mode();

  const getNavWidth = () => {
    if (isMobile) {
      return '0px';
    }
    return navCollapsed ? '80px' : '250px';
  };

  return (
    <Header
      className={`app-header header-bg ${navMode}`}
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        marginLeft: '-8px',
        marginTop: '-10px',
      }}
    >
      <div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
        <div className="nav" style={{ width: `calc(100% - ${getNavWidth()})` }}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
              {!isNavTop && !isMobile && (
                <span
                  className="ant-menu-item ant-menu-item-only-child"
                  onClick={() => setNavCollapsed(!navCollapsed)}
                >
                  <MenuOutlined className="nav-icon" style={{ fontSize: '24px' }} />
                </span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Header>
  );
};
