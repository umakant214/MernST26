import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/appointments/my-appointments');
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (e) {
      console.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => name?.split(' ').map(w => w[0]).join('').slice(0, 2) || 'DOC';

  return (
    <Layout zone="patient" pageTitle="My Appointments" breadcrumb="Patient / My Appointments">
      <div className="card-panel">
        <div className="d-flex align-items-center justify-content-between p-3 pb-0">
          <h5 className="font-heading" style={{ fontSize: '1rem', fontWeight: '700' }}>My Appointments</h5>
        </div>
        <div className="p-3" style={{ overflowX: 'auto' }}>
          {loading ? (
            <div className="text-center py-5">Loading appointments...</div>
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
                  <tr><td colSpan="5" className="text-center py-5 text-muted">No appointments found.</td></tr>
                ) : appointments.map(apt => (
                  <tr key={apt._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="doc-avatar" style={{ background: apt.status === 'confirmed' ? 'linear-gradient(135deg,#1a73e8,#00b4d8)' : 'var(--primary--light)' }}>
                           {getInitials(apt.doctorId?.userId?.name)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600' }}>{apt.doctorId?.userId?.name || 'Assigned Doctor'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`pill-tag pill-blue`}>{apt.doctorId?.specialty || 'General'}</span>
                    </td>
                    <td>
                      <div>{new Date(apt.date).toLocaleDateString()}</div>
                      <div className="text-sub">{apt.time}</div>
                    </td>
                    <td>{apt.type || 'In-Person'}</td>
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
    </Layout>
  );
};

export default PatientAppointments;