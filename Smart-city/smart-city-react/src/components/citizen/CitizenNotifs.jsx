import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CitizenSidebar from './CitizenSidebar';
import API from '../../api';

const CitizenNotifs = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifs = async () => {
            try {
                const res = await API.get('/notifications');
                setNotifications(res.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info('Logged out successfully');
        navigate('/general-login');
    };

    const markAsRead = async (id) => {
        try {
            await API.put(`/notifications/${id}`);
            setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const markAllRead = async () => {
        try {
            const unread = notifications.filter(n => !n.isRead);
            await Promise.all(unread.map(n => API.put(`/notifications/${n._id}`)));
            setNotifications(notifications.map(n => ({ ...n, isRead: true })));
            toast.success('All notifications marked as read');
        } catch (error) {
            toast.error('Failed to mark all as read');
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
                            <div className="hdr-title">Notifications</div>
                            <div className="hdr-sub">Welcome back, {user.firstName}</div>
                        </div>
                        <div className="ms-auto d-flex align-items-center gap-2">
                            <div className="profile-chip"><div className="user-av green" style={{ 'width': '28px', 'height': '28px', 'fontSize': '10px', 'borderRadius': '7px' }}>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div><div><div className="profile-name">{user.firstName} {user.lastName}</div><div className="profile-role">Citizen</div></div></div>
                        </div>
                    </header>
                    <main className="page-body flex-fill overflow-auto p-3">
                        <div className="page-intro"><h2>Notifications</h2><p>All updates on your complaints and city announcements</p></div>
                        <div className="sc-card">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="card-title">All Notifications ({notifications.filter(n => !n.isRead).length} Unread)</span>
                                {notifications.some(n => !n.isRead) && (
                                    <button className="btn-sc-ghost btn-sm" onClick={markAllRead}>Mark all read</button>
                                )}
                            </div>
                            
                            {notifications.length === 0 ? (
                                <div className="text-center py-5 text-muted">
                                    No notifications yet.
                                </div>
                            ) : (
                                notifications.map(notif => (
                                    <div 
                                        key={notif._id} 
                                        className={`d-flex align-items-start gap-3 p-3 border-bottom ${notif.isRead ? 'opacity-75' : ''}`}
                                        style={{ background: notif.isRead ? 'transparent' : 'var(--sky)', cursor: 'pointer' }}
                                        onClick={() => !notif.isRead && markAsRead(notif._id)}
                                    >
                                        <div style={{ 'width': '38px', 'height': '38px', 'borderRadius': '10px', 'background': notif.type === 'StatusUpdate' ? 'var(--green-bg)' : 'var(--sky)', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'flexShrink': '0' }}>
                                            {notif.type === 'StatusUpdate' ? (
                                                <svg fill="none" height="16" stroke="var(--green)" strokeWidth="2" viewBox="0 0 24 24" width="16"><polyline points="20 6 9 17 4 12" /></svg>
                                            ) : (
                                                <svg fill="none" height="16" stroke="var(--blue)" strokeWidth="2" viewBox="0 0 24 24" width="16"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>                                            
                                            )}
                                        </div>
                                        <div className="flex-fill">
                                            <div className="d-flex justify-content-between mb-1">
                                                <div style={{ 'fontSize': '13px', 'fontWeight': '700', 'color': 'var(--gray-900)' }}>{notif.title}</div>
                                                <span style={{ 'fontSize': '11px', 'color': 'var(--gray-400)' }}>
                                                    {new Date(notif.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <p style={{ 'fontSize': '13px', 'color': 'var(--gray-600)', 'lineHeight': '1.5', 'margin': 0 }}>{notif.message}</p>
                                        </div>
                                        {!notif.isRead && <div style={{width: '8px', height: '8px', background: 'var(--blue)', borderRadius: '50%', marginTop: '6px'}}></div>}
                                    </div>
                                ))
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default CitizenNotifs;
