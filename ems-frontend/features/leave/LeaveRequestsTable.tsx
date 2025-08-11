import React from 'react';
import { Table, Button, Tag } from 'antd';

const mockRequests = [
  { id: 1, user: 'john', type: 'Annual Leave', dates: ['2025-08-15', '2025-08-17'], status: 'Pending' },
  { id: 2, user: 'jane', type: 'Sick Leave', dates: ['2025-08-12', '2025-08-13'], status: 'Approved' },
];

const columns = [
  { title: 'User', dataIndex: 'user', key: 'user' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Dates', key: 'dates', render: (_: any, record: any) => record.dates.map((date: string) => <Tag key={date}>{date}</Tag>) },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: any) => (
      <>
        <Button type="link">Approve</Button>
        <Button type="link" danger>Reject</Button>
      </>
    ),
  },
];

const LeaveRequestsTable: React.FC = () => (
  <Table dataSource={mockRequests} columns={columns} rowKey="id" rowSelection={{ type: 'checkbox' }} />
);

export default LeaveRequestsTable;
