import React from 'react';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/hooks';
import {
  UserOutlined,
  ProjectOutlined,
  CalendarOutlined,
  MessageOutlined,
  DashboardOutlined,
  DollarOutlined,
  FileTextOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const sidebarItems = (role: string) => [
  { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/profile', icon: <UserOutlined />, label: 'Profile' },
  { key: '/messages', icon: <MessageOutlined />, label: 'Messages' },
  { key: '/calendar', icon: <CalendarOutlined />, label: 'Calendar' },
  ...(role === 'admin'
    ? [
        { key: '/admin/users', icon: <TeamOutlined />, label: 'User Management' },
        { key: '/admin/projects', icon: <ProjectOutlined />, label: 'Project Management' },
        { key: '/admin/leave-requests', icon: <FileTextOutlined />, label: 'Leave Requests' },
        { key: '/admin/billing', icon: <DollarOutlined />, label: 'Billing' },
        { key: '/admin/reports-overview', icon: <FileTextOutlined />, label: 'Reports Overview' },
        { key: '/admin/attendance', icon: <FileTextOutlined />, label: 'Attendance' },
      ]
    : [
        { key: '/reports', icon: <FileTextOutlined />, label: 'Work Reports' },
        { key: '/leave', icon: <FileTextOutlined />, label: 'Leave' },
        { key: '/billing-history', icon: <DollarOutlined />, label: 'Billing History' },
      ]),
  { key: '/logout', icon: <LogoutOutlined />, label: 'Logout' },
];

const AppSidebar: React.FC = () => {
  const router = useRouter();
  const { role } = useAuth();

  const handleClick = (e: any) => {
    if (e.key === '/logout') {
      // Implement logout logic here
      router.replace('/login');
    } else {
      router.push(e.key);
    }
  };

  return (
    <Menu
      mode="inline"
      style={{ height: '100%', borderRight: 0, fontFamily: 'Inter, Lato, Arial, sans-serif', fontSize: 16 }}
      items={sidebarItems(role || 'employee')}
      onClick={handleClick}
    />
  );
};

export default AppSidebar;
