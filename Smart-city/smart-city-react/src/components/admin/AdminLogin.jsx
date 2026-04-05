import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/admin/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success('Admin Login Successful!');
            navigate('/admin-dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <div className="auth-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="auth-card sc-card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <div className="topbar-logo-mark d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '40px', height: '40px', background: 'var(--red)', borderRadius: '10px' }}>
                        <svg fill="none" height="20" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="20">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <h4 className="fw-bold m-0" style={{ fontFamily: 'var(--font-display)' }}>Admin Portal</h4>
                    <p className="text-muted small">System Administrator Authorization</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label className="form-label-sc">Admin Email / Username</label>
                        <input 
                            type="email" 
                            className="form-input-sc" 
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="admin@smartcity.com"
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
                    <button type="submit" className="btn-sc-primary w-100 py-2" style={{ background: 'var(--red)', borderColor: 'var(--red)' }}>Authorize & Sign In</button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/general-home" className="text-decoration-none small text-muted">← Back to Portal Home</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
