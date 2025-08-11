'use client';
import React from 'react';
import { Tabs } from 'antd';
import BillingCalculator from '../../../../features/billing/BillingCalculator';
import BillingHistoryTable from '../../../../features/billing/BillingHistoryTable';

const AdminBillingPage: React.FC = () => (
  <Tabs defaultActiveKey="calculator">
    <Tabs.TabPane tab="Calculator" key="calculator">
      <BillingCalculator />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Billing History" key="history">
      <BillingHistoryTable />
    </Tabs.TabPane>
  </Tabs>
);

export default AdminBillingPage;
