import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CitizenSidebar from './CitizenSidebar';
import API from '../../api';

const CitizenProfile = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info('Logged out successfully');
        navigate('/general-login');
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!passwords.currentPassword || !passwords.newPassword) {
            return toast.error('Both fields are required');
        }
        if (passwords.newPassword.length < 6) {
            return toast.error('New password must be at least 6 characters');
        }

        try {
            const res = await API.post('/citizen/update-password', {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            toast.success(res.data.message);
            setPasswords({ currentPassword: '', newPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Password update failed');
        }
    };

    return (
        <>
            <div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
            <div className="d-flex" style={{ 'marginTop': '0', 'height': '100vh', 'overflow': 'hidden' }}>
                <CitizenSidebar user={user} handleLogout={handleLogout} />
                <div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
                    <header className="page-header d-flex align-items-center px-3 gap-3">
                        <div>
                            <div className="hdr-title">My Profile</div>
                            <div className="hdr-sub">Welcome back, {user.firstName}</div>
                        </div>
                    </header>
                    <main className="page-body flex-fill overflow-auto p-3">
                        <div className="page-intro"><h2>My Profile</h2><p>Manage your account and preferences</p></div>
                        <div className="row g-3">
                            <div className="col-md-7">
                                <div className="sc-card">
                                    <div className="d-flex justify-content-between align-items-center mb-3"><span className="card-title">Personal Information</span></div>
                                    <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                                        <div className="user-av green" style={{ 'width': '52px', 'height': '52px', 'fontSize': '17px', 'borderRadius': '13px' }}>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div>
                                        <div>
                                            <div style={{ 'fontFamily': 'var(--font-display)', 'fontSize': '16px', 'fontWeight': '700', 'color': 'var(--gray-900)' }}>{user.firstName} {user.lastName}</div>
                                            <div style={{ 'fontSize': '12px', 'color': 'var(--gray-400)' }}>✓ Verified Citizen</div>
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col-md-6"><div className="form-group"><label className="form-label-sc">Full Name</label><input className="form-input-sc" readOnly value={`${user.firstName} ${user.lastName}`} /></div></div>
                                        <div className="col-md-6"><div className="form-group"><label className="form-label-sc">Mobile</label><input className="form-input-sc" readOnly value={user.mobileNumber} /></div></div>
                                        <div className="col-md-6"><div className="form-group"><label className="form-label-sc">Email</label><input className="form-input-sc" readOnly value={user.email} /></div></div>
                                        <div className="col-md-6"><div className="form-group"><label className="form-label-sc">Ward</label><input className="form-input-sc" readOnly value={user.ward} /></div></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="sc-card mb-3">
                                    <div className="card-title mb-3">Account Security</div>
                                    <form onSubmit={handleUpdatePassword}>
                                        <div className="form-group">
                                            <label className="form-label-sc">Current Password</label>
                                            <input 
                                                className="form-input-sc" 
                                                name="currentPassword" 
                                                value={passwords.currentPassword} 
                                                onChange={handlePasswordChange} 
                                                placeholder="Current password" 
                                                type="password" 
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label-sc">New Password</label>
                                            <input 
                                                className="form-input-sc" 
                                                name="newPassword" 
                                                value={passwords.newPassword} 
                                                onChange={handlePasswordChange} 
                                                placeholder="Min 6 characters" 
                                                type="password" 
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn-sc-primary btn-sm">Update Password</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default CitizenProfile;
