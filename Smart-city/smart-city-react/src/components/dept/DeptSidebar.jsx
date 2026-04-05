import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../../api';

const DeptSidebar = ({ user, handleLogout }) => {
    const location = useLocation();
    const [assignedCount, setAssignedCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await API.get('/complaints');
                // Filter by status if needed, but for now total assigned
                setAssignedCount(res.data.length);
            } catch (error) {
                console.error('Error fetching assigned count:', error);
            }
        };
        fetchCount();
        const interval = setInterval(fetchCount, 30000); // refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <aside className="sc-sidebar d-flex flex-column" id="sc-sidebar">
            <div className="sidebar-brand">
                <div className="zone-pill dept">
                    <svg fill="none" height="10" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="10">
                        <path d="M3 9l9-7 9 7v11H3z" />
                    </svg> Dept. Zone
                </div>
                <div className="d-flex align-items-center gap-2">
                    <div className="user-av amber">{user.departmentName?.charAt(0) || 'D'}</div>
                    <div>
                        <div className="user-name">{user.departmentName || 'Department'}</div>
                        <div className="user-sub">{user.name || 'officer'}</div>
                    </div>
                </div>
            </div>

            <div className="nav-section">Main</div>
            <Link className={`nav-item text-decoration-none ${isActive('/dept-dashboard')}`} to="/dept-dashboard">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="7" width="7" x="3" y="3" /><rect height="7" width="7" x="14" y="3" /><rect height="7" width="7" x="14" y="14" /><rect height="7" width="7" x="3" y="14" /></svg>
                <span>Dashboard</span>
            </Link>
            <Link className={`nav-item text-decoration-none ${isActive('/dept-complaints')}`} to="/dept-complaints">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /></svg>
                <span>Assigned Complaints</span>
                {assignedCount > 0 && <span className="nbadge amber">{assignedCount}</span>}
            </Link>
            <Link className={`nav-item text-decoration-none ${isActive('/dept-resolve')}`} to="/dept-resolve">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                <span>Resolution Center</span>
            </Link>
            <Link className={`nav-item text-decoration-none ${isActive('/dept-comms')}`} to="/dept-comms">
                <svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                <span>Citizen Comms</span>
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

export default DeptSidebar;
