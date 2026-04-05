import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CitizenLogin = () => {
    const navigate = useNavigate();
    return (
        <>
            
<div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
<div className="d-flex" style={{'marginTop': '0', 'height': '100vh', 'overflow': 'hidden'}}>
<aside className="sc-sidebar d-flex flex-column" id="sc-sidebar">
<div className="sidebar-brand"><div className="zone-pill citizen"><svg fill="none" height="10" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="10"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>Citizen Zone</div><div className="d-flex align-items-center gap-2"><div className="user-av green">RK</div><div><div className="user-name">Rahul Kumar</div><div className="user-sub">Ward 7, Block B</div></div></div></div>
<div className="nav-section">My Services</div>
<Link className="nav-item text-decoration-none" to="/citizen-dashboard"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="7" width="7" x="3" y="3" /><rect height="7" width="7" x="14" y="3" /><rect height="7" width="7" x="14" y="14" /><rect height="7" width="7" x="3" y="14" /></svg><span>My Dashboard</span></Link>
<Link className="nav-item text-decoration-none" to="/citizen-file"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg><span>File Complaint</span></Link>
<Link className="nav-item text-decoration-none" to="/citizen-history"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /></svg><span>Complaint History</span></Link>
<Link className="nav-item text-decoration-none" to="/citizen-track"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg><span>Track Complaints</span><span className="nbadge blue">2</span></Link>
<Link className="nav-item text-decoration-none" to="/citizen-notifs"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg><span>Notifications</span><span className="nbadge red">3</span></Link>
<Link className="nav-item text-decoration-none" to="/citizen-feedback"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg><span>Feedback</span><span className="nbadge amber">2</span></Link>
<div className="nav-section">Account</div>
<Link className="nav-item text-decoration-none" to="/citizen-profile"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg><span>My Profile</span></Link>

<div className="sidebar-foot"><div className="logout-btn" ><svg fill="none" height="15" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="15"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>Sign Out</div></div>
</aside>
<div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
<header className="page-header d-flex align-items-center px-3 gap-3"><button aria-label="Toggle sidebar" className="sc-mob-toggle" id="sc-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button>
<div><div className="hdr-title">Login / Register</div><div className="hdr-sub">Welcome back, Rahul</div></div>
<div className="hdr-search ms-3 flex-grow-1" style={{'maxWidth': '320px'}}><div className="search-inner"><svg fill="none" height="14" stroke="#94A3B8" strokeWidth="2" viewBox="0 0 24 24" width="14"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg><input placeholder="Track complaint by ID…"/></div></div>
<div className="ms-auto d-flex align-items-center gap-2">
<div className="position-relative">
<button className="hdr-icon-btn" ><svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg><div className="notif-pip"></div></button>
<div className="notif-panel" id="cn-notif">
<div className="notif-hd d-flex justify-content-between align-items-center"><span className="notif-hd-title">Notifications</span><span className="notif-clear">Mark all read</span></div>
<div className="notif-item"><div className="notif-av" style={{'background': 'var(--green-bg)'}}><svg fill="none" height="13" stroke="var(--green)" strokeWidth="2" viewBox="0 0 24 24" width="13"><polyline points="20 6 9 17 4 12" /></svg></div><div><div className="notif-text">Complaint #3204 is now In Progress</div><div className="notif-time">1 hr ago</div></div></div>
<div className="notif-item"><div className="notif-av" style={{'background': 'var(--sky)'}}><svg fill="none" height="13" stroke="var(--blue)" strokeWidth="2" viewBox="0 0 24 24" width="13"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg></div><div><div className="notif-text">Water Dept: Team dispatched to you</div><div className="notif-time">2 hr ago</div></div></div>
</div>
</div>
<div className="hdr-divider"></div>
<div className="profile-chip"><div className="user-av green" style={{'width': '28px', 'height': '28px', 'fontSize': '10px', 'borderRadius': '7px'}}>RK</div><div><div className="profile-name">Rahul Kumar</div><div className="profile-role">Citizen</div></div><span className="chevron">▾</span></div>
</div>
</header>
<main className="page-body flex-fill overflow-auto p-3">
<div className="d-flex flex-wrap gap-4 justify-content-center align-items-start py-4">
<div className="login-card">
<div className="login-accent" style={{'background': 'linear-gradient(90deg,#14532D,var(--green))'}}></div>
<div className="d-flex align-items-center gap-2 mb-4"><div className="login-logo-mark" style={{'background': '#14532D'}}><svg fill="none" height="18" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div><div><div style={{'fontFamily': 'var(--font-display)', 'fontSize': '13px', 'fontWeight': '800', 'color': 'var(--gray-900)'}}>Smart City Portal</div><div style={{'fontSize': '11px', 'color': 'var(--gray-400)'}}>Citizen Login</div></div></div>
<div className="login-h">Welcome Back</div>
<div className="login-sub">Sign in to your citizen account</div>
<div className="form-group"><label className="form-label-sc">Mobile / Email</label><input className="form-input-sc" placeholder="+91 98765 43210"/></div>
<div className="form-group"><label className="form-label-sc">Password</label><input className="form-input-sc" placeholder="••••••••" type="password"/></div>
<button className="login-btn"  style={{'background': 'var(--green)'}}>Sign In</button>
</div>
<div className="login-card" style={{'maxWidth': '440px'}}>
<div className="login-accent" style={{'background': 'linear-gradient(90deg,var(--navy),var(--blue))'}}></div>
<div className="login-h">Create Account</div>
<div className="login-sub">Register to file and track complaints</div>
<div className="row g-2"><div className="col-6"><div className="form-group"><label className="form-label-sc req">First Name</label><input className="form-input-sc" placeholder="Rahul"/></div></div><div className="col-6"><div className="form-group"><label className="form-label-sc req">Last Name</label><input className="form-input-sc" placeholder="Kumar"/></div></div></div>
<div className="form-group"><label className="form-label-sc req">Mobile</label><input className="form-input-sc" placeholder="+91 98765 43210"/></div>
<div className="form-group"><label className="form-label-sc req">Email</label><input className="form-input-sc" placeholder="you@email.com" type="email"/></div>
<div className="form-group"><label className="form-label-sc req">Aadhaar</label><input className="form-input-sc" placeholder="XXXX-XXXX-XXXX"/></div>
<div className="row g-2"><div className="col-6"><div className="form-group"><label className="form-label-sc req">Ward</label><select className="form-input-sc"><option>Select Ward</option><option>Ward 7</option></select></div></div><div className="col-6"><div className="form-group"><label className="form-label-sc req">Block</label><input className="form-input-sc" placeholder="Block B"/></div></div></div>
<div className="form-group"><label className="form-label-sc req">Password</label><input className="form-input-sc" placeholder="Min 8 characters" type="password"/></div>
<button className="login-btn" >Create Citizen Account</button>
</div>
</div>
</main>
</div>
</div>



        </>
    );
};

export default CitizenLogin;
