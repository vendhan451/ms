import React from 'react';
import { Calendar, Badge, Card } from 'antd';

const mockEvents = [
  { date: '2025-08-15', type: 'holiday', label: 'Independence Day' },
  { date: '2025-08-17', type: 'event', label: 'Team Meeting' },
  { date: '2025-08-13', type: 'leave', label: 'John on Leave' },
];

const getListData = (value: any) => {
  const dateStr = value.format('YYYY-MM-DD');
  return mockEvents.filter(e => e.date === dateStr);
};

const typeColor: Record<string, string> = {
  holiday: 'red',
  event: 'blue',
  leave: 'gold',
};

const cellRender = (value: any) => {
  const listData = getListData(value);
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {listData.map((item, idx) => (
        <li key={idx}>
          <Badge color={typeColor[item.type]} text={item.label} />
        </li>
      ))}
    </ul>
  );
};

const CompanyCalendar: React.FC = () => (
  <Card title="Company Calendar">
    <Calendar cellRender={cellRender} />
  </Card>
);

export default CompanyCalendar;
