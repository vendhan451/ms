import React from 'react';
import { Form, Input, Select, Button } from 'antd';

interface ProjectFormProps {
  project?: any;
  onFinish: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onFinish }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (project) form.setFieldsValue(project);
    else form.resetFields();
  }, [project, form]);

  const handleFinish = (values: any) => {
    // Call create/update mutation here
    onFinish();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="name" label="Project Name" rules={[{ required: true }]}> <Input /> </Form.Item>
      <Form.Item name="manager" label="Manager" rules={[{ required: true }]}> <Input /> </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}> <Select options={[{ value: 'Active', label: 'Active' }, { value: 'Completed', label: 'Completed' }]} /> </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
