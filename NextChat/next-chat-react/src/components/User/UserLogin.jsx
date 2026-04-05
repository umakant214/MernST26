import React from 'react';

const UserLogin = () => {
    return (
        <div className="p-4 bg-light" style={{ minHeight: 'calc(100vh - 105px)' }}>
            <div className="row g-4 justify-content-center">
                <div className="col-md-5">
                    <div className="login-card w-100" style={{ maxWidth: '100%' }}>
                        <h5 className="fw-bold mb-1">Sign In</h5>
                        <p className="small text-muted mb-4">Welcome back — continue chatting</p>
                        <div className="mb-3"><label className="form-label-nc">Email</label><input type="email" className="form-input-nc" placeholder="you@email.com" /></div>
                        <div className="mb-4"><label className="form-label-nc">Password</label><input type="password" className="form-input-nc" placeholder="••••••••" /></div>
                        <button className="submit-btn-nc mb-3">Sign In</button>
                        <p className="text-center small text-muted mb-0">No account? <span style={{ color: 'var(--nc-blue)', cursor: 'pointer' }}>Register here</span></p>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="login-card w-100" style={{ maxWidth: '100%' }}>
                        <h5 className="fw-bold mb-1">Create Account</h5>
                        <p className="small text-muted mb-4">Join NexChat for free</p>
                        <div className="mb-2"><label className="form-label-nc">Full Name</label><input type="text" className="form-input-nc" placeholder="Jane Doe" /></div>
                        <div className="mb-2"><label className="form-label-nc">Email</label><input type="email" className="form-input-nc" placeholder="you@email.com" /></div>
                        <div className="mb-2"><label className="form-label-nc">Password</label><input type="password" className="form-input-nc" placeholder="Min 8 characters" /></div>
                        <div className="mb-4"><label className="form-label-nc">Confirm Password</label><input type="password" className="form-input-nc" placeholder="Repeat password" /></div>
                        <button className="submit-btn-nc mb-3">Create Account</button>
                        <p className="text-center small text-muted mb-0">Already have an account? <span style={{ color: 'var(--nc-blue)', cursor: 'pointer' }}>Sign in</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
