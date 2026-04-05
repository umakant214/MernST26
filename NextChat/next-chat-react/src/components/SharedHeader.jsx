import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SharedHeader = ({ title, sub, type, onToggleNotif, notifOpen }) => {
    return (
        <div className="nc-header d-flex align-items-center gap-3">
            <div>
                <div className="header-title">{title}</div>
                <div className="header-sub">{sub}</div>
            </div>
            <div className="ms-auto">
                <div className="search-wrap d-flex align-items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input type="text" placeholder={type === 'admin' ? "Search users, chats…" : "Search messages…"} />
                </div>
            </div>
            <div className="d-flex align-items-center gap-2 position-relative">
                <button className="icon-btn btn-notif" onClick={onToggleNotif}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                    <div className="notif-dot"></div>
                </button>
                
                {notifOpen && (
                    <div className="notif-panel show" id="notif-panel" style={{ top: '45px', right: '0' }}>
                        <div className="notif-head">Notifications <span className="notif-clear">Clear all</span></div>
                        {type === 'admin' ? (
                            <>
                                <div className="notif-item d-flex align-items-start gap-2"><span className="avatar sm red">!</span><div><div className="notif-text">5 flagged messages need review</div><div className="notif-time">2 min ago</div></div></div>
                                <div className="notif-item d-flex align-items-start gap-2"><span className="avatar sm green">U</span><div><div className="notif-text">New user registered: jane_doe</div><div className="notif-time">15 min ago</div></div></div>
                                <div className="notif-item d-flex align-items-start gap-2"><span className="avatar sm amber">S</span><div><div className="notif-text">Server load reached 78%</div><div className="notif-time">1 hr ago</div></div></div>
                            </>
                        ) : (
                            <>
                                <div className="notif-item d-flex align-items-start gap-2"><span className="avatar sm purple">MK</span><div><div className="notif-text">Mike Khan sent you a message</div><div className="notif-time">Just now</div></div></div>
                                <div className="notif-item d-flex align-items-start gap-2"><span className="avatar sm amber">RP</span><div><div className="notif-text">Riya Patel missed audio call</div><div className="notif-time">15 min ago</div></div></div>
                            </>
                        )}
                    </div>
                )}

                <span style={{ width: '1px', height: '24px', background: 'var(--nc-gray-200)' }}></span>
                {(() => {
                    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
                    const initials = userInfo.name ? userInfo.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : (type === 'admin' ? 'SA' : 'U');
                    return (
                        <span className={`avatar ${type === 'admin' ? 'red' : 'green'}`} style={{ cursor: 'pointer' }}>
                            {initials}
                        </span>
                    );
                })()}
            </div>
        </div>
    );
};

export default SharedHeader;
