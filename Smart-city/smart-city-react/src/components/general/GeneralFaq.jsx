import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const GeneralFaq = () => {
    const navigate = useNavigate();
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
            <div className="inner-hero">
                <div className="ih-tag">FAQ</div>
                <h1 className="ih-title">Frequently Asked Questions</h1>
                <p className="ih-sub">Find answers to the most common questions about Smart City Portal.</p>
            </div>
            <section className="sec-wrap">
                <div className="sec-inner" style={{ 'maxWidth': '760px' }}>
                    <div className="sec-eyebrow mb-3">Filing Complaints</div>
                    <div className="faq-item" ><div className="faq-q">How do I file a complaint? <span className="faq-chev">▼</span></div><div className="faq-a">Register a citizen account, then go to "File Complaint" in the Citizen Zone. Select category, enter location, upload photos, and submit. The complaint is auto-routed to the relevant department.</div></div>
                    <div className="faq-item" ><div className="faq-q">How long does resolution take? <span className="faq-chev">▼</span></div><div className="faq-a">Average resolution is 4.2 days. SLA targets: Electricity 1 day, Water 3 days, Roads 7 days, Sanitation 5 days. High priority complaints are escalated within 12 hours.</div></div>
                    <div className="faq-item" ><div className="faq-q">Can I upload photos with my complaint? <span className="faq-chev">▼</span></div><div className="faq-a">Yes. You can upload up to 5 photos per complaint. Clear, well-lit images from multiple angles significantly speed up field team verification and resolution.</div></div>
                    <div className="faq-item" ><div className="faq-q">What if I select the wrong category? <span className="faq-chev">▼</span></div><div className="faq-a">Wrong category selection causes routing delays. The admin can reassign complaints, but this adds 1–2 days. Always re-read category descriptions before submitting.</div></div>
                    <div className="sec-eyebrow mt-4 mb-3">Tracking &amp; Status</div>
                    <div className="faq-item" ><div className="faq-q">Can I track my complaint status? <span className="faq-chev">▼</span></div><div className="faq-a">Yes. Log in and visit "Track Complaints" to see a live 5-step timeline: Filed → Assigned → In Progress → Resolved → Closed. SMS notifications are also sent at each stage.</div></div>
                    <div className="faq-item" ><div className="faq-q">How do I communicate with the department? <span className="faq-chev">▼</span></div><div className="faq-a">Use the in-portal messaging feature in "Track Complaints". You can send and receive messages directly with the assigned department officer.</div></div>
                    <div className="faq-item" ><div className="faq-q">What if my complaint is rejected? <span className="faq-chev">▼</span></div><div className="faq-a">Rejection reasons are always provided with specific guidance. You may re-file with corrected information or escalate via the Contact page for review.</div></div>
                    <div className="sec-eyebrow mt-4 mb-3">Account &amp; Registration</div>
                    <div className="faq-item" ><div className="faq-q">Why is Aadhaar required for registration? <span className="faq-chev">▼</span></div><div className="faq-a">Aadhaar verification ensures genuine citizen identity and prevents fake or malicious complaint filings. Your Aadhaar number is stored encrypted and never shared.</div></div>
                    <div className="faq-item" ><div className="faq-q">Is registration free? <span className="faq-chev">▼</span></div><div className="faq-a">Yes, completely free. Smart City Portal is a public service initiative by the Municipal Corporation. There are no fees for registration, filing complaints, or using any features.</div></div>
                    <div className="faq-item" ><div className="faq-q">Can I change my ward/block after registration? <span className="faq-chev">▼</span></div><div className="faq-a">Yes. Go to Profile → Personal Information to update your ward, block, and address details. Changes take effect immediately for new complaints.</div></div>
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

export default GeneralFaq;
