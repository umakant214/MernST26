import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api';
import DeptSidebar from './DeptSidebar';

const DeptResolve = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await API.get('/complaints');
                setComplaints(res.data);
                if (res.data.length > 0) {
                    setSelectedComplaint(res.data[0]);
                    setStatus(res.data[0].status);
                    setNotes(res.data[0].resolutionNotes || '');
                }
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedComplaint) return;

        try {
            await API.put(`/complaints/${selectedComplaint._id}`, {
                status,
                resolutionNotes: notes
            });
            toast.success('Complaint status updated');
            // Refresh list
            const res = await API.get('/complaints');
            setComplaints(res.data);
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const selectComplaint = (c) => {
        setSelectedComplaint(c);
        setStatus(c.status);
        setNotes(c.resolutionNotes || '');
    };

    return (
        <>
            <div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
            <div className="d-flex" style={{ 'marginTop': '0', 'height': '100vh', 'overflow': 'hidden' }}>
                <DeptSidebar user={user} handleLogout={handleLogout} />
                <div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
                    <header className="page-header d-flex align-items-center px-3 gap-3">
                        <button aria-label="Toggle sidebar" className="sc-mob-toggle" id="sc-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button>
                        <div>
                            <div className="hdr-title">Resolution Center</div>
                            <div className="hdr-sub">Manage and Resolve Assigned Issues</div>
                        </div>
                    </header>
                    <main className="page-body flex-fill overflow-auto p-3">
                        <div className="page-intro"><h2>Resolution Management</h2><p>Update complaint status and add resolution details</p></div>
                        {!selectedComplaint ? (
                            <div className="text-center py-5 text-muted">No complaints assigned to resolve.</div>
                        ) : (
                            <div className="row g-3">
                                <div className="col-md-7">
                                    <div className="sc-card">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div><span className="cid me-2">#{selectedComplaint._id.slice(-4)}</span><span className={`sc-badge b-${selectedComplaint.status.toLowerCase().replace(' ', '-')}`}>{selectedComplaint.status}</span></div>
                                        </div>
                                        <div style={{ 'fontSize': '14px', 'fontWeight': '700', 'color': 'var(--gray-900)', 'marginBottom': '4px' }}>{selectedComplaint.title}</div>
                                        <div style={{ 'fontSize': '12px', 'color': 'var(--gray-400)', 'marginBottom': '12px' }}>Citizen: {selectedComplaint.citizenId?.firstName} {selectedComplaint.citizenId?.lastName} · {selectedComplaint.location}</div>
                                        <div className="p-3 rounded mb-3" style={{ 'background': 'var(--gray-50)', 'fontSize': '13px', 'color': 'var(--gray-600)', 'lineHeight': '1.6' }}>{selectedComplaint.description}</div>
                                        
                                        <form onSubmit={handleUpdate}>
                                            <div className="form-group">
                                                <label className="form-label-sc req">Update Status</label>
                                                <select className="form-input-sc" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Resolved">Resolved</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label-sc req">Resolution Notes</label>
                                                <textarea 
                                                    className="form-input-sc" 
                                                    rows="4" 
                                                    placeholder="Describe actions taken..." 
                                                    value={notes} 
                                                    onChange={(e) => setNotes(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button type="submit" className="btn-sc-primary">Update Status</button>
                                                <button type="button" className="btn-sc-ghost">Save Draft</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="sc-card mb-3">
                                        <div className="card-title">Pending Resolutions</div>
                                        <div className="mt-2">
                                            {complaints.filter(c => c.status !== 'Resolved').map(c => (
                                                <div 
                                                    key={c._id} 
                                                    className={`p-2 mb-1 rounded border-0 ${selectedComplaint._id === c._id ? 'bg-light' : ''}`}
                                                    style={{cursor: 'pointer', borderLeft: selectedComplaint._id === c._id ? '3px solid var(--blue)' : 'none'}}
                                                    onClick={() => selectComplaint(c)}
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div style={{fontSize: '13px', fontWeight: 'bold'}}>#{c._id.slice(-4)} - {c.title.slice(0, 20)}...</div>
                                                        <span className={`sc-badge b-${c.status.toLowerCase().replace(' ', '-')}`} style={{fontSize: '10px'}}>{c.status}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="sc-card">
                                        <div className="card-title mb-3">Complaint Timeline</div>
                                        <div className="timeline">
                                            <div className="tl-item"><div className="tl-left"><div className="tl-dot done">✓</div><div className="tl-line"></div></div><div className="tl-body"><div className="tl-title">Complaint Filed</div><div className="tl-desc">Filed via citizen portal</div></div></div>
                                            <div className="tl-item"><div className="tl-left"><div className={`tl-dot ${selectedComplaint.status !== 'Pending' ? 'done' : 'active'}`}>{selectedComplaint.status !== 'Pending' ? '✓' : '→'}</div><div className="tl-line"></div></div><div className="tl-body"><div className="tl-title">Under Review</div><div className="tl-desc">Officer is analyzing the issue</div></div></div>
                                            <div className="tl-item"><div className="tl-left"><div className={`tl-dot ${selectedComplaint.status === 'Resolved' ? 'done' : (selectedComplaint.status === 'In Progress' ? 'active' : 'wait')}`}>{selectedComplaint.status === 'Resolved' ? '✓' : (selectedComplaint.status === 'In Progress' ? '→' : '○')}</div></div><div className="tl-body"><div className="tl-title">Work in Progress</div><div className="tl-desc">On-site action being taken</div></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default DeptResolve;
