import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';

const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const res = await api.get('/appointments/my-appointments');
      if (res.data.success) {
        // Filter appointments that have a prescription
        const rxs = res.data.data.filter(a => a.prescription && a.prescription.trim().length > 0);
        setPrescriptions(rxs);
      }
    } catch (e) {
      console.error("Failed to fetch prescriptions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout zone="patient" pageTitle="Prescriptions" breadcrumb="Patient / Prescriptions">
      <div className="row">
        <div className="col-12">
          <div className="card-panel p-3">
            <div className="section-header mb-3">
              <h5>My Prescriptions</h5>
            </div>
            {loading ? (
              <div className="text-center py-5">Loading prescriptions...</div>
            ) : prescriptions.length === 0 ? (
              <div className="text-center py-5 text-muted">No prescriptions available.</div>
            ) : prescriptions.map((p, i) => (
              <div key={p._id} className="rx-card mb-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <div className="rx-drug">{p.doctorId?.userId?.name}'s Prescription</div>
                    <div className="rx-dosage" style={{ color: 'var(--text-light)', fontSize: '0.78rem' }}>Issued on: {new Date(p.date).toLocaleDateString()}</div>
                    <div className="rx-dosage mt-2" style={{fontWeight: '500'}}>{p.prescription}</div>
                  </div>
                  <span className="badge-status badge-confirmed">Active</span>
                </div>
                <div className="rx-duration">
                    <i className="bi bi-file-earmark-medical"></i> Related Appointment: {p.time}
                </div>
                <div className="progress-mini mt-2">
                  <div className="progress-mini-fill" style={{ width: i % 2 === 0 ? '60%' : '30%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientPrescriptions;