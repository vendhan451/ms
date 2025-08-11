'use client';
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useLoginMutation } from '../../../lib/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const result: any = await login(values).unwrap();
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      dispatch(setCredentials({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      }));
      router.replace('/dashboard');
    } catch (error: any) {
      message.error(error?.data?.detail || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Login</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}> <Input.Password /> </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>Login</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
