import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import UserForm from './UserForm';

const mockUsers = [
  { id: 1, username: 'admin', role: 'admin', email: 'admin@example.com' },
  { id: 2, username: 'john', role: 'employee', email: 'john@example.com' },
];

const UserTable: React.FC = () => {
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => { setEditingUser(record); setIsModalOpen(true); }}>Edit</Button>
          <Button type="link" danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => { setEditingUser(null); setIsModalOpen(true); }}>
        Add User
      </Button>
      <Table dataSource={mockUsers} columns={columns} rowKey="id" />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={editingUser ? 'Edit User' : 'Add User'}
        destroyOnClose
      >
        <UserForm user={editingUser} onFinish={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default UserTable;
