'use client';
import React from 'react';
import ReportForm from '../../../features/reports/ReportForm';
import ReportHistoryTable from '../../../features/reports/ReportHistoryTable';

const ReportsPage: React.FC = () => (
  <div style={{ maxWidth: 700, margin: 'auto', padding: '2rem' }}>
    <ReportForm />
    <ReportHistoryTable />
  </div>
);

export default ReportsPage;
