import './style.css';
import { useState } from 'react';
import { Menu, Modal, Button, Dropdown, MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from './component/icon';
import {
  DashboardOutlined,
  UserOutlined,
  DownOutlined,
  UnorderedListOutlined,
  FormOutlined,
  LogoutOutlined, 
} from '@ant-design/icons';
import { logout } from '../store/actions/authActions';
import { RoutingConstraints } from '../route/constraints';
import { useDispatch } from 'react-redux';

interface MenuContentProps {
  type: string;
}

export const MenuContent: React.FC<MenuContentProps> = ({ type }) => {
  const [visible, setVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); // State for logout confirmation modal
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    try {
      localStorage.removeItem('token');
      dispatch(logout());
      navigate('/login');
      console.log('Redirected to login page');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const handleLogoutCancel = () => {
    setLogoutModalVisible(false);
  };

  const handleLogoutConfirm = () => {
    handleSignOut();
    setLogoutModalVisible(false);
  };

  return (
    <>
      <Menu theme="light" mode="inline" style={{ height: '100%' }}>
        <Menu.Item key="dashboard" style={{ paddingLeft: '35px' }}>
          <Link to="/home/dashboard" className="icon-primary width-adjustment">
            <>
              <Icon type={DashboardOutlined} className="icon-primary" />
              <span className="color-primary side-nav-text">Dashboard</span>
            </>
          </Link>
        </Menu.Item>

        <Menu.Item key="form" style={{ paddingLeft: '35px' }}>
          <Link
            to="/home/influencerform"
            className="icon-primary width-adjustment"
          >
            <>
              <Icon type={FormOutlined} className="icon-primary" />
              <span className="color-primary side-nav-text">Influencer-Form</span>
            </>
          </Link>
        </Menu.Item>

        <Menu.Item key="list" style={{ paddingLeft: '35px' }}>
          <Link
            to="/home/influencerlist"
            className="icon-primary width-adjustment"
          >
            <>
              <Icon type={UnorderedListOutlined} className="icon-primary" />
              <span className="color-primary side-nav-text">Influencer-List</span>
            </>
          </Link>
        </Menu.Item>
        <Menu.Item key="ShareFeedback" style={{ paddingLeft: '35px' }}>
          <Link
            to="/home/sharefeedback"
            className="icon-primary width-adjustment"
          >
            <>
              <Icon type={UnorderedListOutlined} className="icon-primary" />
              <span className="color-primary side-nav-text">Feedback</span>
            </>
          </Link>
        </Menu.Item>

        <Menu.Item key="logout" style={{ paddingLeft: '35px' }}>
          <Icon type={LogoutOutlined} className="icon-primary" />
          <span className="color-primary side-nav-text" onClick={showLogoutModal}>
            Logout
          </span>
        </Menu.Item>
      </Menu>

      <Modal
        title="Logout Confirmation"
        visible={logoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};
