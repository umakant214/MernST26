import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';

const AdminNotifs = () => {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [formData, setFormData] = useState({ title: '', content: '' });

    const fetchNotices = async () => {
        try {
            const res = await API.get('/notices');
            setNotices(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/notices', formData);
            toast.success('Notice published successfully!');
            setFormData({ title: '', content: '' });
            fetchNotices();
        } catch (error) {
            toast.error('Failed to publish notice');
        }
    };

    return (
        <>
            
<div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
<div className="d-flex" style={{'marginTop': '0', 'height': '100vh', 'overflow': 'hidden'}}>
<aside className="sc-sidebar d-flex flex-column" id="sc-sidebar">
<div className="sidebar-brand"><div className="zone-pill admin"><svg fill="none" height="10" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Admin Zone</div><div className="d-flex align-items-center gap-2"><div className="user-av red">SA</div><div><div className="user-name">Super Admin</div><div className="user-sub">system administrator</div></div></div></div>
<div className="nav-section">Overview</div>
<Link className="nav-item text-decoration-none" to="/admin-dashboard"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="7" width="7" x="3" y="3" /><rect height="7" width="7" x="14" y="3" /><rect height="7" width="7" x="14" y="14" /><rect height="7" width="7" x="3" y="14" /></svg><span>Dashboard</span></Link>
<div className="nav-section">Management</div>
<Link className="nav-item text-decoration-none" to="/admin-users"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg><span>User Management</span></Link>
<Link className="nav-item text-decoration-none" to="/admin-department"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg><span>Department Management</span></Link>
<Link className="nav-item text-decoration-none" to="/admin-complaints"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /></svg><span>Complaint Monitoring</span></Link>
<Link className="nav-item active text-decoration-none" to="/admin-notifs"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg><span>Notifications & Alerts</span></Link>
<div className="sidebar-foot"><div className="logout-btn" onClick={() => {localStorage.clear(); navigate('/general-home');}} style={{cursor: 'pointer'}}><svg fill="none" height="15" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="15"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>Sign Out</div></div>
</aside>
<div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
<header className="page-header d-flex align-items-center px-3 gap-3">
<div><div className="hdr-title">Notifications & Alerts</div><div className="hdr-sub">Broadcast messages to citizens</div></div>
</header>
<main className="page-body flex-fill overflow-auto p-3">
<div className="page-intro"><h2>Notifications & Announcements</h2></div>
<div className="row g-3">
<div className="col-md-6">
<div className="sc-card">
<div className="card-title mb-3">Broadcast Announcement</div>
<form onSubmit={handleSubmit}>
<div className="form-group"><label className="form-label-sc req">Title</label><input className="form-input-sc" name="title" required value={formData.title} onChange={handleChange} placeholder="Announcement title…"/></div>
<div className="form-group"><label className="form-label-sc req">Message</label><textarea className="form-input-sc" name="content" required value={formData.content} onChange={handleChange} placeholder="Write announcement content…"></textarea></div>
<button type="submit" className="btn-sc-primary">Publish Notice</button>
</form>
</div>
</div>
<div className="col-md-6">
<div className="sc-card">
<div className="card-title mb-3">Recent Announcements</div>
<div className="d-flex flex-column gap-2">
{notices.length > 0 ? notices.map((n) => (
    <div className="announce" key={n._id}>
        <div className="ann-title">{n.title}</div>
        <div className="ann-body">{n.content}</div>
        <div className="ann-time">{new Date(n.createdAt).toLocaleString()}</div>
    </div>
)) : <div className="text-center p-3">No announcements yet.</div>}
</div>
</div>
</div>
</div>
</main>
</div>
</div>
        </>
    );
};

export default AdminNotifs;
