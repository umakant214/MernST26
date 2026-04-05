import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';

const AdminUsers = () => {
    const navigate = useNavigate();
    const [citizens, setCitizens] = useState([]);

    useEffect(() => {
        const fetchCitizens = async () => {
            try {
                const res = await API.get('/admin/citizens');
                setCitizens(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCitizens();
    }, []);

    return (
        <>
            
<div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
<div className="d-flex" style={{'marginTop': '0', 'height': '100vh', 'overflow': 'hidden'}}>
<aside className="sc-sidebar d-flex flex-column" id="sc-sidebar">
<div className="sidebar-brand"><div className="zone-pill admin"><svg fill="none" height="10" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Admin Zone</div><div className="d-flex align-items-center gap-2"><div className="user-av red">SA</div><div><div className="user-name">Super Admin</div><div className="user-sub">system administrator</div></div></div></div>
<div className="nav-section">Overview</div>
<Link className="nav-item text-decoration-none" to="/admin-dashboard"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="7" width="7" x="3" y="3" /><rect height="7" width="7" x="14" y="3" /><rect height="7" width="7" x="14" y="14" /><rect height="7" width="7" x="3" y="14" /></svg><span>Dashboard</span></Link>
<div className="nav-section">Management</div>
<Link className="nav-item active text-decoration-none" to="/admin-users"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg><span>User Management</span></Link>
<Link className="nav-item text-decoration-none" to="/admin-department"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg><span>Department Management</span></Link>
<Link className="nav-item text-decoration-none" to="/admin-complaints"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /></svg><span>Complaint Monitoring</span></Link>
<Link className="nav-item text-decoration-none" to="/admin-notifs"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg><span>Notifications & Alerts</span></Link>
<div className="sidebar-foot"><div className="logout-btn" onClick={() => {localStorage.clear(); navigate('/general-home');}} style={{cursor: 'pointer'}}><svg fill="none" height="15" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="15"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>Sign Out</div></div>
</aside>
<div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
<header className="page-header d-flex align-items-center px-3 gap-3">
<div><div className="hdr-title">User Management</div><div className="hdr-sub">Registered Citizens</div></div>
</header>
<main className="page-body flex-fill overflow-auto p-3">
<div className="page-intro"><h2>Registered Citizens</h2><p>Overview of all people registered in the smart city portal</p></div>
<div className="sc-card">
<div className="tbl-wrap"><table className="tbl"><thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Ward / Block</th><th>Action</th></tr></thead><tbody>
{citizens.length > 0 ? citizens.map((val) => (
    <tr key={val._id}>
        <td><div className="d-flex align-items-center gap-2"><div className="td-av" style={{'background': 'var(--blue)'}}>{val.firstName.charAt(0)}</div>{val.firstName} {val.lastName}</div></td>
        <td>{val.email}</td>
        <td>{val.mobileNumber}</td>
        <td>{val.ward}, {val.block}</td>
        <td><button className="btn-sc-ghost btn-sm">Edit</button></td>
    </tr>
)) : <tr><td colSpan="5" className="text-center p-4">No citizens registered yet.</td></tr>}
</tbody></table></div>
</div>
</main>
</div>
</div>
        </>
    );
};

export default AdminUsers;
