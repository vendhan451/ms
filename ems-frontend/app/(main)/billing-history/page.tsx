'use client';
import React from 'react';
import BillingHistoryTable from '../../../features/billing/BillingHistoryTable';

const BillingHistoryPage: React.FC = () => (
  <div style={{ maxWidth: 700, margin: 'auto', padding: '2rem' }}>
    <BillingHistoryTable />
  </div>
);

export default BillingHistoryPage;
