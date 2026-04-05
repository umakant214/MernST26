import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api';
import DeptSidebar from './DeptSidebar';

const DeptComms = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await API.get('/complaints');
                setComplaints(res.data);
                if (res.data.length > 0) {
                    setSelectedComplaint(res.data[0]);
                }
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchComplaints();
    }, []);

    useEffect(() => {
        if (selectedComplaint) {
            const fetchMessages = async () => {
                try {
                    const res = await API.get(`/messages/${selectedComplaint._id}`);
                    setMessages(res.data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };
            fetchMessages();
            const interval = setInterval(fetchMessages, 5000);
            return () => clearInterval(interval);
        }
    }, [selectedComplaint]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info('Logged out successfully');
        navigate('/general-home');
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedComplaint) return;

        try {
            const res = await API.post('/messages', {
                complaintId: selectedComplaint._id,
                text: newMessage
            });
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (error) {
            toast.error('Failed to send message');
        }
    };

    return (
        <>
            <div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
            <div className="d-flex" style={{ 'marginTop': '0', 'height': '100vh', 'overflow': 'hidden' }}>
                <DeptSidebar user={user} handleLogout={handleLogout} />
                <div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
                    <header className="page-header d-flex align-items-center px-3 gap-3">
                        <button aria-label="Toggle sidebar" className="sc-mob-toggle" id="sc-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button>
                        <div>
                            <div className="hdr-title">Communications</div>
                            <div className="hdr-sub">Chat with Citizens</div>
                        </div>
                    </header>
                    <main className="page-body flex-fill overflow-auto p-3">
                        <div className="page-intro"><h2>Communications</h2><p>Reply to citizen queries for active complaints</p></div>
                        {!selectedComplaint ? (
                            <div className="text-center py-5 text-muted">No active complaints for communication.</div>
                        ) : (
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <div className="sc-card">
                                        <div className="card-title mb-3">Citizens Conversations</div>
                                        <div className="mt-2">
                                            {complaints.map(c => (
                                                <div 
                                                    key={c._id} 
                                                    className={`p-2 mb-1 rounded ${selectedComplaint._id === c._id ? 'bg-light' : ''}`}
                                                    style={{cursor: 'pointer', borderLeft: selectedComplaint._id === c._id ? '3px solid var(--blue)' : 'none'}}
                                                    onClick={() => setSelectedComplaint(c)}
                                                >
                                                    <div className="fw-bold" style={{fontSize: '13px'}}>{c.citizenId?.firstName} — <span className="cid">#{c._id.slice(-4)}</span></div>
                                                    <div className="small text-muted">{c.title.slice(0, 25)}...</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="sc-card d-flex flex-column" style={{height: '500px'}}>
                                        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                                            <div>
                                                <div className="fw-bold">Chat with {selectedComplaint.citizenId?.firstName} {selectedComplaint.citizenId?.lastName}</div>
                                                <div className="small text-muted">Re: {selectedComplaint.title}</div>
                                            </div>
                                            <span className={`sc-badge b-${selectedComplaint.status.toLowerCase().replace(' ', '-')}`}>{selectedComplaint.status}</span>
                                        </div>
                                        
                                        <div className="chat-list flex-fill overflow-auto mb-3 pr-2">
                                            {messages.length === 0 ? (
                                                <div className="text-center py-5 text-muted">No messages found. Start the conversation.</div>
                                            ) : (
                                                messages.map(msg => (
                                                    <div key={msg._id} className="chat-msg mb-3">
                                                        <div className={`user-av ${msg.senderRole === 'Department' ? 'amber' : 'blue'}`} style={{ 'width': '26px', 'height': '26px', 'fontSize': '9px', 'borderRadius': '7px' }}>
                                                            {msg.senderRole === 'Department' ? 'D' : msg.senderId?.firstName?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className={`chat-bubble ${msg.senderRole === 'Department' ? 'mine' : 'theirs'}`}>
                                                                {msg.text}
                                                            </div>
                                                            <div className="chat-meta">{msg.senderRole} · {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        <form onSubmit={handleSendMessage} className="chat-input-row">
                                            <input 
                                                className="chat-in" 
                                                placeholder="Type your reply..." 
                                                value={newMessage} 
                                                onChange={(e) => setNewMessage(e.target.value)}
                                            />
                                            <button type="submit" className="chat-send">
                                                <svg fill="none" height="13" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24" width="13"><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default DeptComms;
