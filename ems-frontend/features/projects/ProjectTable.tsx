import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import ProjectForm from './ProjectForm';

const mockProjects = [
  { id: 1, name: 'Website Redesign', manager: 'admin', status: 'Active' },
  { id: 2, name: 'Mobile App', manager: 'john', status: 'Completed' },
];

const ProjectTable: React.FC = () => {
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Manager', dataIndex: 'manager', key: 'manager' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => { setEditingProject(record); setIsModalOpen(true); }}>Edit</Button>
          <Button type="link" danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => { setEditingProject(null); setIsModalOpen(true); }}>
        Add Project
      </Button>
      <Table dataSource={mockProjects} columns={columns} rowKey="id" />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={editingProject ? 'Edit Project' : 'Add Project'}
        destroyOnClose
      >
        <ProjectForm project={editingProject} onFinish={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default ProjectTable;
