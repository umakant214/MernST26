import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Statistics
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/appointments');
      if (res.data.success) {
        setAppointments(res.data.data);
        
        let pending = 0;
        let confirmed = 0;
        res.data.data.forEach(apt => {
          if (apt.status === 'pending') pending++;
          if (apt.status === 'confirmed' || apt.status === 'approved') confirmed++;
        });
        setPendingCount(pending);
        setConfirmedCount(confirmed);
      }
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.put(`/appointments/${id}`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Appointment marked as ${newStatus}`);
        fetchAppointments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this appointment?")) {
      try {
        const res = await api.delete(`/appointments/${id}/delete`);
        if (res.data.success) {
          toast.success("Appointment deleted");
          fetchAppointments();
        }
      } catch (error) {
        toast.error("Failed to delete appointment");
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

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
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
       <Layout zone="admin" pageTitle="Appointments" breadcrumb="Admin / Appointments">
         <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60vh'}}>
           <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
         </div>
       </Layout>
     );
  }

  return (
    <Layout zone="admin" pageTitle="Appointments" breadcrumb="Admin / Appointments">
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <div className="stat-card" style={{ '--c': '#f39c12', '--ib': '#fff7ed', padding: '14px 18px' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="value" style={{ fontSize: '1.6rem' }}>{pendingCount}</div>
                <div className="label">Pending</div>
              </div>
              <div className="icon-wrap" style={{ margin: '0' }}>
                <i className="bi bi-hourglass-split"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div className="stat-card" style={{ '--c': '#1a73e8', '--ib': '#e8f0fe', padding: '14px 18px' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="value" style={{ fontSize: '1.6rem' }}>{confirmedCount}</div>
                <div className="label">Confirmed</div>
              </div>
              <div className="icon-wrap" style={{ margin: '0' }}>
                <i className="bi bi-calendar-check-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-panel">
        <div className="d-flex align-items-center justify-content-between p-3 pb-0">
          <h5 className="font-heading" style={{ fontSize: '1rem', fontWeight: '700' }}>All Appointments</h5>
        </div>
        <div className="p-3" style={{ overflowX: 'auto' }}>
          <table className="table-custom">
            <thead>
              <tr>
                <th>Appt. ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-4">No appointments found</td></tr>
              ) : (
                appointments.map((apt, i) => {
                  const colors = [
                    "linear-gradient(135deg, #1a73e8, #06d6a0)",
                    "linear-gradient(135deg, #f39c12, #e74c3c)",
                    "linear-gradient(135deg, #06d6a0, #1a73e8)",
                    "linear-gradient(135deg, #e74c3c, #f39c12)",
                    "linear-gradient(135deg, #8e44ad, #3498db)"
                  ];
                  const bg = colors[i % colors.length];

                  return (
                    <tr key={apt._id}>
                      <td style={{ fontFamily: "'Outfit',sans-serif", fontWeight: '700', color: 'var(--primary)' }}>
                        #{apt._id.substring(apt._id.length - 6).toUpperCase()}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="doc-avatar" style={{ background: bg }}>
                            {getInitials(apt.userId?.name)}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600' }}>{apt.userId?.name || 'Unknown Patient'}</div>
                          </div>
                        </div>
                      </td>
                      <td>{apt.doctorId?.userId?.name || 'Unknown Doctor'}</td>
                      <td>
                        <span className="pill-tag pill-blue">{apt.doctorId?.specialty || 'General'}</span>
                      </td>
                      <td>
                        <div>{formatDate(apt.date)}</div>
                        <div className="text-sub">{apt.timeSlot}</div>
                      </td>
                      <td>{apt.type || 'In-Person'}</td>
                      <td>
                        {getStatusBadge(apt.status)}
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          {apt.status === 'pending' && (
                            <button className="btn-sm-icon edit" title="Approve" style={{background: '#d1fae5', color: '#059669'}} onClick={() => handleStatusChange(apt._id, 'confirmed')}>
                              <i className="bi bi-check-lg"></i>
                            </button>
                          )}
                          {apt.status !== 'cancelled' && (
                            <button className="btn-sm-icon warn" title="Cancel Appointment" style={{background: '#fef08a', color: '#b45309'}} onClick={() => handleStatusChange(apt._id, 'cancelled')}>
                              <i className="bi bi-x-circle"></i>
                            </button>
                          )}
                          <button className="btn-sm-icon del" title="Delete Permanently" onClick={() => handleDelete(apt._id)}>
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
    </Layout>
  );
};

export default AdminAppointments;