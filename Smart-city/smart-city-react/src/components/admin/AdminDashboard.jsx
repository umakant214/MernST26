import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchAllComplaints = async () => {
            try {
                const res = await API.get('/complaints');
                setComplaints(res.data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchAllComplaints();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info('Admin logged out');
        navigate('/general-home');
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
    <aside className="sc-sidebar d-flex flex-column" id="sc-sidebar">
      <div className="sidebar-brand">
        <div className="zone-pill admin"><svg fill="none" height="10" stroke="currentColor" strokeWidth="2.5"
            viewBox="0 0 24 24" width="10">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg> Admin Zone</div>
        <div className="d-flex align-items-center gap-2">
          <div className="user-av red">SA</div>
          <div>
            <div className="user-name">Super Admin</div>
            <div className="user-sub">system administrator</div>
          </div>
        </div>
      </div>
      <div className="nav-section">Overview</div>
      <Link className="nav-item active text-decoration-none" to="/admin-dashboard"><svg className="ni" fill="none"
          stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect height="7" width="7" x="3" y="3" />
          <rect height="7" width="7" x="14" y="3" />
          <rect height="7" width="7" x="14" y="14" />
          <rect height="7" width="7" x="3" y="14" />
        </svg><span>Dashboard</span></Link>

      <div className="nav-section">Management</div>
      <Link className="nav-item text-decoration-none" to="/admin-users"><svg className="ni" fill="none" stroke="currentColor"
          strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg><span>User Management</span></Link>
        <Link className="nav-item text-decoration-none" to="/admin-department"><svg className="ni" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg><span>Department Management</span></Link>
      <Link className="nav-item text-decoration-none" to="/admin-complaints"><svg className="ni" fill="none"
          stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg><span>Complaint Monitoring</span></Link>
      <div className="nav-section">Communication</div>
      <Link className="nav-item text-decoration-none" to="/admin-notifs"><svg className="ni" fill="none"
          stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg><span>Notifications &amp; Alerts</span></Link>
      <div className="sidebar-foot">
        <div className="logout-btn" onClick={() => {localStorage.clear(); navigate('/general-home');}} style={{cursor: 'pointer'}}>
          <svg fill="none" height="15" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="15">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          Sign Out
        </div>
      </div>
    </aside>
    <div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
      <header className="page-header d-flex align-items-center px-3 gap-3">
        <div>
          <div className="hdr-title">Dashboard</div>
          <div className="hdr-sub">Smart City Citizen Services</div>
        </div>
      </header>
      <main className="page-body flex-fill overflow-auto p-3">
        <div className="page-intro">
          <h2>System Overview</h2>
          <p>Real-time statistics and system activity</p>
        </div>
        <div className="row g-3 mb-3 stat-row-auto">
          <div className="col">
            <div className="stat-card sc-blue">
              <div className="stat-icon" style={{'background': 'var(--sky)'}}><svg fill="none" height="19"
                  stroke="var(--blue)" strokeWidth="2" viewBox="0 0 24 24" width="19">
                  <path d="M3 9l9-7 9 7v11H3z" />
                </svg></div>
              <div className="stat-lbl">Total Complaints</div>
              <div className="stat-val">{stats.total}</div>
              <div className="stat-trend neu">Lifetime</div>
            </div>
          </div>
          <div className="col">
            <div className="stat-card sc-amber">
              <div className="stat-icon" style={{'background': 'var(--amber-bg)'}}><svg fill="none" height="19"
                  stroke="var(--amber)" strokeWidth="2" viewBox="0 0 24 24" width="19">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                </svg></div>
              <div className="stat-lbl">Pending</div>
              <div className="stat-val">{stats.pending}</div>
            </div>
          </div>
          <div className="col">
            <div className="stat-card sc-green">
              <div className="stat-icon" style={{'background': 'var(--green-bg)'}}><svg fill="none" height="19"
                  stroke="var(--green)" strokeWidth="2" viewBox="0 0 24 24" width="19">
                  <polyline points="20 6 9 17 4 12" />
                </svg></div>
              <div className="stat-lbl">Resolved</div>
              <div className="stat-val">{stats.resolved}</div>
            </div>
          </div>
        </div>
        <div className="sc-card">
              <div className="d-flex justify-content-between align-items-center mb-3"><span className="card-title">Recent Complaints Monitoring</span></div>
              <div className="tbl-wrap">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      <th>Citizen</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.length > 0 ? complaints.slice(0, 10).map((c) => (
                      <tr key={c._id}>
                        <td><span className="cid">#{c._id.slice(-4)}</span></td>
                        <td>{c.category}</td>
                        <td>{c.citizenId?.firstName} {c.citizenId?.lastName}</td>
                        <td>
                            <span className={`sc-badge ${c.status === 'Pending' ? 'b-pending' : c.status === 'In Progress' ? 'b-progress' : 'b-resolved'}`}>
                                {c.status}
                            </span>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="4" className="text-center p-4">No complaints to monitor.</td></tr>}
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

export default AdminDashboard;
