import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { toast } from 'react-toastify';

const GeneralContact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Enquiry',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            return toast.warning('Please fill all required fields');
        }

        try {
            setLoading(true);
            const res = await API.post('/contact', formData);
            if (res.status === 201) {
                toast.success('Your message has been sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    subject: 'General Enquiry',
                    message: ''
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();
    return (
        <>

            <nav className="gnav">
                <Link className="gnav-logo" to="/general-home">
                    <div className="gnav-logo-mark"><svg fill="none" height="18" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><path d="M3 9l9-7 9 7v11H3z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
                    <span className="gnav-brand">Smart<span>City</span></span>
                </Link>
                <div className="d-flex align-items-center gap-1 ms-3 gnav-desktop-links"><Link className="gnav-link" to="/general-home">Home</Link><Link className="gnav-link" to="/general-about">About</Link><Link className="gnav-link" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link act" to="/general-contact">Contact</Link></div>
                <div className="gnav-right gnav-desktop-links">
                    <span className="gnav-pill">8,421 citizens registered</span>
                    <Link className="gnav-btn-ghost" to="/general-login">Login</Link>
                    <Link className="gnav-btn-solid" to="/general-register">Register Free</Link>
                </div>
                <button aria-label="Open navigation" className="gnav-mob-toggle" id="gnav-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button><div className="gnav-mob-menu" id="gnav-mob-menu"><Link className="gnav-link" to="/general-home">Home</Link><Link className="gnav-link" to="/general-about">About</Link><Link className="gnav-link" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link act" to="/general-contact">Contact</Link><Link className="gnav-btn-ghost" to="/general-login">Login</Link><Link className="gnav-btn-solid" to="/general-register">Register Free</Link></div></nav>
            <div className="inner-hero">
                <div className="ih-tag">Contact</div>
                <h1 className="ih-title">Contact &amp; Support</h1>
                <p className="ih-sub">We're here to help. Reach out through any channel below.</p>
            </div>
            <section className="sec-wrap">
                <div className="sec-inner" style={{ 'maxWidth': '1000px' }}>
                    <div className="row g-4">
                        <div className="col-md-5">
                            <div className="contact-card">
                                <div className="cc-icon" style={{ 'background': 'rgba(14,107,138,.1)' }}>
                                    <svg fill="none" height="18" stroke="var(--teal2)" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </div>
                                <div><div className="cc-label">Email Support</div><div className="cc-value">support@smartcity.gov.in</div><div className="cc-sub">Reply within 24 hours</div></div>
                            </div>
                            <div className="contact-card">
                                <div className="cc-icon" style={{ 'background': 'rgba(14,164,114,.1)' }}>
                                    <svg fill="none" height="18" stroke="var(--green)" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 9.81a19.79 19.79 0 01-2-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                                </div>
                                <div><div className="cc-label">Toll Free Helpdesk</div><div className="cc-value">1800-XXX-XXXX</div><div className="cc-sub">Mon–Sat, 9am–6pm</div></div>
                            </div>
                            <div className="contact-card">
                                <div className="cc-icon" style={{ 'background': 'rgba(249,115,22,.1)' }}>
                                    <svg fill="none" height="18" stroke="var(--amber)" strokeWidth="2" viewBox="0 0 24 24" width="18"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                </div>
                                <div><div className="cc-label">Emergency Issues</div><div className="cc-value">Water &amp; Electricity</div><div className="cc-sub">24/7 priority line</div></div>
                            </div>
                            <div className="contact-card">
                                <div className="cc-icon" style={{ 'background': 'rgba(45,27,139,.1)' }}>
                                    <svg fill="none" height="18" stroke="var(--blue)" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div><div className="cc-label">Office Address</div><div className="cc-value">Municipal Corporation</div><div className="cc-sub">Smart City HQ, Sector 12, Block A</div></div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="bg-white border rounded-4 p-4" style={{ 'borderColor': 'var(--g200)!important', 'boxShadow': 'var(--sh-sm)' }}>
                                <div style={{ 'fontFamily': '\'Sora\',sans-serif', 'fontSize': '16px', 'fontWeight': '800', 'color': 'var(--g900)', 'marginBottom': '20px' }}>Send a Message</div>
                                <form onSubmit={handleSubmit} className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label-sc">Name</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-control-sc"
                                            placeholder="Full name"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-sc">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control-sc"
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label-sc">Subject</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="form-control-sc"
                                            style={{ 'cursor': 'pointer' }}
                                        >
                                            <option>General Enquiry</option>
                                            <option>Technical Support</option>
                                            <option>Complaint Follow-up</option>
                                            <option>Bug Report</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label-sc">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="form-control-sc"
                                            placeholder="Describe your issue or question…"
                                            rows="4"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn w-100 py-2 fw-bold text-white"
                                            style={{ 'background': 'linear-gradient(135deg,var(--blue),var(--teal2))', 'borderRadius': '9px', 'fontSize': '14px' }}
                                        >
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </form>
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

export default GeneralContact;
