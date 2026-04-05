import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const GeneralAbout = () => {
    const navigate = useNavigate();
    return (
        <>

            <nav className="gnav">
                <Link className="gnav-logo" to="/general-home">
                    <div className="gnav-logo-mark"><svg fill="none" height="18" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><path d="M3 9l9-7 9 7v11H3z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
                    <span className="gnav-brand">Smart<span>City</span></span>
                </Link>
                <div className="d-flex align-items-center gap-1 ms-3 gnav-desktop-links"><Link className="gnav-link" to="/general-home">Home</Link><Link className="gnav-link act" to="/general-about">About</Link><Link className="gnav-link" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link" to="/general-contact">Contact</Link></div>
                <div className="gnav-right gnav-desktop-links">
                    <span className="gnav-pill">8,421 citizens registered</span>
                    <Link className="gnav-btn-ghost" to="/general-login">Login</Link>
                    <Link className="gnav-btn-solid" to="/general-register">Register Free</Link>
                </div>
                <button aria-label="Open navigation" className="gnav-mob-toggle" id="gnav-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button><div className="gnav-mob-menu" id="gnav-mob-menu"><Link className="gnav-link" to="/general-home">Home</Link><Link className="gnav-link act" to="/general-about">About</Link><Link className="gnav-link" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link" to="/general-contact">Contact</Link><Link className="gnav-btn-ghost" to="/general-login">Login</Link><Link className="gnav-btn-solid" to="/general-register">Register Free</Link></div></nav>
            <div className="inner-hero">
                <div className="ih-tag">About Us</div>
                <h1 className="ih-title">Smart City Citizen Services</h1>
                <p className="ih-sub">A final year engineering project demonstrating production-grade complaint automation for modern urban governance.</p>
            </div>
            <section className="sec-wrap">
                <div className="sec-inner" style={{ 'maxWidth': '900px' }}>
                    <div className="row g-4 mb-4">
                        <div className="col-md-6">
                            <div className="p-4 bg-white border rounded-3 h-100" style={{ 'borderColor': 'var(--g100)!important' }}>
                                <div className="sec-eyebrow mb-3">Mission</div>
                                <h3 style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '18px', 'fontWeight': '800', 'color': 'var(--g900)', 'marginBottom': '10px' }}>Why we built this</h3>
                                <p style={{ 'fontSize': '13px', 'color': 'var(--g500)', 'lineHeight': '1.8', 'margin': '0' }}>Traditional complaint systems are slow and opaque. Smart City Portal automates routing, tracks resolution in real time, and brings accountability to every department.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-4 bg-white border rounded-3 h-100" style={{ 'borderColor': 'var(--g100)!important' }}>
                                <div className="sec-eyebrow mb-3">Technology</div>
                                <h3 style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '18px', 'fontWeight': '800', 'color': 'var(--g900)', 'marginBottom': '10px' }}>Built with modern tools</h3>
                                <p style={{ 'fontSize': '13px', 'color': 'var(--g500)', 'lineHeight': '1.8', 'margin': '0' }}>HTML5 · CSS3 (animations, glassmorphism) · Bootstrap 5 · Vanilla JavaScript · Responsive Design · Role-based Access Control · Real-time notification model.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 rounded-3 mb-4" style={{ 'background': 'linear-gradient(135deg,var(--navy),var(--teal))' }}>
                        <div style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '15px', 'fontWeight': '800', 'color': '#fff', 'marginBottom': '18px' }}>System Zones</div>
                        <div className="row g-3">
                            <div className="col-6 col-md-3">
                                <div className="p-3 rounded-3" style={{ 'background': 'rgba(255,255,255,.08)', 'border': '1px solid rgba(255,255,255,.1)' }}>
                                    <div style={{ 'fontSize': '11px', 'fontWeight': '700', 'color': '#FCA5A5', 'marginBottom': '6px' }}>Admin Zone</div>
                                    <div style={{ 'fontSize': '12px', 'color': 'rgba(255,255,255,.5)' }}>Full control, analytics, management</div>
                                </div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div className="p-3 rounded-3" style={{ 'background': 'rgba(255,255,255,.08)', 'border': '1px solid rgba(255,255,255,.1)' }}>
                                    <div style={{ 'fontSize': '11px', 'fontWeight': '700', 'color': '#FDE68A', 'marginBottom': '6px' }}>Dept Zone</div>
                                    <div style={{ 'fontSize': '12px', 'color': 'rgba(255,255,255,.5)' }}>Complaint handling and resolution</div>
                                </div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div className="p-3 rounded-3" style={{ 'background': 'rgba(255,255,255,.08)', 'border': '1px solid rgba(255,255,255,.1)' }}>
                                    <div style={{ 'fontSize': '11px', 'fontWeight': '700', 'color': '#86EFAC', 'marginBottom': '6px' }}>Citizen Zone</div>
                                    <div style={{ 'fontSize': '12px', 'color': 'rgba(255,255,255,.5)' }}>File, track and give feedback</div>
                                </div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div className="p-3 rounded-3" style={{ 'background': 'rgba(255,255,255,.08)', 'border': '1px solid rgba(255,255,255,.1)' }}>
                                    <div style={{ 'fontSize': '11px', 'fontWeight': '700', 'color': '#7DD3FC', 'marginBottom': '6px' }}>General Zone</div>
                                    <div style={{ 'fontSize': '12px', 'color': 'rgba(255,255,255,.5)' }}>This public information portal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="p-4 bg-white border rounded-3 text-center" style={{ 'borderColor': 'var(--g100)!important' }}>
                                <div style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '32px', 'fontWeight': '800', 'color': 'var(--navy)' }}>28</div>
                                <div style={{ 'fontSize': '13px', 'color': 'var(--g500)', 'fontWeight': '600' }}>Total Pages</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 bg-white border rounded-3 text-center" style={{ 'borderColor': 'var(--g100)!important' }}>
                                <div style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '32px', 'fontWeight': '800', 'color': 'var(--teal2)' }}>4</div>
                                <div style={{ 'fontSize': '13px', 'color': 'var(--g500)', 'fontWeight': '600' }}>User Zones</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 bg-white border rounded-3 text-center" style={{ 'borderColor': 'var(--g100)!important' }}>
                                <div style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '32px', 'fontWeight': '800', 'color': 'var(--green)' }}>14</div>
                                <div style={{ 'fontSize': '13px', 'color': 'var(--g500)', 'fontWeight': '600' }}>Departments</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
                            <div className="fsoc-btn"><svg fill="none" height="13" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" width="13"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg></div>
                            <div className="fsoc-btn"><svg fill="none" height="13" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" width="13"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect height="12" width="4" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></div>
                        </div>
                    </div>
                </div>
            </footer>



        </>
    );
};

export default GeneralAbout;
