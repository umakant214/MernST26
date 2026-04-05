import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Shared/Layout';
import api from '../../services/api';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ upcoming: 0, prescriptions: 0, past: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/appointments/my-appointments');
      if (res.data.success) {
        const apts = res.data.data;
        setAppointments(apts);

        // Calculate Stats
        const now = new Date();
        const upcomingCount = apts.filter(a => (a.status === 'confirmed' || a.status === 'pending') && new Date(a.date) >= now).length;
        const pastCount = apts.filter(a => a.status === 'completed' || (a.status !== 'cancelled' && new Date(a.date) < now)).length;
        const rxCount = apts.filter(a => a.prescription && a.prescription.trim().length > 0).length;

        setStats({
          upcoming: upcomingCount,
          prescriptions: rxCount,
          past: pastCount
        });
      }
    } catch (e) {
      console.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => name?.split(' ').map(w => w[0]).join('').slice(0, 2) || 'AS';

  const upcomingApts = appointments.filter(a => (a.status === 'confirmed' || a.status === 'pending')).slice(0, 5);
  const activeRx = appointments.filter(a => a.prescription && a.prescription.trim().length > 0).slice(0, 2);

  return (
    <Layout zone="patient" pageTitle="Patient Dashboard" breadcrumb="Patient / Dashboard">
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#1a73e8", "--ib": "#e8f0fe"}}>
            <div className="icon-wrap">
              <i className="bi bi-calendar-check-fill"></i>
            </div>
            <div className="value">{stats.upcoming}</div>
            <div className="label">Upcoming Appointments</div>
            <div className="change up">
              <i className="bi bi-info-circle-fill"></i>Next: {upcomingApts[0] ? new Date(upcomingApts[0].date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}) : 'None Scheduled'}
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#06d6a0", "--ib": "#d1fae5"}}>
            <div className="icon-wrap">
              <i className="bi bi-file-medical-fill"></i>
            </div>
            <div className="value">{stats.prescriptions}</div>
            <div className="label">Active Prescriptions</div>
            <div className="change up">
              <i className="bi bi-arrow-up-short"></i>{stats.prescriptions > 0 ? 'Review your records' : 'No prescriptions'}
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#f39c12", "--ib": "#fff7ed"}}>
            <div className="icon-wrap">
              <i className="bi bi-clock-history"></i>
            </div>
            <div className="value">{stats.past}</div>
            <div className="label">Past Appointments</div>
            <div className="change up">
              <i className="bi bi-arrow-up-short"></i>All records available
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#e74c3c", "--ib": "#fee2e2"}}>
            <div className="icon-wrap">
              <i className="bi bi-bell-fill"></i>
            </div>
            <div className="value">0</div>
            <div className="label">Notifications</div>
            <div className="change down">
              <i className="bi bi-exclamation-circle-fill"></i>All Caught Up
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-xl-8">
          {/* My Appointments */}
          <div className="card-panel mb-3">
            <div className="d-flex align-items-center justify-content-between p-3 pb-0">
              <h5 className="font-heading" style={{fontSize: "1rem", fontWeight: "700"}}>My Appointments</h5>
              <Link to="/patient/book-appointment" className="btn-primary-custom" style={{fontSize: ".78rem", padding: "6px 14px"}}>
                <i className="bi bi-plus-lg"></i> Book New
              </Link>
            </div>
            <div className="p-3" style={{overflowX: "auto"}}>
              {loading ? (
                <div className="text-center py-4">Loading appointments...</div>
              ) : (
                <table className="table-custom">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Department</th>
                      <th>Date & Time</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-4 text-muted">You have no appointments yet.</td></tr>
                    ) : appointments.slice(0, 5).map((apt) => (
                      <tr key={apt._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="doc-avatar" style={{background: apt.status === 'confirmed' ? 'linear-gradient(135deg,#1a73e8,#00b4d8)' : 'var(--primary--light)'}}>
                              {getInitials(apt.doctorId?.userId?.name)}
                            </div>
                            <div>
                              <div style={{fontWeight: "600"}}>{apt.doctorId?.userId?.name || 'Assigned Doctor'}</div>
                              <div className="text-sub">{apt.doctorId?.specialty || 'General'}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="pill-tag pill-blue">{apt.doctorId?.specialty || 'General'}</span>
                        </td>
                        <td>
                          <div>{new Date(apt.date).toLocaleDateString()}</div>
                          <div className="text-sub">{apt.time}</div>
                        </td>
                        <td>
                          <span className={`pill-tag ${apt.type === 'Video Consult' ? 'pill-blue' : 'pill-green'}`}>{apt.type || 'In-Person'}</span>
                        </td>
                        <td>
                          <span className={`badge-status badge-${apt.status === 'confirmed' ? 'confirmed' : apt.status === 'completed' ? 'success' : apt.status === 'cancelled' ? 'cancelled' : 'pending'}`}>
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="card-panel p-3">
            <div className="section-header mb-3">
              <h5>Active Prescriptions</h5>
              <Link to="/patient/prescriptions" className="view-all">View All</Link>
            </div>
            <div className="row g-2">
              {loading ? (
                 <div className="text-center py-3">Loading prescriptions...</div>
              ) : activeRx.length === 0 ? (
                 <div className="col-12 text-center py-3 text-muted">No active prescriptions available.</div>
              ) : activeRx.map((rx, idx) => (
                <div key={rx._id} className="col-md-6">
                  <div className="rx-card">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <div className="rx-drug">{rx.doctorId?.userId?.name}'s Counsel</div>
                        <div className="rx-dosage">{rx.prescription?.substring(0, 50)}...</div>
                      </div>
                      <span className="badge-status badge-confirmed">Active</span>
                    </div>
                    <div className="rx-duration">
                      <i className="bi bi-clock"></i> Issued {new Date(rx.date).toLocaleDateString()}
                    </div>
                    <div className="progress-mini">
                      <div className="progress-mini-fill" style={{width: idx % 2 === 0 ? "75%" : "40%"}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-panel p-3 mt-3">
            <div className="section-header mb-3">
              <h5>Quick Actions</h5>
            </div>
            <div className="row g-2">
              <div className="col-6 col-md-3">
                <Link to="/patient/book-appointment" className="btn-primary-custom" style={{justifyContent: "center", width: "100%", flexDirection: "column", padding: "14px", gap: "6px", fontSize: ".78rem"}}>
                  <i className="bi bi-calendar-plus-fill" style={{fontSize: "1.2rem"}}></i>
                  Book Appointment
                </Link>
              </div>
              <div className="col-6 col-md-3">
                <Link to="/patient/prescriptions" className="btn-outline-custom" style={{justifyContent: "center", width: "100%", flexDirection: "column", padding: "14px", gap: "6px", fontSize: ".78rem"}}>
                  <i className="bi bi-file-medical-fill" style={{fontSize: "1.2rem"}}></i>
                  Prescriptions
                </Link>
              </div>
              <div className="col-6 col-md-3">
                <Link to="/patient/chat" className="btn-outline-custom" style={{justifyContent: "center", width: "100%", flexDirection: "column", padding: "14px", gap: "6px", fontSize: ".78rem"}}>
                  <i className="bi bi-chat-dots-fill" style={{fontSize: "1.2rem"}}></i>
                  Message Doctor
                </Link>
              </div>
              <div className="col-6 col-md-3">
                <Link to="/patient/appointments" className="btn-outline-custom" style={{justifyContent: "center", width: "100%", flexDirection: "column", padding: "14px", gap: "6px", fontSize: ".78rem"}}>
                  <i className="bi bi-clock-history" style={{fontSize: "1.2rem"}}></i>
                  Visit History
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          {/* Notifications */}
          <div className="card-panel p-3 mb-3">
            <div className="section-header mb-2">
              <h5>Notifications</h5>
              <span className="view-all" style={{cursor: "default", color: "var(--text-light)"}}>View All</span>
            </div>
            <div className="notif-item unread">
              <div className="notif-icon" style={{background: "#e8f0fe", color: "#1a73e8"}}>
                <i className="bi bi-calendar-event-fill"></i>
              </div>
              <div>
                <div className="notif-text">Welcome to your patient portal!</div>
                <div className="notif-time">Just now</div>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon" style={{background: "#d1fae5", color: "#065f46"}}>
                <i className="bi bi-file-medical-fill"></i>
              </div>
              <div>
                <div className="notif-text">Keep your health profile updated</div>
                <div className="notif-time">Today</div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="card-panel p-3">
            <div className="section-header mb-3">
              <h5>Rate Your Last Visit</h5>
            </div>
            {appointments.length > 0 && appointments.find(a => a.status === 'completed') ? (
              <div style={{textAlign: "center", padding: "6px 0"}}>
                <div className="doc-avatar" style={{width: "52px", height: "52px", borderRadius: "14px", margin: "0 auto 10px", fontSize: "1.1rem"}}>
                   {getInitials(appointments.find(a => a.status === 'completed')?.doctorId?.userId?.name)}
                </div>
                <div style={{fontWeight: "700", fontSize: ".95rem"}}>{appointments.find(a => a.status === 'completed')?.doctorId?.userId?.name}</div>
                <div style={{fontSize: ".78rem", color: "var(--text-light)"}}>Unique Visit Records Available</div>
                <div className="star-rating mt-3 mb-2" id="starRating">☆ ☆ ☆ ☆ ☆</div>
                <textarea className="form-control-custom" rows="3" placeholder="Share your experience…" style={{fontSize: ".82rem", resize: "none", textAlign: "left"}}></textarea>
                <button className="btn-primary-custom mt-3 w-100" style={{justifyContent: "center"}}>
                  <i className="bi bi-star-fill"></i> Submit Feedback
                </button>
              </div>
            ) : (
              <div className="text-center py-4 text-muted" style={{fontSize: '0.85rem'}}>
                 No completed visits to rate yet. Check back after your next consultation!
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;