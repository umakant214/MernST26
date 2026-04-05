import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';
import CitizenSidebar from './CitizenSidebar';

const CitizenDashboard = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await API.get('/complaints/my');
                setComplaints(res.data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchComplaints();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info('Logged out successfully');
        navigate('/general-login');
    };

    const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        progress: complaints.filter(c => c.status === 'In Progress').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length
    };

    return (
        <>
                        <div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
            <div className="d-flex" style={{ 'marginTop': '0', 'height': '100vh', 'overflow': 'hidden' }}>
<CitizenSidebar user={user} handleLogout={handleLogout} />
<div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
<header className="page-header d-flex align-items-center px-3 gap-3">
<div><div className="hdr-title">My Dashboard</div><div className="hdr-sub">Welcome back, {user.firstName}</div></div>
<div className="ms-auto d-flex align-items-center gap-2">
<div className="profile-chip"><div className="user-av green" style={{'width': '28px', 'height': '28px', 'fontSize': '10px', 'borderRadius': '7px'}}>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div><div><div className="profile-name">{user.firstName} {user.lastName}</div><div className="profile-role">Citizen</div></div></div>
</div>
</header>
<main className="page-body flex-fill overflow-auto p-3">
<div className="page-intro"><h2>My Dashboard</h2><p>Overview of your submitted complaints</p></div>
<div className="sc-banner d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
<div><div className="fw-bold text-white" style={{'fontFamily': 'var(--font-display)', 'fontSize': '14px'}}>Have a civic issue to report?</div><div className="small" style={{'color': 'rgba(255,255,255,.6)'}}>File a complaint in under 2 minutes</div></div>
<div className="d-flex gap-2"><Link className="btn-sc-ghost btn-sm" to="/citizen-file">+ File Complaint</Link><Link className="btn-sc-ghost btn-sm" to="/citizen-track" style={{'background': 'rgba(255,255,255,.15)', 'color': '#fff', 'borderColor': 'rgba(255,255,255,.3)'}}>Track Status</Link></div>
</div>
<div className="row g-3 mb-3">
<div className="col-md-3"><div className="stat-card sc-blue"><div className="stat-icon" style={{'background': 'var(--sky)'}}><svg fill="none" height="19" stroke="var(--blue)" strokeWidth="2" viewBox="0 0 24 24" width="19"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /></svg></div><div className="stat-lbl">Total Filed</div><div className="stat-val">{stats.total}</div><div className="stat-trend neu">All time</div></div></div>
<div className="col-md-3"><div className="stat-card sc-amber"><div className="stat-icon" style={{'background': 'var(--amber-bg)'}}><svg fill="none" height="19" stroke="var(--amber)" strokeWidth="2" viewBox="0 0 24 24" width="19"><circle cx="12" cy="12" r="10" /></svg></div><div className="stat-lbl">Pending</div><div className="stat-val">{stats.pending}</div><div className="stat-trend dn">Awaiting action</div></div></div>
<div className="col-md-3"><div className="stat-card sc-blue"><div className="stat-icon" style={{'background': 'var(--sky)'}}><svg fill="none" height="19" stroke="var(--blue)" strokeWidth="2" viewBox="0 0 24 24" width="19"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div><div className="stat-lbl">In Progress</div><div className="stat-val">{stats.progress}</div><div className="stat-trend up">Being worked on</div></div></div>
<div className="col-md-3"><div className="stat-card sc-green"><div className="stat-icon" style={{'background': 'var(--green-bg)'}}><svg fill="none" height="19" stroke="var(--green)" strokeWidth="2" viewBox="0 0 24 24" width="19"><polyline points="20 6 9 17 4 12" /></svg></div><div className="stat-lbl">Resolved</div><div className="stat-val">{stats.resolved}</div><div className="stat-trend up">Check history</div></div></div>
</div>
<div className="sc-card mb-3">
<div className="d-flex justify-content-between align-items-center mb-3"><span className="card-title">Recent Complaints</span><Link className="card-action" to="/citizen-history">View all →</Link></div>
<div className="tbl-wrap"><table className="tbl"><thead><tr><th>ID</th><th>Category</th><th>Location</th><th>Filed</th><th>Status</th></tr></thead><tbody>
{complaints.length > 0 ? complaints.slice(0, 5).map((c) => (
    <tr key={c._id}>
        <td><span className="cid">#{c._id.slice(-4)}</span></td>
        <td>{c.category}</td>
        <td>{c.location}</td>
        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
        <td>
            <span className={`sc-badge ${c.status === 'Pending' ? 'b-pending' : c.status === 'In Progress' ? 'b-progress' : 'b-resolved'}`}>
                {c.status}
            </span>
        </td>
    </tr>
)) : <tr><td colSpan="5" className="text-center p-4">No complaints found.</td></tr>}
</tbody></table></div>
</div>
</main>
</div>
</div>
        </>
    );
};

export default CitizenDashboard;
