'use client';
import React from 'react';
import CompanyCalendar from '../../../features/calendar/CompanyCalendar';

const CalendarPage: React.FC = () => (
  <div style={{ maxWidth: 900, margin: 'auto', padding: '2rem' }}>
    <CompanyCalendar />
  </div>
);

export default CalendarPage;
