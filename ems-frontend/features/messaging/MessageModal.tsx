import React, { useState } from 'react';
import { Modal, Form, Select, Checkbox, Input, Upload, Button } from 'antd';

const mockUsers = [
  { value: 'john', label: 'John' },
  { value: 'jane', label: 'Jane' },
];

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [isBroadcast, setIsBroadcast] = useState(false);

  const handleFinish = (values: any) => {
    // Call sendMessage mutation here
    onClose();
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Send Message" destroyOnClose>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="broadcast" valuePropName="checked">
          <Checkbox onChange={e => setIsBroadcast(e.target.checked)}>Broadcast (admin only)</Checkbox>
        </Form.Item>
        {!isBroadcast && (
          <Form.Item name="recipient" label="Recipient" rules={[{ required: true }]}> <Select options={mockUsers} /> </Form.Item>
        )}
        <Form.Item name="message" label="Message" rules={[{ required: true }]}> <Input.TextArea rows={4} /> </Form.Item>
        <Form.Item name="attachment" label="Attachment">
          <Upload>
            <Button>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Send</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MessageModal;
