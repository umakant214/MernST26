import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { io } from 'socket.io-client';

const PatientChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [defaultRecipient, setDefaultRecipient] = useState(null);
  const [loading, setLoading] = useState(true);
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
        // Only append if msg is from/to the current selected recipient
        if (msg.sender === defaultRecipient?._id || msg.receiver === defaultRecipient?._id) {
            setMessages(prev => [...prev, msg]);
        }
    });

    return () => {
        if (socketRef.current) socketRef.current.disconnect();
    };
  }, [currentUser, defaultRecipient?._id]); // Re-attach listener if recipient changes

  useEffect(() => {
    if (defaultRecipient?._id) {
        fetchHistory();
    }
  }, [defaultRecipient?._id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchDefaultRecipient = async () => {
    try {
        setLoading(true);
        const res = await api.get('/appointments/my-appointments');
        if (res.data.data && res.data.data.length > 0) {
            // Find the first appointment with a doctorId populated with userId
            const apt = res.data.data.find(a => a.doctorId?.userId);
            if (apt) {
                setDefaultRecipient(apt.doctorId.userId);
            }
        }
    } catch (e) {
        console.error("Failed to load appointments/recipient");
    } finally {
        setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
        const res = await api.get(`/messages/${defaultRecipient._id}`);
        if (res.data.success) {
            setMessages(res.data.data);
        }
    } catch (e) {
        console.error("Failed to load history");
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !defaultRecipient?._id) return;
    
    const msgData = {
        senderId: currentUser._id,
        receiverId: defaultRecipient._id,
        message: inputText
    };

    socketRef.current.emit('sendMessage', msgData);
    setInputText('');
  };

  return (
    <Layout zone="patient" pageTitle="Chat" breadcrumb="Patient / Chat">
      <div className="card-panel p-3">
        {!loading && !defaultRecipient ? (
            <div className="text-center py-5">
                <i className="bi bi-chat-dots" style={{fontSize: '3rem', color: 'var(--text-light)', opacity: 0.5}}></i>
                <h5 className="mt-3">No Active Conversations</h5>
                <p className="text-muted">You need an appointment with a doctor to start a chat.</p>
            </div>
        ) : (
          <div className="d-flex flex-column" style={{ height: '450px' }}>
            <div className="chat-header mb-3 pb-2 border-bottom">
               <div className="d-flex align-items-center">
                  <div className="doc-avatar me-2" style={{width: '32px', height: '32px', fontSize: '0.8rem'}}>
                    {defaultRecipient?.name ? defaultRecipient.name.split(' ').map(n=>n[0]).join('').slice(0,2) : 'D'}
                  </div>
                  <div>
                    <div className="fw-600" style={{fontSize: '0.9rem'}}>{defaultRecipient?.name || 'Dr. Anjali Sharma'}</div>
                    <div className="text-sub" style={{fontSize: '0.75rem'}}>Online</div>
                  </div>
               </div>
            </div>

            <div className="flex-grow-1" style={{ overflowY: 'auto', marginBottom: '15px' }}>
              {/* Static Mock Messages (to keep UI feeling premium as requested) */}
              <div className="mb-3">
                <div className="fw-600" style={{ fontSize: '.9rem' }}>
                    {defaultRecipient?.name || 'Dr. Anjali Sharma'} <span style={{ fontSize: '.75rem', fontWeight: '400', color: 'var(--text-light)' }}>• 2 hours ago</span>
                </div>
                <div style={{
                  background: 'var(--body-bg)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '.85rem',
                  marginTop: '5px'
                }}>
                  Your test results are ready. Please come for review.
                </div>
              </div>

              {messages.map((m, i) => (
                <div key={i} className={`mb-3 ${m.sender === currentUser?._id ? 'text-end' : ''}`}>
                  <div className="fw-600" style={{ fontSize: '.9rem' }}>
                    {m.sender === currentUser?._id ? 'You' : (defaultRecipient?.name || 'Doctor')} <span style={{ fontSize: '.75rem', fontWeight: '400', color: 'var(--text-light)' }}>• {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
              <button type="submit" className="btn-primary-custom" disabled={!defaultRecipient}>
                <i className="bi bi-send-fill"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PatientChat;