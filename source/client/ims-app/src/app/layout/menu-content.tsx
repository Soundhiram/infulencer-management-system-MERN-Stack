import './style.css';
import { useState } from 'react';
import { Menu, Button, Dropdown, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from './component/icon';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

interface MenuContentProps {
  type: string;
}

export const MenuContent: React.FC<MenuContentProps> = ({ type }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await logout(); // Log out the user
  //     navigate('/login'); // Redirect to login page after logout
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  const menuItems = [
    {
      key: 'logout',
      label: (
        <span
          className="color-primary side-nav-text"
          onClick={() => setVisible(true)}
        >
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

      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        // onOk={handleLogout}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Menu>
  );
};
