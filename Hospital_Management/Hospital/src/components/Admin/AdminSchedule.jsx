import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const res = await api.get('/doctors');
      if (res.data.success) {
        setSchedules(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout zone="admin" pageTitle="Schedule" breadcrumb="Admin / Schedule">
      <div className="card-panel p-3">
        <h5 className="mb-3">Doctor Schedules</h5>
        <div style={{ overflowX: 'auto' }}>
          {loading ? (
            <div className="text-center py-4">Loading schedules...</div>
          ) : (
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                </tr>
              </thead>
              <tbody>
                {schedules.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-3">No schedules found</td></tr>
                ) : (
                  schedules.map((doc) => {
                    const avail = doc.availability || {};
                    return (
                      <tr key={doc._id}>
                        <td>
                          <div style={{ fontWeight: '600' }}>{doc.userId?.name || 'Unknown'}</div>
                        </td>
                        <td>
                          <span className="pill-tag pill-blue">{doc.specialty || 'General'}</span>
                        </td>
                        <td className="text-muted" style={{fontSize: '0.85rem'}}>{avail.monday || 'Off'}</td>
                        <td className="text-muted" style={{fontSize: '0.85rem'}}>{avail.tuesday || 'Off'}</td>
                        <td className="text-muted" style={{fontSize: '0.85rem'}}>{avail.wednesday || 'Off'}</td>
                        <td className="text-muted" style={{fontSize: '0.85rem'}}>{avail.thursday || 'Off'}</td>
                        <td className="text-muted" style={{fontSize: '0.85rem'}}>{avail.friday || 'Off'}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminSchedule;