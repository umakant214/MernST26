import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';

const DeptLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/dept/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success('Department Login Successful!');
            navigate('/dept-dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <div className="auth-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="auth-card sc-card p-4 shadow-sm" style={{ maxWidth: '440px', width: '100%', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <div className="topbar-logo-mark d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '40px', height: '40px', background: 'var(--amber)', borderRadius: '10px' }}>
                        <svg fill="none" height="20" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="20">
                            <path d="M3 9l9-7 9 7v11H3z" />
                        </svg>
                    </div>
                    <h4 className="fw-bold m-0" style={{ fontFamily: 'var(--font-display)' }}>Department Portal</h4>
                    <p className="text-muted small">Official Department Access Control</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label className="form-label-sc">Departmental ID / Email</label>
                        <input 
                            type="email" 
                            className="form-input-sc" 
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="officer@smartcity.gov.in"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="form-label-sc">Security Password</label>
                        <input 
                            type="password" 
                            className="form-input-sc" 
                            name="password" 
                            required 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn-sc-primary w-100 py-2" style={{ background: 'var(--amber)', borderColor: '#b45309' }}>Sign In to Portal</button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/general-home" className="text-decoration-none small text-muted">← Return to Public Portal</Link>
                </div>
                <div className="mt-4 pt-3 border-top">
                    <p className="text-center text-muted m-0" style={{ fontSize: '10px' }}>AUTHORIZED PERSONNEL ONLY. SYSTEM ACTIVITIES ARE MONITORED.</p>
                </div>
            </div>
        </div>
    );
};

export default DeptLogin;
