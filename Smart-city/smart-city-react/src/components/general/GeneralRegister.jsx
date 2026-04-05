import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';

const GeneralRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        aadhaarNumber: '',
        address: '',
        ward: '',
        block: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/citizen/register', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success('Registration Successful!');
            navigate('/citizen-dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration Failed');
        }
    };

    return (
        <>

            <nav className="gnav">
                <Link className="gnav-logo" to="/general-home">
                    <div className="gnav-logo-mark"><svg fill="none" height="18" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><path d="M3 9l9-7 9 7v11H3z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
                    <span className="gnav-brand">Smart<span>City</span></span>
                </Link>
                <div className="d-flex align-items-center gap-1 ms-3 gnav-desktop-links"><Link className="gnav-link" to="/general-home">Home</Link><Link className="gnav-link" to="/general-about">About</Link><Link className="gnav-link" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link" to="/general-contact">Contact</Link></div>
                <div className="gnav-right gnav-desktop-links">
                    <span className="gnav-pill">8,421 citizens registered</span>
                    <Link className="gnav-btn-ghost" to="/general-login">Login</Link>
                    <Link className="gnav-btn-solid" to="/general-register">Register Free</Link>
                </div>
                <button aria-label="Open navigation" className="gnav-mob-toggle" id="gnav-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button><div className="gnav-mob-menu" id="gnav-mob-menu"><Link className="gnav-link" to="/general-home">Home</Link><Link className="gnav-link" to="/general-about">About</Link><Link className="gnav-link" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link" to="/general-contact">Contact</Link><Link className="gnav-btn-ghost" to="/general-login">Login</Link><Link className="gnav-btn-solid" to="/general-register">Register Free</Link></div></nav>
            <div className="auth-wrap" style={{ 'padding': '32px 16px' }}>
                <form className="auth-card" style={{ 'maxWidth': '500px' }} onSubmit={handleRegister}>
                    <div style={{ 'position': 'absolute', 'top': '0', 'left': '0', 'right': '0', 'height': '4px', 'background': 'linear-gradient(90deg,var(--blue),var(--teal2),#3D2DB8)', 'borderRadius': 'var(--rxl) var(--rxl) 0 0' }}></div>
                    <div className="auth-glow"></div>
                    <div className="auth-logo">
                        <div className="auth-logo-mark"><svg fill="none" height="19" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="19"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div>
                        <div>
                            <div style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '14px', 'fontWeight': '800', 'color': 'var(--g900)' }}>Smart City Portal</div>
                            <div style={{ 'fontSize': '11px', 'color': 'var(--g400)' }}>Citizen Registration</div>
                        </div>
                    </div>
                    <div className="auth-h">Create Your Account</div>
                    <div className="auth-sub">Free forever — start filing complaints today</div>
                    <div className="row g-3">
                        <div className="col-6">
                            <label className="form-label-sc">First Name <span style={{ 'color': 'var(--red)' }}>*</span></label>
                            <input className="form-control-sc" name="firstName" placeholder="Rahul" required onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <label className="form-label-sc">Last Name <span style={{ 'color': 'var(--red)' }}>*</span></label>
                            <input className="form-control-sc" name="lastName" placeholder="Kumar" required onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label-sc">Mobile Number <span style={{ 'color': 'var(--red)' }}>*</span></label>
                            <input className="form-control-sc" name="mobileNumber" placeholder="+91 98765 43210" required onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label-sc">Email Address <span style={{ 'color': 'var(--red)' }}>*</span></label>
                            <input className="form-control-sc" name="email" placeholder="you@email.com" type="email" required onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label-sc">Aadhaar Number <span style={{ 'color': 'var(--red)' }}>*</span></label>
                            <input className="form-control-sc" name="aadhaarNumber" placeholder="XXXX-XXXX-XXXX" required onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label-sc">Address <span style={{ 'color': 'var(--red)' }}>*</span></label>
                            <textarea className="form-control" name="address" placeholder="enter your address" required onChange={handleChange}></textarea>
                        </div>
                        <div className="col-6">
                            <label className="form-label-sc">Ward <span style={{ 'color': 'var(--red)' }}>*</span></label>
                            <select className="form-control-sc" name="ward" style={{ 'cursor': 'pointer' }} required onChange={handleChange}>
                                <option value="">Select Ward</option>
                                <option value="Ward 1">Ward 1</option>
                                <option value="Ward 7">Ward 7</option>
                                <option value="Ward 12">Ward 12</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label className="form-label-sc">Block <span style={{ 'color': 'var(--red)' }}>*</span></label>
                            <input className="form-control-sc" name="block" placeholder="Block B" required onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label-sc">Password <span style={{ 'color': 'var(--red)' }}>*</span></label>
                            <input className="form-control-sc" name="password" placeholder="Min 8 characters" type="password" required onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <div className="d-flex gap-2 align-items-start">
                                <input style={{ 'marginTop': '3px', 'accentColor': 'var(--blue)', 'flexShrink': '0' }} type="checkbox" required />
                                <label style={{ 'fontSize': '12px', 'color': 'var(--g500)', 'lineHeight': '1.5' }}>I agree to the <Link to="/" style={{ 'color': 'var(--blue)', 'fontWeight': '700' }}>Terms of Service</Link> and consent to data processing under the <Link to="/" style={{ 'color': 'var(--blue)', 'fontWeight': '700' }}>Privacy Policy</Link>.</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="w-100 py-2 fw-bold text-white border-0" style={{ 'background': 'linear-gradient(135deg,var(--blue),var(--teal2))', 'borderRadius': '9px', 'fontSize': '14px', 'cursor': 'pointer' }}>Create Citizen Account →</button>
                        </div>
                    </div>
                    <div className="auth-foot">Already registered? <Link to="/general-login">Sign in →</Link></div>
                </form>
            </div>
            <footer className="sc-footer">
                <div className="container-xl">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="footer-brand-name">
                                <div className="footer-brand-mark"><svg fill="none" height="14" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><path d="M3 9l9-7 9 7v11H3z" /></svg></div>
                                Smart City Services
                            </div>
                            <p className="footer-brand-desc">A digital governance initiative by the Municipal Corporation to streamline citizen complaint automation and resolution.</p>
                        </div>
                        <div className="col-md-2 col-6">
                            <div className="footer-col-title">Pages</div>
                            <Link className="footer-lnk" to="/general-home">Home</Link>
                            <Link className="footer-lnk" to="/general-about">About</Link>
                            <Link className="footer-lnk" to="/general-guidelines">Guidelines</Link>
                            <Link className="footer-lnk" to="/general-notices">Notices</Link>
                            <Link className="footer-lnk" to="/general-contact">Contact</Link>
                        </div>
                        <div className="col-md-2 col-6">
                            <div className="footer-col-title">Account</div>
                            <Link className="footer-lnk" to="/general-register">Register</Link>
                            <Link className="footer-lnk" to="/general-login">Login</Link>
                            <Link className="footer-lnk" to="/">Privacy Policy</Link>
                            <Link className="footer-lnk" to="/">Terms of Service</Link>
                        </div>
                        <div className="col-md-4">
                            <div className="footer-col-title">Contact</div>
                            <span className="footer-lnk">support@smartcity.gov.in</span>
                            <span className="footer-lnk">1800-XXX-XXXX (Toll Free)</span>
                            <span className="footer-lnk">Mon–Sat, 9am–6pm</span>
                            <Link className="footer-lnk" to="/general-contact">Send Message →</Link>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <span className="footer-copy">© 2026 Smart City Municipal Corporation. All rights reserved.</span>
                        <div className="d-flex gap-2">
                            <div className="fsoc-btn"><svg fill="none" height="13" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" width="13"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg></div>
                            <div className="fsoc-btn"><svg fill="none" height="13" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" width="13"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37(0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg></div>
                            <div className="fsoc-btn"><svg fill="none" height="13" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" width="13"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect height="12" width="4" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default GeneralRegister;
