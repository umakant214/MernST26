import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';
import CitizenSidebar from './CitizenSidebar';

const CitizenHistory = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

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

    return (
        <>
            
<div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
<div className="d-flex" style={{'marginTop': '0', 'height': '100vh', 'overflow': 'hidden'}}>
<CitizenSidebar user={user} handleLogout={handleLogout} />
<div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
<header className="page-header d-flex align-items-center px-3 gap-3">
<div><div className="hdr-title">Complaint History</div><div className="hdr-sub">Manage your past reports</div></div>
<div className="ms-auto d-flex align-items-center gap-2">
<div className="profile-chip"><div className="user-av green" style={{'width': '28px', 'height': '28px', 'fontSize': '10px', 'borderRadius': '7px'}}>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div><div><div className="profile-name">{user.firstName} {user.lastName}</div><div className="profile-role">Citizen</div></div></div>
</div>
</header>
<main className="page-body flex-fill overflow-auto p-3">
<div className="page-intro"><h2>Complaint History</h2><p>All your submitted complaints</p></div>
<div className="sc-card">
<div className="tbl-wrap"><table className="tbl"><thead><tr><th>ID</th><th>Category</th><th>Title</th><th>Location</th><th>Filed At</th><th>Status</th></tr></thead><tbody>
{complaints.length > 0 ? complaints.map((c) => (
    <tr key={c._id}>
        <td><span className="cid">#{c._id.slice(-4)}</span></td>
        <td>{c.category}</td>
        <td>{c.title}</td>
        <td>{c.location}</td>
        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
        <td>
            <span className={`sc-badge ${c.status === 'Pending' ? 'b-pending' : c.status === 'In Progress' ? 'b-progress' : 'b-resolved'}`}>
                {c.status}
            </span>
        </td>
    </tr>
)) : <tr><td colSpan="6" className="text-center p-4">No complaints found in history.</td></tr>}
</tbody></table></div>
</div>
</main>
</div>
</div>
        </>
    );
};

export default CitizenHistory;
