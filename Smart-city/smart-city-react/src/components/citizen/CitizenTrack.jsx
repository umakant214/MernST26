import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CitizenSidebar from './CitizenSidebar';
import API from '../../api';

const CitizenTrack = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await API.get('/complaints/my');
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
            // Polling for new messages every 5 seconds
            const interval = setInterval(fetchMessages, 5000);
            return () => clearInterval(interval);
        }
    }, [selectedComplaint]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info('Logged out successfully');
        navigate('/general-login');
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

    const handleSearch = () => {
        const found = complaints.find(c => c._id.slice(-4) === searchId || c._id === searchId);
        if (found) {
            setSelectedComplaint(found);
            setSearchId('');
        } else {
            toast.error('Complaint not found');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return 'b-pending';
            case 'In Progress': return 'b-progress';
            case 'Resolved': return 'b-resolved';
            case 'Rejected': return 'b-rejected';
            default: return 'b-pending';
        }
    };

    return (
        <>
            <div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
            <div className="d-flex" style={{ 'marginTop': '0', 'height': '100vh', 'overflow': 'hidden' }}>
                <CitizenSidebar user={user} handleLogout={handleLogout} />
                <div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
                    <header className="page-header d-flex align-items-center px-3 gap-3">
                        <button aria-label="Toggle sidebar" className="sc-mob-toggle" id="sc-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button>
                        <div>
                            <div className="hdr-title">Track Complaints</div>
                            <div className="hdr-sub">Welcome back, {user.firstName}</div>
                        </div>
                        <div className="ms-auto d-flex align-items-center gap-2">
                            <div className="profile-chip"><div className="user-av green" style={{ 'width': '28px', 'height': '28px', 'fontSize': '10px', 'borderRadius': '7px' }}>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div><div><div className="profile-name">{user.firstName} {user.lastName}</div><div className="profile-role">Citizen</div></div></div>
                        </div>
                    </header>
                    <main className="page-body flex-fill overflow-auto p-3">
                        <div className="page-intro"><h2>Track Complaints</h2><p>Real-time status of your active complaints</p></div>
                        <div className="sc-card mb-3">
                            <div className="d-flex gap-2 align-items-center">
                                <div className="search-inner flex-grow-1">
                                    <svg fill="none" height="14" stroke="#94A3B8" strokeWidth="2" viewBox="0 0 24 24" width="14"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
                                    <input 
                                        placeholder="Enter complaint ID e.g. #3204…" 
                                        value={searchId} 
                                        onChange={(e) => setSearchId(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                                <button className="btn-sc-primary" onClick={handleSearch}>Track</button>
                            </div>
                        </div>

                        {!selectedComplaint ? (
                            <div className="text-center py-5 text-muted">No complaints to track.</div>
                        ) : (
                            <div className="row g-3">
                                <div className="col-md-7">
                                    <div className="sc-card">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div><span className="cid me-2">#{selectedComplaint._id.slice(-4)}</span><span className={`sc-badge ${getStatusBadge(selectedComplaint.status)}`}>{selectedComplaint.status}</span></div>
                                            <span style={{ 'fontSize': '11px', 'color': 'var(--gray-400)' }}>Filed: {new Date(selectedComplaint.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div style={{ 'fontSize': '14px', 'fontWeight': '700', 'color': 'var(--gray-900)', 'marginBottom': '4px' }}>{selectedComplaint.title}</div>
                                        <div style={{ 'fontSize': '12px', 'color': 'var(--gray-400)', 'marginBottom': '16px' }}>{selectedComplaint.category} · {selectedComplaint.location} · {selectedComplaint.ward}</div>
                                        
                                        <div className="timeline">
                                            <div className="tl-item">
                                                <div className="tl-left"><div className="tl-dot done">✓</div><div className="tl-line"></div></div>
                                                <div className="tl-body"><div className="tl-title">Complaint Filed</div><div className="tl-desc">Successful submission via portal</div><div className="tl-time">{new Date(selectedComplaint.createdAt).toLocaleString()}</div></div>
                                            </div>
                                            <div className="tl-item">
                                                <div className="tl-left"><div className={`tl-dot ${['In Progress', 'Resolved'].includes(selectedComplaint.status) ? 'done' : 'active'}`}>→</div><div className="tl-line"></div></div>
                                                <div className="tl-body"><div className="tl-title">Under Review</div><div className="tl-desc">Department is verifying the issue</div></div>
                                            </div>
                                            <div className="tl-item">
                                                <div className="tl-left"><div className={`tl-dot ${selectedComplaint.status === 'Resolved' ? 'done' : (selectedComplaint.status === 'In Progress' ? 'active' : 'wait')}`}>{selectedComplaint.status === 'Resolved' ? '✓' : (selectedComplaint.status === 'In Progress' ? '→' : '○')}</div><div className="tl-line"></div></div>
                                                <div className="tl-body"><div className="tl-title">Work in Progress</div><div className="tl-desc">On-site action being taken</div></div>
                                            </div>
                                            <div className="tl-item">
                                                <div className="tl-left"><div className={`tl-dot ${selectedComplaint.status === 'Resolved' ? 'done' : 'wait'}`}>{selectedComplaint.status === 'Resolved' ? '✓' : '○'}</div></div>
                                                <div className="tl-body"><div className="tl-title">Resolved</div><div className="tl-desc">Final verification and closure</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="sc-card mb-3">
                                        <div className="card-title mb-3">Department Message</div>
                                        <div className="chat-list" style={{height: '300px', overflowY: 'auto', marginBottom: '15px'}}>
                                            {messages.length === 0 ? (
                                                <div className="text-center py-5 text-muted" style={{fontSize: '12px'}}>No messages yet. Ask a question to the department.</div>
                                            ) : (
                                                messages.map(msg => (
                                                    <div key={msg._id} className="chat-msg mb-3">
                                                        <div className={`user-av ${msg.senderRole === 'Citizen' ? 'green' : 'amber'}`} style={{ 'width': '26px', 'height': '26px', 'fontSize': '9px', 'borderRadius': '7px' }}>
                                                            {msg.senderRole === 'Citizen' ? user.firstName?.charAt(0) : 'D'}
                                                        </div>
                                                        <div>
                                                            <div className={`chat-bubble ${msg.senderRole === 'Citizen' ? 'mine' : 'theirs'}`}>
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
                                                placeholder="Ask a question…" 
                                                value={newMessage} 
                                                onChange={(e) => setNewMessage(e.target.value)}
                                            />
                                            <button type="submit" className="chat-send">
                                                <svg fill="none" height="13" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24" width="13"><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                            </button>
                                        </form>
                                    </div>
                                    <div className="sc-card">
                                        <div className="card-title mb-3">Your Other Complaints</div>
                                        <div className="active-list">
                                            {complaints.filter(c => c._id !== selectedComplaint._id).slice(0, 3).map(c => (
                                                <div 
                                                    key={c._id} 
                                                    className="d-flex justify-content-between align-items-center py-2 border-bottom" 
                                                    style={{cursor: 'pointer'}}
                                                    onClick={() => setSelectedComplaint(c)}
                                                >
                                                    <div><span className="cid me-2">#{c._id.slice(-4)}</span>{c.title.length > 20 ? c.title.slice(0, 20) + '...' : c.title}</div>
                                                    <span className={`sc-badge ${getStatusBadge(c.status)}`} style={{fontSize: '10px', padding: '2px 6px'}}>{c.status}</span>
                                                </div>
                                            ))}
                                            {complaints.length <= 1 && <div className="text-muted" style={{fontSize: '12px'}}>No other active complaints.</div>}
                                        </div>
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

export default CitizenTrack;
