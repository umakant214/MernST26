import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { io } from 'socket.io-client';

const DoctorChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [defaultRecipient, setDefaultRecipient] = useState(null);
  const socketRef = useRef();
  const chatEndRef = useRef();

  useEffect(() => {
    fetchDefaultRecipient();
    const socketUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:5001';
    socketRef.current = io(socketUrl);

    if (currentUser?._id) {
        socketRef.current.emit('join', currentUser._id);
    }

    socketRef.current.on('newMessage', (msg) => {
        setMessages(prev => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, [currentUser]);

  useEffect(() => {
    if (defaultRecipient) {
        fetchHistory();
    }
  }, [defaultRecipient]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchDefaultRecipient = async () => {
    try {
        const res = await api.get('/appointments');
        if (res.data.data.length > 0) {
            setDefaultRecipient(res.data.data[0].userId);
        }
    } catch (e) {
        console.error("No recipients found");
    }
  };

  const fetchHistory = async () => {
    try {
        const res = await api.get(`/messages/${defaultRecipient._id}`);
        setMessages(res.data.data);
    } catch (e) {
        console.error("Failed to load history");
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !defaultRecipient) return;

    const msgData = {
        senderId: currentUser._id,
        receiverId: defaultRecipient._id,
        message: inputText
    };

    socketRef.current.emit('sendMessage', msgData);
    setInputText('');
  };

  return (
    <Layout zone="doctor" pageTitle="Chat" breadcrumb="Doctor / Chat">
      <div className="card-panel p-3">
        <div className="d-flex flex-column" style={{ height: '450px' }}>
          <div className="flex-grow-1" style={{ overflowY: 'auto', marginBottom: '15px', paddingBottom: '10px' }}>
            <div className="mb-3">
              <div className="fw-600">
                Priya Rawat — <span style={{ fontSize: '.75rem', fontWeight: '400', color: 'var(--text-light)' }}>
                  2 hours ago
                </span>
              </div>
              <div style={{
                background: 'var(--body-bg)',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '.85rem',
                marginTop: '5px'
              }}>
                Dr., When can I book an appointment?
              </div>
            </div>

            <div className="mb-3">
              <div className="fw-600">
                You — <span style={{ fontSize: '.75rem', fontWeight: '400', color: 'var(--text-light)' }}>
                  1 hour ago
                </span>
              </div>
              <div style={{
                background: 'var(--body-bg)',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '.85rem',
                marginTop: '5px'
              }}>
                You can book from 2-5 PM today.
              </div>
            </div>

            {messages.map((m, i) => (
              <div key={i} className={`mb-3 ${m.sender === currentUser?._id ? 'text-end' : ''}`}>
                <div className="fw-600">
                  {m.sender === currentUser?._id ? 'You' : (defaultRecipient?.name || 'Patient')} — <span style={{ fontSize: '.75rem', fontWeight: '400', color: 'var(--text-light)' }}>
                     {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div style={{
                  background: m.sender === currentUser?._id ? 'var(--primary-light)' : 'var(--body-bg)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '.85rem',
                  marginTop: '5px',
                  display: 'inline-block',
                  textAlign: 'left'
                }}>
                  {m.message}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="d-flex gap-2" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              className="form-control-custom" 
              placeholder="Type your message..." 
              style={{ flex: 1 }} 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="btn-primary-custom" type="submit">
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorChat;