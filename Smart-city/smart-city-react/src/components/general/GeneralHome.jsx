import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const GeneralHome = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className="gnav">
<Link className="gnav-logo" to="/general-home">
<div className="gnav-logo-mark"><svg fill="none" height="18" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><path d="M3 9l9-7 9 7v11H3z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
<span className="gnav-brand">Smart<span>City</span></span>
</Link>
<div className="d-flex align-items-center gap-1 ms-3 gnav-desktop-links"><Link className="gnav-link act" to="/general-home">Home</Link><Link className="gnav-link" to="/general-about">About</Link><Link className="gnav-link" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link" to="/general-contact">Contact</Link></div>
<div className="gnav-right gnav-desktop-links">
<span className="gnav-pill">8,421 citizens registered</span>
<Link className="gnav-btn-ghost" to="/general-login">Login</Link>
<Link className="gnav-btn-solid" to="/general-register">Register Free</Link>
</div>
<button aria-label="Open navigation" className="gnav-mob-toggle" id="gnav-mob-toggle"><svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></button><div className="gnav-mob-menu" id="gnav-mob-menu"><Link className="gnav-link act" to="/general-home">Home</Link><Link className="gnav-link" to="/general-about">About</Link><Link className="gnav-link" to="/general-guidelines">Guidelines</Link><Link className="gnav-link" to="/general-notices">Notices</Link><Link className="gnav-link" to="/general-contact">Contact</Link><Link className="gnav-btn-ghost" to="/general-login">Login</Link><Link className="gnav-btn-solid" to="/general-register">Register Free</Link></div></nav>
<div className="hero">
<div className="hero-bg"></div>
<div className="hero-blob b1"></div><div className="hero-blob b2"></div><div className="hero-blob b3"></div>
<div className="hero-grid"></div>
<div className="container-xl position-relative" style={{'zIndex': '1', 'padding': '40px 40px'}}>
<div className="row align-items-center g-5">
<div className="col-lg-6">
<div className="hero-eyebrow"><span className="hero-eyebrow-dot"></span> Municipal Corporation · Smart City Initiative 2026</div>
<h1 className="hero-h1">Your City.<br/><span className="hl">Your Voice.</span><br/>We <span className="hl2">Act Fast.</span></h1>
<p className="hero-sub">File civic complaints in minutes. Track resolution in real time. Communicate directly with city departments — all from one unified platform.</p>
<div className="d-flex gap-3 flex-wrap mb-4">
<Link className="hbtn-primary" to="/general-register">🚀 Register &amp; File Now</Link>
<Link className="hbtn-ghost" to="/general-guidelines">How It Works →</Link>
</div>
<div className="trust-bar">
<div className="trust-avs">
<div className="tav" style={{'background': '#6D28D9'}}>RK</div>
<div className="tav" style={{'background': '#0891B2'}}>PK</div>
<div className="tav" style={{'background': '#059669'}}>AM</div>
<div className="tav" style={{'background': '#D97706'}}>NR</div>
<div className="tav" style={{'background': '#DC2626'}}>VT</div>
</div>
<div style={{'fontSize': '12px', 'color': 'rgba(255,255,255,.5)'}}>Joined by <strong style={{'color': 'rgba(255,255,255,.85)'}}>8,400+</strong> citizens</div>
</div>
</div>
<div className="col-lg-6">
<div className="hero-glass mb-3">
<div className="hg-label">Live Platform Statistics</div>
<div className="row g-2">
<div className="col-6"><div className="hg-stat"><div className="hg-val">8,421</div><div className="hg-lbl">Citizens</div></div></div>
<div className="col-6"><div className="hg-stat"><div className="hg-val">3,204</div><div className="hg-lbl">Complaints Filed</div></div></div>
<div className="col-6"><div className="hg-stat"><div className="hg-val" style={{'color': '#4ADE80'}}>2,748</div><div className="hg-lbl">✓ Resolved</div></div></div>
<div className="col-6"><div className="hg-stat"><div className="hg-val" style={{'color': '#FCD34D'}}>4.2d</div><div className="hg-lbl">Avg Time</div></div></div>
</div>
</div>
<div className="hero-chat-preview">
<div className="hcp-title">Live Activity</div>
<div className="hcp-msg"><div className="hcp-av" style={{'background': '#6D28D9'}}>RK</div><div className="hcp-bubble">Water supply issue filed — Ward 7, Block B</div></div>
<div className="hcp-msg flex-row-reverse"><div className="hcp-av" style={{'background': '#0891B2'}}>WD</div><div className="hcp-bubble mine">Team dispatched. Est. resolution: 2 hours ✓</div></div>
<div className="hcp-msg"><div className="hcp-av" style={{'background': '#059669'}}>AD</div><div className="hcp-bubble">Pothole on MG Road reported by Priya K.</div></div>
<div className="hcp-status"><span>●</span> 312 complaints being resolved right now</div>
</div>
</div>
</div>
</div>
</div>
{/*  TICKER  */}
<div className="ticker-strip">
<div className="ticker-inner">
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><polyline points="20 6 9 17 4 12" /></svg> 12 complaints resolved today</div>
<div className="ticker-sep">·</div>
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><circle cx="12" cy="12" r="10" /></svg> Water supply restored in Ward 7</div>
<div className="ticker-sep">·</div>
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /></svg> Maintenance scheduled: 17 Mar, Ward 5–7</div>
<div className="ticker-sep">·</div>
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /></svg> 142 new citizens registered this week</div>
<div className="ticker-sep">·</div>
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> Average resolution improved to 4.2 days</div>
<div className="ticker-sep">·</div>
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><polyline points="20 6 9 17 4 12" /></svg> 12 complaints resolved today</div>
<div className="ticker-sep">·</div>
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><circle cx="12" cy="12" r="10" /></svg> Water supply restored in Ward 7</div>
<div className="ticker-sep">·</div>
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /></svg> Maintenance scheduled: 17 Mar, Ward 5–7</div>
<div className="ticker-sep">·</div>
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /></svg> 142 new citizens registered this week</div>
<div className="ticker-sep">·</div>
<div className="ticker-item"><svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> Average resolution improved to 4.2 days</div>
</div>
</div>
{/*  STAT STRIP  */}
<div className="stat-strip">
<div className="container-xl">
<div className="row g-0">
<div className="col-6 col-md-3 ss-item"><div className="ss-num c1">8,421</div><div className="ss-lbl">Registered Citizens</div><div className="ss-trend">▲ +142 this month</div></div>
<div className="col-6 col-md-3 ss-item"><div className="ss-num c2">3,204</div><div className="ss-lbl">Complaints Filed</div><div className="ss-trend">▲ +87 this week</div></div>
<div className="col-6 col-md-3 ss-item"><div className="ss-num c3">2,748</div><div className="ss-lbl">Complaints Resolved</div><div className="ss-trend">▲ 85.8% success rate</div></div>
<div className="col-6 col-md-3 ss-item"><div className="ss-num c4">4.2d</div><div className="ss-lbl">Avg Resolution Time</div><div className="ss-trend">▲ Improved 0.8d</div></div>
</div>
</div>
</div>
{/*  SERVICES  */}
<section className="sec-wrap" style={{'background': '#fff'}}>
<div className="sec-inner">
<div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
<div>
<div className="sec-eyebrow">Services</div>
<h2 className="sec-title">What can you <em>report?</em></h2>
<p className="sec-sub mb-0">Six categories handled by dedicated departments with SLA tracking.</p>
</div>
<Link className="btn btn-sm px-4 py-2 fw-bold text-white" to="/general-register" style={{'background': 'linear-gradient(135deg,#2D1B8B,#0E6B8A)', 'borderRadius': '9px'}}>File a Complaint →</Link>
</div>
<div className="row g-3">
<div className="col-md-8">
<div className="svc-card-new svc-water svc-featured h-100">
<div className="svc-gradient"></div>
<div className="svc-arrow"><svg fill="none" height="14" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><line x1="7" x2="17" y1="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></div>
<div className="svc-content"><div className="svc-badge">842 complaints</div><div className="svc-title">Water Supply</div><div className="svc-desc">Leakage, no supply, contamination, low pressure</div></div>
</div>
</div>
<div className="col-md-4">
<div className="svc-card-new svc-elec h-100">
<div className="svc-gradient"></div>
<div className="svc-arrow"><svg fill="none" height="14" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><line x1="7" x2="17" y1="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></div>
<div className="svc-content"><div className="svc-badge">480 complaints</div><div className="svc-title">Electricity</div><div className="svc-desc">Power cuts, meter issues, streetlight faults</div></div>
</div>
</div>
<div className="col-md-4">
<div className="svc-card-new svc-road">
<div className="svc-gradient"></div>
<div className="svc-arrow"><svg fill="none" height="14" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><line x1="7" x2="17" y1="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></div>
<div className="svc-content"><div className="svc-badge">601 complaints</div><div className="svc-title">Roads &amp; Potholes</div><div className="svc-desc">Potholes, broken roads, footpath damage</div></div>
</div>
</div>
<div className="col-md-4">
<div className="svc-card-new svc-san">
<div className="svc-gradient"></div>
<div className="svc-arrow"><svg fill="none" height="14" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><line x1="7" x2="17" y1="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></div>
<div className="svc-content"><div className="svc-badge">534 complaints</div><div className="svc-title">Sanitation</div><div className="svc-desc">Garbage, blocked drains, cleanliness</div></div>
</div>
</div>
<div className="col-md-4">
<div className="svc-card-new svc-light">
<div className="svc-gradient"></div>
<div className="svc-arrow"><svg fill="none" height="14" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><line x1="7" x2="17" y1="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></div>
<div className="svc-content"><div className="svc-badge">312 complaints</div><div className="svc-title">Street Lights</div><div className="svc-desc">Non-functional lights, wiring hazards</div></div>
</div>
</div>
<div className="col-md-4 d-none d-md-block">
<div className="svc-card-new svc-other">
<div className="svc-gradient"></div>
<div className="svc-arrow"><svg fill="none" height="14" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><line x1="7" x2="17" y1="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></div>
<div className="svc-content"><div className="svc-badge">435 complaints</div><div className="svc-title">Other Services</div><div className="svc-desc">Parks, stray animals, encroachments, noise</div></div>
</div>
</div>
</div>
</div>
</section>
{/*  HOW IT WORKS  */}
<div className="process-bg">
<div className="container-xl position-relative" style={{'zIndex': '1'}}>
<div className="process-title">Simple 4-step process</div>
<div className="process-sub">From registration to resolution — we make it effortless.</div>
<div className="row g-4">
<div className="col-6 col-md-3 text-center">
<div className="ps-circle mx-auto"><span className="ps-icon">👤</span></div>
<div className="ps-title">Register</div>
<div className="ps-desc">Create a free citizen account with Aadhaar and mobile verification in 60 seconds.</div>
</div>
<div className="col-6 col-md-3 text-center">
<div className="ps-circle mx-auto"><span className="ps-icon">📝</span></div>
<div className="ps-title">File Complaint</div>
<div className="ps-desc">Select category, pin location on map, add photos and description — submit in minutes.</div>
</div>
<div className="col-6 col-md-3 text-center">
<div className="ps-circle mx-auto"><span className="ps-icon">📡</span></div>
<div className="ps-title">Track Progress</div>
<div className="ps-desc">Real-time SMS and portal updates at every stage from filing to resolution.</div>
</div>
<div className="col-6 col-md-3 text-center">
<div className="ps-circle mx-auto"><span className="ps-icon">⭐</span></div>
<div className="ps-title">Give Feedback</div>
<div className="ps-desc">Rate resolution quality and help improve services for your entire community.</div>
</div>
</div>
</div>
</div>
{/*  LATEST NOTICES  */}
<section className="sec-wrap" style={{'background': 'var(--g50)'}}>
<div className="sec-inner">
<div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
<div>
<div className="sec-eyebrow">📢 Announcements</div>
<h2 className="sec-title">Latest <em>Notices</em></h2>
</div>
<Link className="btn btn-sm px-4 py-2 fw-bold" to="/general-notices" style={{'border': '1.5px solid var(--g200)', 'color': 'var(--g600)', 'borderRadius': '9px', 'background': 'transparent'}}>View All →</Link>
</div>
<div className="row g-3">
<div className="col-md-6">
<div className="notice-featured h-100">
<div className="nf-tag">🔴 Urgent Notice</div>
<div className="nf-title">Water Supply Interruption — Wards 5, 6, 7</div>
<div className="nf-body">Scheduled pipeline maintenance on <strong style={{'color': '#fff'}}>17 March 2026 from 10am–2pm</strong>. All residents should store adequate water. Emergency tankers will be deployed at key points.</div>
<div className="nf-date">🕐 14 Mar 2026 · Municipal Water Dept</div>
</div>
</div>
<div className="col-md-6 d-flex flex-column gap-3">
<div className="notice-small flex-fill">
<div className="ns-tag info">Information</div>
<div className="ns-title">New Portal Features Live</div>
<div className="ns-body">Photo upload (5 images), GPS location, real-time SMS tracking, and department messaging now available for all citizens.</div>
<div className="ns-date">10 Mar 2026 · IT Cell</div>
</div>
<div className="notice-small flex-fill">
<div className="ns-tag update">Update</div>
<div className="ns-title">Roads Drive Completed — Wards 3–8</div>
<div className="ns-body">142 reported potholes patched as part of the March 2026 monthly civic improvement drive.</div>
<div className="ns-date">8 Mar 2026 · Roads Dept</div>
</div>
<div className="notice-small flex-fill">
<div className="ns-tag warn">Maintenance</div>
<div className="ns-title">Portal Downtime — 20 March, 12am–3am</div>
<div className="ns-body">Scheduled server maintenance. Complaint submission unavailable temporarily.</div>
<div className="ns-date">13 Mar 2026 · IT Cell</div>
</div>
</div>
</div>
</div>
</section>
{/*  TESTIMONIALS  */}
<div className="testi-strip">
<div className="container-xl">
<div className="text-center mb-4">
<div className="sec-eyebrow mx-auto">⭐ Citizen Reviews</div>
<h2 className="sec-title">Loved by <em>citizens</em></h2>
<p style={{'fontSize': '14px', 'color': 'var(--g400)'}}>What Smart City residents say about the portal</p>
</div>
<div className="row g-3">
<div className="col-md-4">
<div className="testi-card">
<div className="tc-stars">★★★★★</div>
<div className="tc-quote">"My water complaint was resolved in under 2 days. The real-time tracking made all the difference — I knew exactly what was happening."</div>
<div className="d-flex align-items-center gap-3">
<div className="tc-av" style={{'background': 'linear-gradient(135deg,#6D28D9,#0891B2)'}}>RK</div>
<div><div className="tc-name">Rahul Kumar</div><div className="tc-role">Resident, Ward 7</div></div>
</div>
</div>
</div>
<div className="col-md-4">
<div className="testi-card">
<div className="tc-stars">★★★★★</div>
<div className="tc-quote">"Filing a complaint used to take hours at the municipal office. Now I do it in 3 minutes from my phone. This is exactly what our city needed."</div>
<div className="d-flex align-items-center gap-3">
<div className="tc-av" style={{'background': 'linear-gradient(135deg,#0E6B8A,#059669)'}}>PK</div>
<div><div className="tc-name">Priya Kapoor</div><div className="tc-role">Teacher, Ward 3</div></div>
</div>
</div>
</div>
<div className="col-md-4">
<div className="testi-card">
<div className="tc-stars">★★★★☆</div>
<div className="tc-quote">"The photo upload feature and department messaging make this the most transparent complaint system I've ever used. Great initiative!"</div>
<div className="d-flex align-items-center gap-3">
<div className="tc-av" style={{'background': 'linear-gradient(135deg,#D97706,#DC2626)'}}>AM</div>
<div><div className="tc-name">Amit Malhotra</div><div className="tc-role">Business Owner, Ward 12</div></div>
</div>
</div>
</div>
</div>
</div>
</div>
{/*  CTA  */}
<div className="cta-section">
<div className="container-xl text-center position-relative" style={{'zIndex': '1'}}>
<h2 className="cta-h">Ready to make your<br/><em>city better?</em></h2>
<p className="cta-sub">Join 8,400+ citizens already using Smart City Portal. Create your free account and file your first complaint in under 2 minutes.</p>
<div className="d-flex gap-3 justify-content-center flex-wrap">
<Link className="hbtn-primary" to="/general-register">🚀 Create Free Account</Link>
<Link className="hbtn-ghost" to="/general-login">Sign In</Link>
</div>
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
<div className="fsoc-btn"><svg fill="none" height="13" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" width="13"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg></div>
<div className="fsoc-btn"><svg fill="none" height="13" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" width="13"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect height="12" width="4" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></div>
</div>
</div>
</div>
</footer>



        </>
    );
};

export default GeneralHome;
