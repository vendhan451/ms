import React from 'react';
import { Form, Button, Select, DatePicker, Card } from 'antd';

const leaveTypes = [
  { value: 'annual', label: 'Annual Leave' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'casual', label: 'Casual Leave' },
];

const LeaveForm: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    // Call createLeaveRequest mutation here
    if (onFinish) onFinish();
  };

  return (
    <Card title="Apply for Leave" style={{ marginBottom: 24 }}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="type" label="Leave Type" rules={[{ required: true }]}> <Select options={leaveTypes} /> </Form.Item>
        <Form.Item name="dates" label="Dates" rules={[{ required: true }]}> <DatePicker.RangePicker /> </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Apply</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LeaveForm;
