import React from 'react';
import { List, Avatar } from 'antd';

const mockMessages = [
  { id: 1, sender: 'admin', message: 'Welcome to the EMS!', date: '2025-08-10' },
  { id: 2, sender: 'john', message: 'Project update attached.', date: '2025-08-09' },
];

const MessageList: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={mockMessages}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar>{item.sender[0].toUpperCase()}</Avatar>}
          title={item.sender}
          description={item.message}
        />
        <div>{item.date}</div>
      </List.Item>
    )}
  />
);

export default MessageList;
