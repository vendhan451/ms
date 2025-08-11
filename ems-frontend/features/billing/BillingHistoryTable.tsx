import React from 'react';
import { Table } from 'antd';

const mockHistory = [
  { id: 1, user: 'john', amount: 1200, details: [{ label: 'Website Redesign', value: '40h' }] },
  { id: 2, user: 'jane', amount: 950, details: [{ label: 'Mobile App', value: '32h' }] },
];

const columns = [
  { title: 'User', dataIndex: 'user', key: 'user' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  {
    title: 'Details',
    key: 'details',
    render: (_: any, record: any) => (
      <Table
        dataSource={record.details}
        columns={[{ title: 'Project', dataIndex: 'label', key: 'label' }, { title: 'Hours', dataIndex: 'value', key: 'value' }]}
        pagination={false}
        size="small"
        rowKey="label"
      />
    ),
  },
];

const BillingHistoryTable: React.FC = () => (
  <Table dataSource={mockHistory} columns={columns} rowKey="id" expandable={{ expandedRowRender: record => <div>Details for {record.user}</div> }} />
);

export default BillingHistoryTable;
