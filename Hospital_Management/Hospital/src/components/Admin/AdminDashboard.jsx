import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalDepartments: 0,
    recentAppointments: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/dashboard-stats');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.put(`/appointments/${id}`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Appointment marked as ${newStatus}`);
        fetchDashboardData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment permanently?")) {
      try {
        const res = await api.delete(`/appointments/${id}/delete`);
        if (res.data.success) {
          toast.success("Appointment deleted");
          // Refresh dashboard data
          fetchDashboardData();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete appointment");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
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
    switch(status.toLowerCase()) {
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
       <Layout zone="admin" pageTitle="Admin Dashboard" breadcrumb="Admin / Dashboard">
         <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60vh'}}>
           <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
         </div>
       </Layout>
     );
  }

  return (
    <Layout zone="admin" pageTitle="Admin Dashboard" breadcrumb="Admin / Dashboard">
      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#1a73e8", "--ib": "#e8f0fe"}}>
            <div className="icon-wrap">
              <i className="bi bi-person-badge-fill"></i>
            </div>
            <div className="value">{stats.totalDoctors}</div>
            <div className="label">Total Doctors</div>
            <div className="change up">
              <i className="bi bi-person-check-fill d-inline-block me-1"></i>Active accounts
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
              <i className="bi bi-person-check-fill d-inline-block me-1"></i>Registered users
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#f39c12", "--ib": "#fff7ed"}}>
            <div className="icon-wrap">
              <i className="bi bi-calendar-check-fill"></i>
            </div>
            <div className="value">{stats.totalAppointments}</div>
            <div className="label">Total Appointments</div>
            <div className="change up">
              <i className="bi bi-clipboard2-pulse-fill d-inline-block me-1"></i>All time records
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="stat-card" style={{"--c": "#e74c3c", "--ib": "#fee2e2"}}>
            <div className="icon-wrap">
              <i className="bi bi-building-fill-add"></i>
            </div>
            <div className="value">{stats.totalDepartments}</div>
            <div className="label">Departments</div>
            <div className="change up">
              <i className="bi bi-hospital-fill d-inline-block me-1"></i>Unique specialties
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Recent Appointments */}
        <div className="col-xl-12">
          <div className="card-panel">
            <div className="d-flex align-items-center justify-content-between p-3 pb-0">
              <h5 className="font-heading" style={{fontSize: "1rem", fontWeight: "700"}}>Recent Appointments</h5>
              <Link to="/admin/appointments" className="btn-primary-custom" style={{fontSize: ".78rem", padding: "6px 14px"}}>
                <i className="bi bi-arrow-right-circle"></i> View All
              </Link>
            </div>
            <div className="p-3" style={{overflowX: "auto"}}>
              <table className="table-custom">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentAppointments.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-4">No recent appointments found</td></tr>
                  ) : (
                    stats.recentAppointments.map((appt, i) => {
                      const colors = [
                        "linear-gradient(135deg, #1a73e8, #06d6a0)",
                        "linear-gradient(135deg, #f39c12, #e74c3c)",
                        "linear-gradient(135deg, #06d6a0, #1a73e8)",
                        "linear-gradient(135deg, #e74c3c, #f39c12)",
                        "linear-gradient(135deg, #8e44ad, #3498db)"
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
                                <div className="fw-600">{appt.userId?.name || 'Unknown Patient'}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="fw-600">{appt.doctorId?.userId?.name || 'Unknown Doctor'}</div>
                            <div className="text-sub">{appt.doctorId?.specialty || 'General'}</div>
                          </td>
                          <td>
                            <div>{formatDate(appt.date)}</div>
                            <div className="text-sub">{appt.timeSlot}</div>
                          </td>
                          <td>
                            {getStatusBadge(appt.status)}
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              {appt.status === 'pending' && (
                                <button className="btn-sm-icon edit" title="Approve" style={{background: '#d1fae5', color: '#059669'}} onClick={() => handleStatusChange(appt._id, 'confirmed')}>
                                  <i className="bi bi-check-lg"></i>
                                </button>
                              )}
                              {appt.status !== 'cancelled' && (
                                <button className="btn-sm-icon warn" title="Cancel Appointment" style={{background: '#fef08a', color: '#b45309'}} onClick={() => handleStatusChange(appt._id, 'cancelled')}>
                                  <i className="bi bi-x-circle"></i>
                                </button>
                              )}
                              <Link to="/admin/appointments" className="btn-sm-icon view-btn" title="View All">
                                <i className="bi bi-eye-fill"></i>
                              </Link>
                              <button className="btn-sm-icon del" title="Delete Permanently" onClick={() => handleDeleteAppointment(appt._id)}>
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
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

export default AdminDashboard;