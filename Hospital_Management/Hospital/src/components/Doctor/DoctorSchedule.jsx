import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';

const DoctorSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMySchedule();
  }, []);

  const fetchMySchedule = async () => {
    try {
       setLoading(true);
       const res = await api.get('/appointments');
       if (res.data.success) {
         // Create a simple timeline mapping from today's appointments or future appointments
         const apts = res.data.data.filter(a => a.status !== 'cancelled').sort((a, b) => new Date(a.date) - new Date(b.date));
         setSchedule(apts);
       }
    } catch (err) {
       console.error("Failed to load schedule");
    } finally {
       setLoading(false);
    }
  }

  return (
    <Layout zone="doctor" pageTitle="Schedule" breadcrumb="Doctor / Schedule">
      <div className="card-panel">
        <div className="p-3">
          <h5 className="mb-4">Upcoming Schedule</h5>
          {loading ? (
             <div className="text-center py-4">Loading your timeline...</div>
          ) : schedule.length === 0 ? (
             <div className="text-center py-4 text-muted">No appointments scheduled. You are free!</div>
          ) : schedule.map((slot, i) => (
            <div key={i} className="slot-item" style={{display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', borderBottom: '1px solid var(--border-color)'}}>
              <div className="slot-time" style={{fontWeight: '700', color: 'var(--primary)', minWidth: '80px'}}>{slot.time || 'TBD'}</div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: '600'}}>{slot.userId?.name || 'Patient'} - <span style={{fontSize: '0.85rem', color: 'var(--text-light)'}}>{new Date(slot.date).toLocaleDateString()}</span></div>
                <div className="text-sub" style={{color: 'var(--text-light)', fontSize: '0.85rem'}}>{slot.diagnosis || slot.type || 'General Consultation'}</div>
              </div>
              <span className={`badge-status badge-${slot.status === 'completed' ? 'success' : slot.status === 'confirmed' ? 'confirmed' : 'pending'}`}>
                {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorSchedule;