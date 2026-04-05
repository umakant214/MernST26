import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';
import CitizenSidebar from './CitizenSidebar';

const CitizenFile = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [formData, setFormData] = useState({
        category: 'Water Supply',
        title: '',
        description: '',
        location: '',
        ward: user.ward || 'Ward 7',
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('category', formData.category);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('location', formData.location);
        data.append('ward', formData.ward);
        if (file) {
            data.append('image', file);
        }

        try {
            await API.post('/complaints', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Complaint filed successfully!');
            navigate('/citizen-dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to file complaint');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info('Logged out successfully');
        navigate('/general-login');
    };

    return (
        <>
            
            <div className="sc-sidebar-overlay" id="sc-sidebar-overlay"></div>
            <div className="d-flex" style={{ 'marginTop': '0', 'height': '100vh', 'overflow': 'hidden' }}>
<CitizenSidebar user={user} handleLogout={handleLogout} />
<div className="d-flex flex-column flex-fill overflow-hidden sc-main-wrap">
<header className="page-header d-flex align-items-center px-3 gap-3">
<div><div className="hdr-title">File Complaint</div><div className="hdr-sub">Report a civic issue</div></div>
<div className="ms-auto d-flex align-items-center gap-2">
<div className="profile-chip"><div className="user-av green" style={{'width': '28px', 'height': '28px', 'fontSize': '10px', 'borderRadius': '7px'}}>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div><div><div className="profile-name">{user.firstName} {user.lastName}</div><div className="profile-role">Citizen</div></div></div>
</div>
</header>
<main className="page-body flex-fill overflow-auto p-3">
<div className="page-intro"><h2>File a Complaint</h2><p>Report a civic issue in your area</p></div>
<form onSubmit={handleSubmit}>
<div className="row g-3">
<div className="col-lg-8">
<div className="sc-card mb-3">
<div className="d-flex justify-content-between align-items-center mb-3"><span className="card-title">Step 1 — Select Category</span></div>
<div className="row g-2">
{['Water Supply', 'Roads', 'Sanitation', 'Electricity', 'Street Lights', 'Other'].map(cat => (
    <div className="col-4" key={cat}>
        <div className={`cat-card ${formData.category === cat ? 'picked' : ''}`} onClick={() => setFormData({...formData, category: cat})}>
            <div className="cat-card-name">{cat}</div>
        </div>
    </div>
))}
</div>
</div>
<div className="sc-card mb-3">
<div className="card-title mb-3">Step 2 — Details</div>
<div className="form-group"><label className="form-label-sc req">Title</label>
<input className="form-input-sc" name="title" required value={formData.title} onChange={handleChange} placeholder="Brief subject line"/></div>
<div className="form-group"><label className="form-label-sc req">Description</label>
<textarea className="form-input-sc" name="description" required value={formData.description} onChange={handleChange} placeholder="Detailed problem explanation"></textarea></div>
</div>
<div className="sc-card mb-3">
<div className="card-title mb-3">Step 3 — Location</div>
<div className="row g-2">
<div className="col-md-6"><div className="form-group"><label className="form-label-sc req">Ward</label>
<select className="form-input-sc" name="ward" value={formData.ward} onChange={handleChange}>
<option>Ward 7</option><option>Ward 1</option><option>Ward 12</option>
</select></div></div>
<div className="col-md-6"><div className="form-group"><label className="form-label-sc req">Location/ Landmark</label>
<input className="form-input-sc" name="location" required value={formData.location} onChange={handleChange} placeholder="Where is this happening?"/></div></div>
</div>
</div>
<div className="sc-card mb-3">
<div className="card-title mb-3">Step 4 — Photos (Optional)</div>
<div className="upload-zone mb-2" onClick={() => document.getElementById('file-up').click()} style={{cursor: 'pointer'}}>
<div className="upload-icon"><svg fill="none" height="18" stroke="var(--blue)" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg></div>
<div className="upload-title">{file ? file.name : 'Click to select photo'}</div>
</div>
<input type="file" id="file-up" hidden onChange={handleFileChange} accept="image/*" />
</div>
<div className="d-flex gap-2">
<button type="submit" className="btn-sc-primary">Submit Complaint</button>
</div>
</div>
<div className="col-lg-4">
<div className="sc-card">
<div className="card-title mb-3">Filing Tips</div>
<div className="d-flex flex-column gap-2" style={{'fontSize': '12px', 'color': 'var(--gray-600)'}}>
<div>📸 Add clear photos of the issue</div>
<div>📍 Precise location = faster resolution</div>
<div>📝 Detailed description helps dept team</div>
<div>⏰ Track status after submission</div>
</div>
</div>
</div>
</div>
</form>
</main>
</div>
</div>
        </>
    );
};

export default CitizenFile;
