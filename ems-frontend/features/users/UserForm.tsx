import React from 'react';
import { Form, Input, Select, Button } from 'antd';

interface UserFormProps {
  user?: any;
  onFinish: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onFinish }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (user) form.setFieldsValue(user);
    else form.resetFields();
  }, [user, form]);

  const handleFinish = (values: any) => {
    // Call create/update mutation here
    onFinish();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}> <Input /> </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}> <Input /> </Form.Item>
      <Form.Item name="role" label="Role" rules={[{ required: true }]}> <Select options={[{ value: 'admin', label: 'Admin' }, { value: 'employee', label: 'Employee' }]} /> </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
