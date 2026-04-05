import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';

const GeneralLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/citizen/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success('Welcome back!');
            navigate('/citizen-dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed');
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
            <div className="auth-wrap" style={{ 'paddingTop': '20px' }}>
                <div className="auth-card">
                    <div className="auth-glow"></div>
                    <div style={{ 'position': 'absolute', 'top': '0', 'left': '0', 'right': '0', 'height': '4px', 'background': 'linear-gradient(90deg,var(--blue),var(--teal2),#3D2DB8)', 'borderRadius': 'var(--rxl) var(--rxl) 0 0' }}></div>
                    <div className="auth-logo">
                        <div className="auth-logo-mark"><svg fill="none" height="19" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="19"><path d="M3 9l9-7 9 7v11H3z" /></svg></div>
                        <div>
                            <div style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '14px', 'fontWeight': '800', 'color': 'var(--g900)' }}>Smart City Portal</div>
                            <div style={{ 'fontSize': '11px', 'color': 'var(--g400)' }}>Citizen Login</div>
                        </div>
                    </div>
                    <div className="auth-h">Welcome Back</div>
                    <div className="auth-sub">Sign in to your citizen account</div>
                    <div className="mb-3">
                        <button className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 px-3 bg-white fw-semibold" onMouseOut={(e) => e.target.style.borderColor = 'var(--g200)'} onMouseOver={(e) => e.target.style.borderColor = '#3D2DB8'} style={{ 'border': '1.5px solid var(--g200)', 'borderRadius': '9px', 'fontSize': '13px', 'color': 'var(--g700)', 'cursor': 'pointer', 'transition': 'border-color .18s' }}>
                            <svg height="16" viewBox="0 0 24 24" width="16"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Continue with Google
                        </button>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="flex-grow-1" style={{ 'height': '1px', 'background': 'var(--g100)' }}></div>
                        <span style={{ 'fontSize': '12px', 'color': 'var(--g300)' }}>or sign in with email</span>
                        <div className="flex-grow-1" style={{ 'height': '1px', 'background': 'var(--g100)' }}></div>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label-sc">Mobile / Email</label>
                            <input className="form-control-sc" placeholder="+91 98765 43210" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <label className="form-label-sc mb-0">Password</label>
                                <Link to="/" style={{ 'color': 'var(--blue)', 'fontWeight': '700', 'fontSize': '11px' }}>Forgot?</Link>
                            </div>
                            <input className="form-control-sc" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="w-100 py-2 fw-bold text-white border-0" style={{ 'background': 'linear-gradient(135deg,var(--blue),var(--teal2))', 'borderRadius': '9px', 'fontSize': '14px', 'cursor': 'pointer' }}>Sign In to Portal</button>
                    </form>
                    <div className="auth-foot">No account? <Link to="/general-register">Register for free →</Link></div>
                </div>
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

export default GeneralLogin;
