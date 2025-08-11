import React from 'react';
import { Table, Tag } from 'antd';

const mockReports = [
  { id: 1, date: '2025-08-10', logs: [{ project: 'Website Redesign', hours: 5, count: 2 }], status: 'Submitted' },
  { id: 2, date: '2025-08-09', logs: [{ project: 'Mobile App', hours: 3, count: 1 }], status: 'Approved' },
];

const columns = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Projects', key: 'projects', render: (_: any, record: any) => record.logs.map((log: any, idx: number) => <Tag key={idx}>{log.project} ({log.hours}h, {log.count})</Tag>) },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const ReportHistoryTable: React.FC = () => (
  <Table dataSource={mockReports} columns={columns} rowKey="id" />
);

export default ReportHistoryTable;
