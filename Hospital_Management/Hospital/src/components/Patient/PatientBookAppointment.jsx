import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const PatientBookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    reasonForVisit: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors');
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (e) {
      console.error("Failed to load doctors");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.doctorId) {
        setMessage({ type: 'error', text: 'Please select a doctor' });
        return;
    }
    if (!formData.reasonForVisit.trim()) {
        setMessage({ type: 'error', text: 'Please provide a reason for the visit' });
        return;
    }

    try {
        setLoading(true);
        const res = await api.post('/appointments', formData);
        if (res.data.success) {
            setMessage({ type: 'success', text: 'Appointment booked successfully!' });
            setTimeout(() => navigate('/patient/dashboard'), 1500);
        }
    } catch (error) {
        setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to book appointment' });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Layout zone="patient" pageTitle="Book Appointment" breadcrumb="Patient / Book Appointment">
      <div className="card-panel p-3">
        <h5 className="font-heading mb-3">Book an Appointment</h5>
        
        {message.text && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3`} style={{fontSize: '0.85rem'}}>
                {message.text}
            </div>
        )}

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label-custom">Select Doctor</label>
            <select 
                className="form-control-custom" 
                name="doctorId" 
                value={formData.doctorId} 
                onChange={handleInputChange}
            >
              <option value="">— Select Doctor —</option>
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>
                    {doc.userId?.name} - {doc.specialty}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label-custom">Preferred Date</label>
            <input 
                type="date" 
                className="form-control-custom" 
                name="date" 
                value={formData.date} 
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label-custom">Preferred Time</label>
            <select 
                className="form-control-custom" 
                name="timeSlot" 
                value={formData.timeSlot} 
                onChange={handleInputChange}
            >
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label-custom">Appointment Type</label>
            <select className="form-control-custom">
              <option>In-Person</option>
              <option>Video Call</option>
              <option>Phone</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label-custom">Reason for Visit</label>
            <textarea
              className="form-control-custom"
              rows="3"
              name="reasonForVisit"
              value={formData.reasonForVisit}
              onChange={handleInputChange}
              placeholder="Describe your symptoms or reason for appointment..."
            ></textarea>
          </div>
        </div>
        <div className="d-flex gap-2 mt-3">
          <button 
            className="btn-primary-custom" 
            onClick={handleSubmit}
            disabled={loading}
          >
            <i className="bi bi-check-lg"></i> {loading ? 'Booking...' : 'Book Appointment'}
          </button>
          <button className="btn-outline-custom" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>
    </Layout>
  );
};

export default PatientBookAppointment;