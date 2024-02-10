import { Drawer, Menu } from 'antd';
import { useState } from 'react';

export const NavPanel: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <Menu mode="horizontal">
        <Menu.Item onClick={() => setVisible(true)}></Menu.Item>
      </Menu>
      <Drawer
        title="Theme Config"
        placement="right"
        width={350}
        onClose={() => setVisible(false)}
        visible={visible}
      ></Drawer>
    </div>
  );
};
