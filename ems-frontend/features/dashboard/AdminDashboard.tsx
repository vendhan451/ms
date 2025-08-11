import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';

const stats = [
  { title: 'Total Employees', value: 120 },
  { title: 'Present Today', value: 98 },
  { title: 'On Leave', value: 7 },
  { title: 'Projects', value: 15 },
];

const AdminDashboard: React.FC = () => (
  <Row gutter={[16, 16]}>
    {stats.map((stat) => (
      <Col xs={24} sm={12} md={6} key={stat.title}>
        <Card>
          <Statistic title={stat.title} value={stat.value} />
        </Card>
      </Col>
    ))}
  </Row>
);

export default AdminDashboard;
