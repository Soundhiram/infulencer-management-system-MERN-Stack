import { Drawer, Menu } from 'antd';
import { useState } from 'react';

export const NavPanel = () => {
    const [visible,setVisible] = useState<boolean>(false)
    
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item onClick={()=>setVisible(true)}>
          {/* <SettingOutlined className="nav-icon mr-0" /> */}
        </Menu.Item>
      </Menu>
      <Drawer
        title="Theme Config"
        placement="right"
        width={350}
        onClose={()=>setVisible(false)}
        visible={visible}
      >
        {/* <ThemeConfigurator /> */}
      </Drawer>
    </>
  );
};
