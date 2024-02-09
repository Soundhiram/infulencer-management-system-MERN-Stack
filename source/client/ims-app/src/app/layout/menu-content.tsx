import './style.css';
import { useState } from 'react';
import { Menu, Button, Dropdown, Modal, MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from './component/icon';
import { DashboardOutlined, UserOutlined,DownOutlined } from '@ant-design/icons';
import { logout } from '../store/actions/authActions';
import { RoutingConstraints } from '../route/constraints';
import { useDispatch } from 'react-redux';


interface MenuContentProps {
  type: string;
}

export const MenuContent: React.FC<MenuContentProps> = ({ type }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSignOut = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
  
    try {
      // Remove JWT token from local storage
      localStorage.removeItem('token');
      console.log('JWT token removed from local storage');
  
      // Dispatch logout action
      dispatch(logout());
      console.log('Logout action dispatched');
  
      // Redirect to the login page
      navigate('/login');
      console.log('Redirected to login page');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <span className="color-primary side-nav-text" onClick={handleSignOut}>
          Logout
        </span>
      ),
    },
  ];

  return (
    <Menu
      theme="light"
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item key="dashboard" style={{ paddingLeft: '35px' }}>
        <Link to="/home/dashboard" className="icon-primary width-adjustment">
          <>
            <Icon type={DashboardOutlined} className="icon-primary" />
            <span className="color-primary side-nav-text">Dashboard</span>
          </>
        </Link>
      </Menu.Item>
      {/* Add other menu items here */}

      <Menu.Item key="form" style={{ paddingLeft: '35px' }}>
        <Link to="/home/form" className="icon-primary">
          <>
            <Icon type={UserOutlined} className="icon-primary" />
            <span className="color-primary side-nav-text">Influencer-Form</span>
          </>
        </Link>
      </Menu.Item>

      {/* Add more menu items as needed */}

      <Menu
        theme={'light'}
        mode="inline"
        style={{ position: 'absolute', bottom: 0 }}
        defaultSelectedKeys={[]}
        className={'hide-group-title'}
      >
        <Menu.Item key={'menuItem'}>
          <Button
            type="default"
            className="custom-sideNav-user-button mr-3"
            style={{ width: '3px' }}
          >
            A
          </Button>
          <Dropdown menu={{ items }}>
            <span onClick={(e) => e.preventDefault()}>
              <span className="color-primary side-nav-text">Employee</span>
              <DownOutlined />
            </span>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Menu>
  );
};
