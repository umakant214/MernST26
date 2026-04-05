import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminAssign = () => {
    const navigate = useNavigate();
    return (
        <>
            
<div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
<div className="d-flex" style={{'marginTop': '0', 'height': '100vh', 'overflow': 'hidden'}}>
<aside className="sc-sidebar d-flex flex-column" id="sc-sidebar">
<div className="sidebar-brand"><div className="zone-pill admin"><svg fill="none" height="10" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Admin Zone</div><div className="d-flex align-items-center gap-2"><div className="user-av red">SA</div><div><div className="user-name">Super Admin</div><div className="user-sub">system administrator</div></div></div></div>
<div className="nav-section">Overview</div>
<Link className="nav-item text-decoration-none" to="/admin-dashboard"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="7" width="7" x="3" y="3" /><rect height="7" width="7" x="14" y="3" /><rect height="7" width="7" x="14" y="14" /><rect height="7" width="7" x="3" y="14" /></svg><span>Dashboard</span></Link>
{/*  <Link className="nav-item text-decoration-none" to="/admin-analytics"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg><span>Reports &amp; Analytics</span></Link>  */}
<div className="nav-section">Management</div>
<Link className="nav-item text-decoration-none" to="/admin-users"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg><span>User Management</span><span className="nbadge blue">14</span></Link>
<Link className="nav-item text-decoration-none" to="/admin-department"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg><span>Department Management</span></Link>
<Link className="nav-item text-decoration-none" to="/admin-categories"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7" /></svg><span>Complaint Categories</span></Link>
<Link className="nav-item text-decoration-none" to="/admin-complaints"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /></svg><span>Complaint Monitoring</span><span className="nbadge red">8</span></Link>
<Link className="nav-item active text-decoration-none" to="/admin-assign"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg><span>Complaint Assignment</span></Link>
<div className="nav-section">Communication</div>
<Link className="nav-item text-decoration-none" to="/admin-notifs"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg><span>Notifications &amp; Alerts</span></Link>
{/*  <div className="nav-section">Account</div>
<Link className="nav-item text-decoration-none" to="/admin-login"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg><span>Admin Login</span></Link>  */}
<div className="sidebar-foot"><div className="logout-btn" onClick={() => {localStorage.clear(); navigate('/general-home');}} style={{cursor: 'pointer'}}><svg fill="none" height="15" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="15"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>Sign Out</div></div>
</aside>
<div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
<header className="page-header d-flex align-items-center px-3 gap-3"><button aria-label="Toggle sidebar" className="sc-mob-toggle" id="sc-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button>
<div><div className="hdr-title">Complaint Assignment</div><div className="hdr-sub">Smart City Citizen Services</div></div>
<div className="ms-auto d-flex align-items-center gap-2"><div className="hdr-divider"></div><div className="profile-chip"><div className="user-av red" style={{'width': '28px', 'height': '28px', 'fontSize': '10px', 'borderRadius': '7px'}}>SA</div><div><div className="profile-name">Super Admin</div><div className="profile-role">Administrator</div></div><span className="chevron">▾</span></div></div>
</header>
<main className="page-body flex-fill overflow-auto p-3">
<div className="page-intro"><h2>Complaint Assignment</h2><p>Route unassigned complaints to departments</p></div>
<div className="sc-card">
<div className="d-flex justify-content-between align-items-center mb-3"><span className="card-title">Unassigned Complaints (42)</span></div>
<div className="tbl-wrap"><table className="tbl"><thead><tr><th>ID</th><th>Category</th><th>Citizen</th><th>Location</th><th>Filed</th><th>Assign To</th><th>Action</th></tr></thead><tbody>
<tr><td><span className="cid">#3204</span></td><td>Water Supply</td><td>Rahul M.</td><td>Ward 7</td><td>Today 9:30am</td><td><select className="form-input-sc" style={{'width': '150px', 'padding': '5px 8px'}}><option>Select Dept</option><option selected="">Water Supply</option></select></td><td><button className="btn-sc-primary btn-sm">Assign</button></td></tr>
<tr><td><span className="cid">#3199</span></td><td>Garbage</td><td>Sunita K.</td><td>Model Town</td><td>3 days ago</td><td><select className="form-input-sc" style={{'width': '150px', 'padding': '5px 8px'}}><option selected="">Select Dept</option><option>Sanitation</option></select></td><td><button className="btn-sc-primary btn-sm">Assign</button></td></tr>
<tr><td><span className="cid">#3198</span></td><td>Street Light</td><td>Vijay T.</td><td>Park Road</td><td>4 days ago</td><td><select className="form-input-sc" style={{'width': '150px', 'padding': '5px 8px'}}><option selected="">Select Dept</option><option>Electricity</option></select></td><td><button className="btn-sc-primary btn-sm">Assign</button></td></tr>
</tbody></table></div>
</div>
</main>
</div>
</div>



        </>
    );
};

export default AdminAssign;
