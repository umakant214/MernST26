import React from 'react';
import Layout from '../Shared/Layout';

const AdminBilling = () => {
  const bills = [
    { id: 'BIL-001', patient: 'Priya Rawat', amount: '₹5,000', date: '15 Mar 2026', status: 'paid' },
    { id: 'BIL-002', patient: 'Rahul Mehta', amount: '₹3,500', date: '14 Mar 2026', status: 'pending' },
    { id: 'BIL-003', patient: 'Deepa Patel', amount: '₹12,400', date: '12 Mar 2026', status: 'paid' }
  ];

  const handleDownload = (bill) => {
    // Generate text content for receipt
    const content = `
========================================
       HOPES HOSPITAL - INVOICE       
========================================
Invoice ID   : ${bill.id}
Date         : ${bill.date}
----------------------------------------
Patient Name : ${bill.patient}
Status       : ${bill.status.toUpperCase()}
----------------------------------------

Description                 Amount
----------------------------------------
Consultation & Services     ${bill.amount}

----------------------------------------
TOTAL PAYABLE:              ${bill.amount}
========================================
Thank you for choosing Hopes Hospital.
`;

    // Create a Blob from the content
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Create hidden anchor and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${bill.id}.txt`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout zone="admin" pageTitle="Billing" breadcrumb="Admin / Billing">
      <div className="card-panel p-3">
        <h5 className="mb-3">Billing Records</h5>
        <div style={{ overflowX: 'auto' }}>
          <table className="table-custom">
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Patient</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--primary)', fontWeight: '700' }}>{b.id}</td>
                  <td>{b.patient}</td>
                  <td>{b.amount}</td>
                  <td>{b.date}</td>
                  <td>
                    <span className={`badge-status ${b.status === 'paid' ? 'badge-confirmed' : 'badge-pending'}`}>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button className="btn-sm-icon view-btn" title="Download Invoice" onClick={() => handleDownload(b)}>
                      <i className="bi bi-download"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminBilling;