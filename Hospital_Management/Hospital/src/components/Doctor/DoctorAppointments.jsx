import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/appointments');
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await api.put(`/appointments/${id}`, { status });
      if (res.data.success) {
        toast.success(`Appointment marked as ${status}`);
        fetchAppointments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const getInitials = (name) => name?.split(' ').map(w => w[0]).join('').slice(0, 2) || 'XX';
  
  const getGradient = (index) => {
    const gradients = [
      'linear-gradient(135deg, #1a73e8, #00b4d8)',
      'linear-gradient(135deg, #06d6a0, #1b9aaa)',
      'linear-gradient(135deg, #f39c12, #e67e22)',
      'linear-gradient(135deg, #9b59b6, #8e44ad)'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Layout zone="doctor" pageTitle="All Appointments" breadcrumb="Doctor / Appointments">
      <div className="card-panel">
        <div className="d-flex align-items-center justify-content-between p-3 pb-0">
          <h5 className="font-heading" style={{ fontSize: '1rem', fontWeight: '700' }}>Your Patient Roster</h5>
        </div>
        <div className="p-3" style={{ overflowX: 'auto' }}>
          {loading ? (
             <div className="text-center py-4">Loading your schedule...</div>
          ) : (
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-4">No appointments found.</td></tr>
                ) : appointments.map((apt, index) => (
                  <tr key={apt._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="doc-avatar" style={{ background: getGradient(index) }}>
                          {getInitials(apt.userId?.name)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600' }}>{apt.userId?.name}</div>
                          <div className="text-sub" style={{fontSize: '0.8rem'}}>{apt.userId?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{new Date(apt.date).toLocaleDateString()}</div>
                      <div className="text-muted" style={{fontSize: '0.85rem'}}>{apt.time}</div>
                    </td>
                    <td>
                      <span className="pill-tag pill-blue">{apt.type || 'In-Person'}</span>
                    </td>
                    <td>
                      <span className={`badge-status badge-${apt.status === 'completed' ? 'success' : apt.status === 'confirmed' ? 'confirmed' : apt.status === 'cancelled' ? 'cancelled' : 'pending'}`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        {apt.status === 'pending' && (
                          <button className="btn-sm-icon edit" title="Confirm" style={{background: '#d1fae5', color: '#059669'}} onClick={() => handleStatusUpdate(apt._id, 'confirmed')}>
                            <i className="bi bi-check-lg"></i>
                          </button>
                        )}
                        {apt.status === 'confirmed' && (
                          <button className="btn-sm-icon" title="Mark Completed" style={{background: '#cff4fc', color: '#0dcaf0'}} onClick={() => handleStatusUpdate(apt._id, 'completed')}>
                            <i className="bi bi-person-check-fill"></i>
                          </button>
                        )}
                        {(apt.status === 'pending' || apt.status === 'confirmed') && (
                          <button className="btn-sm-icon warn" title="Cancel" style={{background: '#fef08a', color: '#b45309'}} onClick={() => handleStatusUpdate(apt._id, 'cancelled')}>
                            <i className="bi bi-x-circle"></i>
                          </button>
                        )}
                        {apt.type === 'Video Consult' && apt.status === 'confirmed' && (
                          <Link to="/doctor/chat" className="btn-sm-icon" style={{background: '#e0e7ff', color: '#4f46e5'}} title="Join Call">
                            <i className="bi bi-camera-video-fill"></i>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorAppointments;