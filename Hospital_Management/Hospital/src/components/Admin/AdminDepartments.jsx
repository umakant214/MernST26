import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/doctors');
      if (res.data.success) {
        // Aggregate departments from doctors
        const deptsMap = {};
        res.data.data.forEach(doc => {
          const specialty = doc.specialty || 'General';
          if (!deptsMap[specialty]) {
            deptsMap[specialty] = 0;
          }
          deptsMap[specialty]++;
        });

        const activeDepts = Object.keys(deptsMap).map(key => ({
          name: key,
          doctors: deptsMap[key],
          status: 'Active'
        }));

        setDepartments(activeDepts);
      }
    } catch (error) {
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout zone="admin" pageTitle="Departments" breadcrumb="Admin / Departments">
      <div className="card-panel p-3">
        <h5 className="mb-3">Departments</h5>
        <div style={{ overflowX: 'auto' }}>
          {loading ? (
             <div className="text-center py-4">Loading departments...</div>
          ) : (
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Doctors</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-3">No departments found</td></tr>
                ) : (
                  departments.map((d, i) => (
                    <tr key={i}>
                      <td><div style={{ fontWeight: '600' }}>{d.name}</div></td>
                      <td>{d.doctors} {d.doctors === 1 ? 'Doctor' : 'Doctors'}</td>
                      <td>
                        <span className="badge-status badge-confirmed">{d.status}</span>
                      </td>
                      <td>
                        <button className="btn-sm-icon edit">
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDepartments;