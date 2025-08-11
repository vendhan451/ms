'use client';
import React, { useState } from 'react';
import { Button } from 'antd';
import MessageModal from '../../../features/messaging/MessageModal';
import MessageList from '../../../features/messaging/MessageList';

const MessagesPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: '2rem' }}>
      <Button type="primary" onClick={() => setModalOpen(true)} style={{ marginBottom: 16 }}>Send Message</Button>
      <MessageModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <MessageList />
    </div>
  );
};

export default MessagesPage;
