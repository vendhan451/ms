import React from 'react';
import { Layout as AntLayout } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = AntLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AntLayout>
            <Header>
                <div className="logo" />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ padding: 24, minHeight: 280 }}>
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Employee Management System ©{new Date().getFullYear()} Created by Your Name
            </Footer>
        </AntLayout>
    );
};

export default Layout;