import React from 'react';
import { Form, Button, Select, InputNumber, Card } from 'antd';

const mockProjects = [
  { value: 1, label: 'Website Redesign' },
  { value: 2, label: 'Mobile App' },
];

const ReportForm: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    // Call createReport mutation here
    if (onFinish) onFinish();
  };

  return (
    <Card title="Submit Work Report" style={{ marginBottom: 24 }}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.List name="logs">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} style={{ marginBottom: 8 }}>
                  <Form.Item {...restField} name={[name, 'projectId']} label="Project" rules={[{ required: true }]}> <Select options={mockProjects} /> </Form.Item>
                  <Form.Item {...restField} name={[name, 'hours']} label="Hours" rules={[{ required: true }]}> <InputNumber min={0} /> </Form.Item>
                  <Form.Item {...restField} name={[name, 'count']} label="Count" rules={[{ required: true }]}> <InputNumber min={0} /> </Form.Item>
                  <Button type="link" danger onClick={() => remove(name)}>Remove</Button>
                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block>Add Log</Button>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Submit Report</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ReportForm;
