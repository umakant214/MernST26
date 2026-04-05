import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api';
import DeptSidebar from './DeptSidebar';

const DeptComplaints = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [complaints, setComplaints] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await API.get('/complaints');
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
        navigate('/general-home');
    };

    const filteredComplaints = complaints.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c._id.slice(-4).includes(searchTerm)
    );

    return (
        <>
            <div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
            <div className="d-flex" style={{ 'marginTop': '0', 'height': '100vh', 'overflow': 'hidden' }}>
                <DeptSidebar user={user} handleLogout={handleLogout} />
                <div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
                    <header className="page-header d-flex align-items-center px-3 gap-3">
                        <button aria-label="Toggle sidebar" className="sc-mob-toggle" id="sc-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button>
                        <div>
                            <div className="hdr-title">Assigned Complaints</div>
                            <div className="hdr-sub">{user.departmentName} Department</div>
                        </div>
                        <div className="ms-auto d-flex align-items-center gap-2">
                             <div className="profile-chip">
                                <div className="user-av amber" style={{ 'width': '28px', 'height': '28px', 'fontSize': '10px', 'borderRadius': '7px' }}>{user.departmentName?.charAt(0)}</div>
                                <div><div className="profile-name">{user.departmentName}</div><div className="profile-role">Department</div></div>
                                <span className="chevron">▾</span>
                             </div>
                        </div>
                    </header>
                    <main className="page-body flex-fill overflow-auto p-3">
                        <div className="page-intro"><h2>Assigned Complaints</h2><p>Overview of all issues assigned to your department</p></div>
                        <div className="sc-card mb-3">
                            <div className="d-flex gap-2 flex-wrap align-items-center">
                                <div className="search-inner flex-grow-1">
                                    <svg fill="none" height="14" stroke="#94A3B8" strokeWidth="2" viewBox="0 0 24 24" width="14"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
                                    <input 
                                        placeholder="Search complaints by ID or title..." 
                                        value={searchTerm} 
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sc-card">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="card-title">Assigned Tasks ({filteredComplaints.length})</span>
                                <button className="btn-sc-ghost btn-sm">Export</button>
                            </div>
                            <div className="tbl-wrap">
                                <table className="tbl">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Category</th>
                                            <th>Citizen</th>
                                            <th>Location</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredComplaints.map(c => (
                                            <tr key={c._id}>
                                                <td><span className="cid">#{c._id.slice(-4)}</span></td>
                                                <td>{c.category}</td>
                                                <td>{c.citizenId?.firstName} {c.citizenId?.lastName}</td>
                                                <td>{c.location}</td>
                                                <td><span className={`sc-badge b-${c.status.toLowerCase().replace(' ', '-')}`}>{c.status}</span></td>
                                                <td><Link className="btn-sc-primary btn-sm" to="/dept-resolve">Manage</Link></td>
                                            </tr>
                                        ))}
                                        {filteredComplaints.length === 0 && <tr><td colSpan="6" className="text-center py-4 text-muted">No complaints found.</td></tr>}
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

export default DeptComplaints;
