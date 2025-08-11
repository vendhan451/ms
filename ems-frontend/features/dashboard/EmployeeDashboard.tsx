import React, { useState } from 'react';
import { Card, Statistic, Button } from 'antd';

const EmployeeDashboard: React.FC = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [timer, setTimer] = useState(0);
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (clockedIn) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [clockedIn]);

  return (
    <Card style={{ maxWidth: 400, margin: 'auto' }}>
      <Statistic title="Session Timer" value={timer} suffix="s" />
      <Button
        type={clockedIn ? 'default' : 'primary'}
        onClick={() => setClockedIn((v) => !v)}
        style={{ marginTop: 24, width: '100%' }}
      >
        {clockedIn ? 'Clock Out' : 'Clock In'}
      </Button>
    </Card>
  );
};

export default EmployeeDashboard;
