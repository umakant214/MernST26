import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    todaysAppointmentsCount: 0,
    totalPatients: 0,
    prescriptionsCount: 0,
    unreadMessages: 0,
    todaysAppointments: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/doctors/dashboard-stats');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load doctor dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment permanently?")) {
      try {
        const res = await api.delete(`/appointments/${id}/delete`);
        if (res.data.success) {
          toast.success("Appointment deleted successfully");
          fetchDashboardData(); // Refresh list after deletion
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete appointment");
      }
    }
  };

  const getInitials = (name) => {
    if (!name) return 'UN';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved':
      case 'confirmed':
        return <span className="badge-status badge-confirmed">Confirmed</span>;
      case 'pending':
        return <span className="badge-status badge-pending">Pending</span>;
      case 'completed':
        return <span className="badge-status badge-completed">Completed</span>;
      case 'cancelled':
        return <span className="badge-status badge-cancelled">Cancelled</span>;
      default:
        return <span className="badge-status">{status}</span>;
    }
  };

  if (loading) {
     return (
       <Layout zone="doctor" pageTitle="Doctor Dashboard" breadcrumb="Doctor / Dashboard">
         <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60vh'}}>
           <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
         </div>
       </Layout>
     );
  }

  return (
    <Layout zone="doctor" pageTitle="Doctor Dashboard" breadcrumb="Doctor / Dashboard">
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#1a73e8", "--ib": "#e8f0fe"}}>
            <div className="icon-wrap">
              <i className="bi bi-calendar-check-fill"></i>
            </div>
            <div className="value">{stats.todaysAppointmentsCount}</div>
            <div className="label">Today's Appointments</div>
            <div className="change up">
              <i className="bi bi-clock-fill d-inline-block me-1"></i>For {new Date().toLocaleDateString('en-GB')}
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#06d6a0", "--ib": "#d1fae5"}}>
            <div className="icon-wrap">
              <i className="bi bi-people-fill"></i>
            </div>
            <div className="value">{stats.totalPatients}</div>
            <div className="label">Total Patients</div>
            <div className="change up">
              <i className="bi bi-person-heart d-inline-block me-1"></i>Connected patients
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#f39c12", "--ib": "#fff7ed"}}>
            <div className="icon-wrap">
              <i className="bi bi-file-medical-fill"></i>
            </div>
            <div className="value">{stats.prescriptionsCount}</div>
            <div className="label">Prescriptions Issued</div>
            <div className="change up">
              <i className="bi bi-capsule d-inline-block me-1"></i>Total records
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#e74c3c", "--ib": "#fee2e2"}}>
            <div className="icon-wrap">
              <i className="bi bi-chat-dots-fill"></i>
            </div>
            <div className="value">{stats.unreadMessages}</div>
            <div className="label">Unread Messages</div>
            <div className="change down">
              <i className="bi bi-envelope-fill d-inline-block me-1"></i>Waiting for reply
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-xl-12">
          <div className="card-panel">
            <div className="d-flex align-items-center justify-content-between p-3 pb-0">
              <h5 className="font-heading" style={{fontSize: "1rem", fontWeight: "700"}}>Today's Appointments</h5>
              <Link to="/doctor/appointments" className="btn-primary-custom" style={{fontSize: ".78rem", padding: "6px 14px"}}>
                <i className="bi bi-calendar3"></i> Full View
              </Link>
            </div>
            <div className="p-3" style={{overflowX: "auto"}}>
              <table className="table-custom">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.todaysAppointments.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-4">No appointments scheduled for today.</td></tr>
                  ) : (
                    stats.todaysAppointments.map((appt, i) => {
                      const colors = [
                        "linear-gradient(135deg, #1a73e8, #06d6a0)",
                        "linear-gradient(135deg, #f39c12, #e74c3c)",
                        "linear-gradient(135deg, #06d6a0, #1a73e8)",
                        "linear-gradient(135deg, #e74c3c, #f39c12)",
                        "linear-gradient(135deg, #7c3aed, #1a73e8)"
                      ];
                      const bg = colors[i % colors.length];

                      return (
                        <tr key={appt._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="doc-avatar" style={{background: bg}}>
                                {getInitials(appt.userId?.name)}
                              </div>
                              <div>
                                <div style={{fontWeight: "600"}}>{appt.userId?.name || 'Unknown'}</div>
                                <div className="text-sub">{appt.reasonForVisit || 'Regular Checkup'}</div>
                              </div>
                            </div>
                          </td>
                          <td>{appt.timeSlot}</td>
                          <td>
                            <span className="pill-tag pill-blue">In-Person</span>
                          </td>
                          <td>
                            {getStatusBadge(appt.status)}
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button className="btn-sm-icon view-btn" title="Start/View">
                                <i className="bi bi-play-fill"></i>
                              </button>
                              <button className="btn-sm-icon edit" title="Reschedule">
                                <i className="bi bi-arrow-repeat"></i>
                              </button>
                              <button className="btn-sm-icon del" title="Delete" onClick={() => handleDeleteAppointment(appt._id)}>
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;