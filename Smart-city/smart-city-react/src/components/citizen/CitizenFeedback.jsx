import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CitizenSidebar from './CitizenSidebar';
import API from '../../api';

const CitizenFeedback = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [resolvedComplaints, setResolvedComplaints] = useState([]);
    const [feedbackData, setFeedbackData] = useState({}); // { complaintId: { rating, comment } }

    useEffect(() => {
        const fetchResolved = async () => {
            try {
                const res = await API.get('/complaints/my');
                // Only show resolved complaints that don't have feedback yet
                const resolved = res.data.filter(c => c.status === 'Resolved' && !c.feedbackRating);
                setResolvedComplaints(resolved);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchResolved();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info('Logged out successfully');
        navigate('/general-login');
    };

    const handleRating = (id, rating) => {
        setFeedbackData({
            ...feedbackData,
            [id]: { ...feedbackData[id], rating }
        });
    };

    const handleComment = (id, comment) => {
        setFeedbackData({
            ...feedbackData,
            [id]: { ...feedbackData[id], comment }
        });
    };

    const handleSubmitFeedback = async (id) => {
        const data = feedbackData[id];
        if (!data || !data.rating) {
            return toast.error('Please provide a rating');
        }

        try {
            const res = await API.post(`/complaints/feedback/${id}`, {
                feedbackRating: data.rating,
                feedbackComment: data.comment || ''
            });
            toast.success(res.data.message);
            // Remove from list after submission
            setResolvedComplaints(resolvedComplaints.filter(c => c._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Submission failed');
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
                            <div className="hdr-title">Feedback</div>
                            <div className="hdr-sub">Welcome back, {user.firstName}</div>
                        </div>
                    </header>
                    <main className="page-body flex-fill overflow-auto p-3">
                        <div className="page-intro"><h2>Feedback</h2><p>Rate resolved complaints and improve city services</p></div>

                        {resolvedComplaints.length === 0 ? (
                            <div className="text-center py-5">
                                <div className="sc-card shadow-sm d-inline-block p-4" style={{ maxWidth: '400px' }}>
                                    <h4 className="mb-2">No Pendng Feedback</h4>
                                    <p className="text-muted mb-0">Good job! You've provided feedback for all your resolved complaints.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="row g-3">
                                {resolvedComplaints.map(complaint => (
                                    <div className="col-md-6" key={complaint._id}>
                                        <div className="sc-card mb-3" style={{ 'borderLeft': '4px solid var(--green)' }}>
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <div>
                                                    <div className="d-flex gap-2 mb-1">
                                                        <span className="cid">#{complaint._id.slice(-4)}</span>
                                                        <span className="sc-badge b-resolved">Resolved</span>
                                                    </div>
                                                    <div style={{ 'fontFamily': 'var(--font-display)', 'fontSize': '14px', 'fontWeight': '700', 'color': 'var(--gray-900)' }}>{complaint.title}</div>
                                                    <div style={{ 'fontSize': '12px', 'color': 'var(--gray-400)', 'marginTop': '2px' }}>{complaint.location} · {complaint.category}</div>
                                                </div>
                                                <div style={{ 'fontSize': '11px', 'fontWeight': '700', 'background': 'var(--green-bg)', 'color': 'var(--green)', 'padding': '4px 9px', 'borderRadius': '7px', 'whiteSpace': 'nowrap' }}>
                                                    Resolved {new Date(complaint.updatedAt).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <div style={{ 'fontSize': '12px', 'fontWeight': '700', 'color': 'var(--gray-600)', 'marginBottom': '8px' }}>Overall experience</div>
                                            <div className="star-row mb-2">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <span
                                                        key={star}
                                                        className={`star ${feedbackData[complaint._id]?.rating >= star ? 'on' : ''}`}
                                                        onClick={() => handleRating(complaint._id, star)}
                                                        style={{ cursor: 'pointer' }}
                                                    >★</span>
                                                ))}
                                            </div>
                                            <div style={{ 'fontSize': '12px', 'color': 'var(--gray-400)', 'marginBottom': '14px' }}>
                                                {feedbackData[complaint._id]?.rating ? `${feedbackData[complaint._id].rating}/5 Rating` : 'Select a rating'}
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label-sc">Comments</label>
                                                <textarea
                                                    className="form-input-sc"
                                                    rows="3"
                                                    placeholder="Share your experience..."
                                                    value={feedbackData[complaint._id]?.comment || ''}
                                                    onChange={(e) => handleComment(complaint._id, e.target.value)}
                                                ></textarea>
                                            </div>
                                            <button
                                                className="btn-sc-primary"
                                                onClick={() => handleSubmitFeedback(complaint._id)}
                                            >Submit Feedback</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default CitizenFeedback;
