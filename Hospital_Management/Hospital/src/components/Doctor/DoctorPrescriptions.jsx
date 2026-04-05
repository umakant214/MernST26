import React from 'react';
import Layout from '../Shared/Layout';

const DoctorPrescriptions = () => {
  const rx = [
    {
      name: 'Priya Rawat',
      id: '#RX-2024-0142',
      status: 'active',
      medicines: [
        { name: 'Metoprolol 25mg', dosage: '1 tablet twice daily' },
        { name: 'Aspirin 75mg', dosage: '1 tablet once daily' }
      ]
    }
  ];

  return (
    <Layout zone="doctor" pageTitle="Prescriptions" breadcrumb="Doctor / Prescriptions">
      <div className="card-panel p-3">
        <div className="section-header mb-3">
          <h5>Prescriptions</h5>
        </div>
        {rx.map((r, i) => (
          <div key={i} className="rx-card">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <div className="rx-drug">
                  {r.name} — <span style={{ color: 'var(--primary)' }}>{r.id}</span>
                </div>
              </div>
              <span className={`badge-status badge-${r.status}`}>
                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
              </span>
            </div>
            <div className="row g-2 mt-1">
              {r.medicines.map((m, j) => (
                <div key={j} className="col-md-6">
                  <div style={{ background: 'var(--body-bg)', borderRadius: '8px', padding: '10px' }}>
                    <div className="rx-drug">{m.name}</div>
                    <div className="rx-dosage">{m.dosage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default DoctorPrescriptions;