import React from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="profile">Profile</Menu.Item>
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const AppHeader: React.FC = () => (
  <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', padding: '0 24px', boxShadow: '0 2px 8px #f0f1f2' }}>
    <img src="/logo.svg" alt="EMS Logo" style={{ height: 32, marginRight: 16 }} />
    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 22, color: '#1890ff', letterSpacing: 1 }}>EMS</span>
    <div style={{ flex: 1 }} />
    <Dropdown overlay={menu} placement="bottomRight">
      <Avatar style={{ backgroundColor: '#1890ff', marginLeft: 16 }}>A</Avatar>
    </Dropdown>
  </Header>
);

export default AppHeader;
