import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../../api';

const CitizenSidebar = ({ user, handleLogout }) => {
    const location = useLocation();
    const [unreadNotifs, setUnreadNotifs] = useState(0);

    useEffect(() => {
        const fetchNotifCount = async () => {
            try {
                const res = await API.get('/notifications');
                const unread = res.data.filter(n => !n.isRead).length;
                setUnreadNotifs(unread);
            } catch (error) {
                console.error('Error fetching notification count:', error);
            }
        };
        fetchNotifCount();
        // Check every 10 seconds
        const interval = setInterval(fetchNotifCount, 10000);
        return () => clearInterval(interval);
    }, []);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <aside className="sc-sidebar d-flex flex-column" id="sc-sidebar">
            <div className="sidebar-brand">
                <div className="zone-pill citizen">
                    <svg fill="none" height="10" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="10">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg> Citizen Zone
                </div>
                <div className="d-flex align-items-center gap-2">
                    <div className="user-av green">{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div>
                    <div>
                        <div className="user-name">{user.firstName} {user.lastName}</div>
                        <div className="user-sub">{user.ward}, {user.block}</div>
                    </div>
                </div>
            </div>

            <div className="nav-section">My Services</div>
            <Link className={`nav-item text-decoration-none ${isActive('/citizen-dashboard')}`} to="/citizen-dashboard">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="7" width="7" x="3" y="3" /><rect height="7" width="7" x="14" y="3" /><rect height="7" width="7" x="14" y="14" /><rect height="7" width="7" x="3" y="14" /></svg>
                <span>My Dashboard</span>
            </Link>
            <Link className={`nav-item text-decoration-none ${isActive('/citizen-file')}`} to="/citizen-file">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                <span>File Complaint</span>
            </Link>
            <Link className={`nav-item text-decoration-none ${isActive('/citizen-history')}`} to="/citizen-history">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /></svg>
                <span>Complaint History</span>
            </Link>
            <Link className={`nav-item text-decoration-none ${isActive('/citizen-track')}`} to="/citizen-track">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span>Track Complaints</span>
            </Link>
            <Link className={`nav-item text-decoration-none ${isActive('/citizen-notifs')}`} to="/citizen-notifs">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                <span>Notifications</span>
                {unreadNotifs > 0 && <span className="nbadge red">{unreadNotifs}</span>}
            </Link>
            <Link className={`nav-item text-decoration-none ${isActive('/citizen-feedback')}`} to="/citizen-feedback">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                <span>Feedback</span>
            </Link>

            <div className="nav-section">Account</div>
            <Link className={`nav-item text-decoration-none ${isActive('/citizen-profile')}`} to="/citizen-profile">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                <span>My Profile</span>
            </Link>

            <div className="sidebar-foot">
                <div className="logout-btn" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <svg fill="none" height="15" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="15">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg> Sign Out
                </div>
            </div>
        </aside>
    );
};

export default CitizenSidebar;
