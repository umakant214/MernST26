import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const GeneralGuidelines = () => {
    const navigate = useNavigate();
    return (
        <>

            <nav className="gnav">
                <Link className="gnav-logo" to="/general-home">
                    <div className="gnav-logo-mark"><svg fill="none" height="18" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><path d="M3 9l9-7 9 7v11H3z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
                    <span className="gnav-brand">Smart<span>City</span></span>
                </Link>
                <div className="d-flex align-items-center gap-1 ms-3 gnav-desktop-links"><Link className="gnav-link" to="/general-home">Home</Link><Link className="gnav-link" to="/general-about">About</Link><Link className="gnav-link act" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link" to="/general-contact">Contact</Link></div>
                <div className="gnav-right gnav-desktop-links">
                    <span className="gnav-pill">8,421 citizens registered</span>
                    <Link className="gnav-btn-ghost" to="/general-login">Login</Link>
                    <Link className="gnav-btn-solid" to="/general-register">Register Free</Link>
                </div>
                <button aria-label="Open navigation" className="gnav-mob-toggle" id="gnav-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button><div className="gnav-mob-menu" id="gnav-mob-menu"><Link className="gnav-link" to="/general-home">Home</Link><Link className="gnav-link" to="/general-about">About</Link><Link className="gnav-link act" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link" to="/general-contact">Contact</Link><Link className="gnav-btn-ghost" to="/general-login">Login</Link><Link className="gnav-btn-solid" to="/general-register">Register Free</Link></div></nav>
            <div className="inner-hero">
                <div className="ih-tag">Guidelines</div>
                <h1 className="ih-title">How to File a Complaint</h1>
                <p className="ih-sub">Follow these steps for the fastest resolution of your civic issue.</p>
            </div>
            <section className="sec-wrap">
                <div className="sec-inner" style={{ 'maxWidth': '800px' }}>
                    <div className="guide-item"><div className="guide-num">1</div><div><div className="guide-title">Register a citizen account</div><div className="guide-desc">Sign up with your name, mobile, Aadhaar, and ward details. Aadhaar verification required for genuine complaints.</div></div></div>
                    <div className="guide-item"><div className="guide-num">2</div><div><div className="guide-title">Select the correct complaint category</div><div className="guide-desc">Choose from Water, Electricity, Roads, Sanitation, Street Lights, or Other. Wrong categories delay routing and resolution.</div></div></div>
                    <div className="guide-item"><div className="guide-num">3</div><div><div className="guide-title">Provide accurate location details</div><div className="guide-desc">Use GPS pin or enter ward, block, and street address. Include a nearby landmark for faster field team response.</div></div></div>
                    <div className="guide-item"><div className="guide-num">4</div><div><div className="guide-title">Upload supporting photos (up to 5)</div><div className="guide-desc">Clear photos significantly speed up verification and resolution. Show the issue clearly from multiple angles.</div></div></div>
                    <div className="guide-item"><div className="guide-num">5</div><div><div className="guide-title">Write a clear, detailed description</div><div className="guide-desc">State when the issue started, how many people are affected, and any previous attempts to report it.</div></div></div>
                    <div className="guide-item"><div className="guide-num">6</div><div><div className="guide-title">Track and provide feedback</div><div className="guide-desc">Monitor real-time progress and rate the resolution quality once completed. Your feedback improves city services.</div></div></div>
                    <div className="p-4 rounded-3 mt-4" style={{ 'background': 'linear-gradient(135deg,#FEF2F2,#FFF1F2)', 'border': '1px solid #FECACA' }}>
                        <div style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '14px', 'fontWeight': '800', 'color': 'var(--red)', 'marginBottom': '14px' }}>⚠ Do NOT</div>
                        <div className="row g-2">
                            <div className="col-md-6"><div className="d-flex gap-2 align-items-start bg-white rounded-3 p-3 text-sm" style={{ 'fontSize': '13px', 'color': 'var(--g600)' }}><span style={{ 'color': 'var(--red)', 'fontWeight': '700', 'flexShrink': '0' }}>✗</span> File duplicate complaints for the same issue</div></div>
                            <div className="col-md-6"><div className="d-flex gap-2 align-items-start bg-white rounded-3 p-3" style={{ 'fontSize': '13px', 'color': 'var(--g600)' }}><span style={{ 'color': 'var(--red)', 'fontWeight': '700', 'flexShrink': '0' }}>✗</span> Submit false or fabricated reports</div></div>
                            <div className="col-md-6"><div className="d-flex gap-2 align-items-start bg-white rounded-3 p-3" style={{ 'fontSize': '13px', 'color': 'var(--g600)' }}><span style={{ 'color': 'var(--red)', 'fontWeight': '700', 'flexShrink': '0' }}>✗</span> Use offensive language in descriptions</div></div>
                            <div className="col-md-6"><div className="d-flex gap-2 align-items-start bg-white rounded-3 p-3" style={{ 'fontSize': '13px', 'color': 'var(--g600)' }}><span style={{ 'color': 'var(--red)', 'fontWeight': '700', 'flexShrink': '0' }}>✗</span> Report non-civic personal disputes</div></div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="sec-eyebrow mb-3">Quick FAQ</div>
                        <div className="faq-item" ><div className="faq-q">How long does resolution take? <span className="faq-chev">▼</span></div><div className="faq-a">Average resolution is 4.2 days. SLA: Electricity 1 day, Water 3 days, Roads 7 days. High priority complaints are escalated in 12 hours.</div></div>
                        <div className="faq-item" ><div className="faq-q">Can I track my complaint status? <span className="faq-chev">▼</span></div><div className="faq-a">Yes. Log in and visit "Track Complaints" to see a live 5-step timeline from filing to resolution.</div></div>
                        <div className="faq-item" ><div className="faq-q">What if my complaint is rejected? <span className="faq-chev">▼</span></div><div className="faq-a">Rejection reasons are always provided. You may re-file with corrected details or appeal via the Contact page.</div></div>
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

export default GeneralGuidelines;
