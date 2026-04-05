import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';
import DeptSidebar from './DeptSidebar';

const DeptDashboard = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        const fetchDeptComplaints = async () => {
            try {
                const res = await API.get('/complaints');
                setComplaints(res.data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchDeptComplaints();
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
                <DeptSidebar user={user} handleLogout={handleLogout} />
                <div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
                    <header className="page-header d-flex align-items-center px-3 gap-3">
                        <div>
                            <div className="hdr-title">Dashboard</div>
                            <div className="hdr-sub">{user.departmentName} Department Monitoring</div>
                        </div>
                    </header>
                    <main className="page-body flex-fill overflow-auto p-3">
                        <div className="page-intro"><h2>Department Dashboard</h2><p>Live status of assigned civic issues</p></div>
                        <div className="row g-3 mb-3">
                            <div className="col-md-3">
                                <div className="stat-card sc-blue">
                                    <div className="stat-lbl">Total Assigned</div>
                                    <div className="stat-val">{stats.total}</div>
                                    <div className="stat-trend neu">Issues received</div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stat-card sc-amber">
                                    <div className="stat-lbl">Pending Action</div>
                                    <div className="stat-val" style={{color: 'var(--amber)'}}>{stats.pending}</div>
                                    <div className="stat-trend dn">Awaiting start</div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stat-card sc-blue">
                                    <div className="stat-lbl">In Progress</div>
                                    <div className="stat-val" style={{color: 'var(--blue)'}}>{stats.progress}</div>
                                    <div className="stat-trend up">Ongoing work</div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stat-card sc-green">
                                    <div className="stat-lbl">Total Resolved</div>
                                    <div className="stat-val" style={{color: 'var(--green)'}}>{stats.resolved}</div>
                                    <div className="stat-trend up">Completed tasks</div>
                                </div>
                            </div>
                        </div>
                        <div className="sc-card">
                            <div className="card-title mb-3">Recent Assignments</div>
                            <div className="tbl-wrap">
                                <table className="tbl">
                                    <thead><tr><th>ID</th><th>Category</th><th>Issue</th><th>Filed Date</th><th>Status</th></tr></thead>
                                    <tbody>
                                        {complaints.slice(0, 5).map(c => (
                                            <tr key={c._id}>
                                                <td><span className="cid">#{c._id.slice(-4)}</span></td>
                                                <td>{c.category}</td>
                                                <td><div className="fw-bold">{c.title}</div><div className="small text-muted">{c.location}</div></td>
                                                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                                <td><span className={`sc-badge b-${c.status.toLowerCase().replace(' ', '-')}`}>{c.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default DeptDashboard;
