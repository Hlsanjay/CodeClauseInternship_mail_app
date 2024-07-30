import React, { useState, useEffect } from 'react';
import './ComposeDialog.css';

const ComposeDialog = ({ isOpen, onClose }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Reset state when isOpen changes (component mounts/unmounts)
  useEffect(() => {
    if (!isOpen) {
      setTo('');
      setSubject('');
      setMessage('');
    }
  }, [isOpen]);

  const handleSend = async () => {
    try {
      const response = await fetch('http://localhost:8081/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, message }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      const data = await response.json();
      alert('Email sent successfully!');
      onClose(); // Close the dialog after sending
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  const handleTrashClick = () => {
    setTo('');
    setSubject('');
    setMessage('');
  };
  
  if (!isOpen) return null;

  return (
    <div className="compose-dialog">
      <div className="compose-dialog__header">
        <span>New Message</span>
        <button className="compose-dialog__close" onClick={onClose}>×</button>
      </div>
      <div className="compose-dialog__body">
        <textarea placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} className="compose-dialog__input"></textarea>
        <textarea placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="compose-dialog__input"></textarea>
        <textarea placeholder="Compose your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="compose-dialog__textarea"></textarea>
      </div>
      <div className="compose-dialog__footer">
        <button className="compose-dialog__send" onClick={handleSend}>Send</button>
        <div className="compose-dialog__icons">
          <i className="fas fa-link"></i>
          <i className="fas fa-cancel" onClick={onClose} style={{ cursor: 'pointer' }}></i>
          <i className="fas fa-trash" onClick={handleTrashClick} style={{ cursor: 'pointer' }}></i>
        </div>
      </div>
    </div>
  );
};

export default ComposeDialog;
