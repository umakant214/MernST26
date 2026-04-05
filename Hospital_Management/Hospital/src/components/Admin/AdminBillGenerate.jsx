import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import { toast } from 'react-toastify';
import api from '../../services/api';

const AdminBillGenerate = () => {
  const [formData, setFormData] = useState({
    appointmentId: '',
    patientName: '',
    doctor: '',
    amount: '',
    description: ''
  });
  const [doctorsList, setDoctorsList] = useState([]);
  const [recentBills, setRecentBills] = useState([
    { id: 'BIL-001', patient: 'Priya Rawat', amt: '₹5,000', date: '15 Mar 2026' },
    { id: 'BIL-002', patient: 'Rahul Mehta', amt: '₹3,500', date: '14 Mar 2026' },
    { id: 'BIL-003', patient: 'Sunita Kumari', amt: '₹4,200', date: '13 Mar 2026' }
  ]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors');
      if (res.data.success) {
        setDoctorsList(res.data.data);
      }
    } catch (e) {
      console.error("Could not fetch doctors");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateInvoiceFile = (billData) => {
    const content = `
========================================
       HOPES HOSPITAL - INVOICE       
========================================
Invoice ID   : ${billData.id}
Date         : ${billData.date}
----------------------------------------
Patient Name : ${billData.patient}
Doctor       : ${billData.docName}
Appointment  : ${billData.appointmentId}
Status       : PAID
----------------------------------------

Description                     Amount
----------------------------------------
${billData.description || 'Consultation & Services'}      ₹${billData.amount}

----------------------------------------
TOTAL PAYABLE:                  ₹${billData.amount}
========================================
Thank you for choosing Hopes Hospital.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${billData.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.amount) {
      return toast.error("Patient Name and Amount are required");
    }
    
    const newBillId = `BIL-${Math.floor(Math.random() * 9000) + 1000}`;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    const newBill = {
      id: newBillId,
      patient: formData.patientName,
      docName: formData.doctor || 'General Doctor',
      appointmentId: formData.appointmentId || 'Walk-in',
      amount: formData.amount,
      description: formData.description,
      date: today
    };

    // Update list visually
    setRecentBills(prev => [ { id: newBill.id, patient: newBill.patient, amt: `₹${newBill.amount}`, date: newBill.date }, ...prev]);
    
    // Download File
    generateInvoiceFile(newBill);
    toast.success('Bill generated and downloaded successfully!');
    
    // Clear form
    setFormData({
      appointmentId: '',
      patientName: '',
      doctor: '',
      amount: '',
      description: ''
    });
  };

  return (
    <Layout zone="admin" pageTitle="Generate Bill" breadcrumb="Admin / Generate Bill">
      <div className="row">
        <div className="col-lg-8">
          <div className="card-panel p-3">
            <h5 className="mb-3">Generate Bill</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label-custom">Appointment ID</label>
                  <input
                    type="text"
                    className="form-control-custom"
                    name="appointmentId"
                    placeholder="Enter Appointment ID"
                    value={formData.appointmentId}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label-custom">Patient Name</label>
                  <input
                    type="text"
                    className="form-control-custom"
                    name="patientName"
                    placeholder="Enter Patient Name"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label-custom">Doctor</label>
                  <select className="form-control-custom" name="doctor" value={formData.doctor} onChange={handleChange} required>
                    <option value="">— Select Doctor —</option>
                    {doctorsList.map((d, idx) => (
                       <option key={idx} value={d.userId?.name || 'Doctor'}>{d.userId?.name || 'Doctor'} ({d.specialty || 'General'})</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label-custom">Amount (₹)</label>
                  <input
                    type="number"
                    className="form-control-custom"
                    name="amount"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label-custom">Description</label>
                  <textarea
                    className="form-control-custom"
                    name="description"
                    rows="4"
                    placeholder="Enter bill description..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button type="submit" className="btn-primary-custom" style={{border: 'none', background: 'var(--primary)', color: 'white', padding: '6px 16px', borderRadius: '4px'}}>
                  <i className="bi bi-check-lg"></i> Generate & Download
                </button>
                <button type="button" className="btn-outline-custom" onClick={() => setFormData({appointmentId: '', patientName: '', doctor: '', amount: '', description: ''})}>Clear</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card-panel p-3">
            <h5 className="mb-3">Recent Bills</h5>
            <div className="recent-bills" style={{maxHeight: '400px', overflowY: 'auto'}}>
              {recentBills.map((bill, i) => (
                <div key={i} className="bill-item" style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '600' }}>{bill.id}</span>
                    <span style={{ color: 'var(--primary)' }}>{bill.amt}</span>
                  </div>
                  <div style={{ fontSize: '.85rem', color: 'var(--text-light)' }}>{bill.patient}</div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-light)' }}>{bill.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminBillGenerate;
