import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const UserDashboard = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const [stats, setStats] = useState({
        totalChats: 0,
        unreadMessages: 14,
        totalGroups: 5,
        onlineFriends: 23,
        filesShared: 48
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/user/stats');
                setStats(data);
            } catch (error) {
                toast.error("Failed to load dashboard stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="panel active">
            <div className="dash-body">
                <div className="page-intro"><h2>Welcome back, {userInfo.name || 'User'}!</h2><p>Here's what's happening today</p></div>
                <div className="row g-3 mb-4">
                    <div className="col-6 col-md-3"><div className="stat-card"><div className="stat-card-label">Unread Msgs</div><div className="stat-card-val">{loading ? "..." : stats.unreadMessages}</div></div></div>
                    <div className="col-6 col-md-3"><div className="stat-card"><div className="stat-card-label">Online Friends</div><div className="stat-card-val">{loading ? "..." : stats.onlineFriends}</div></div></div>
                    <div className="col-6 col-md-3"><div className="stat-card"><div className="stat-card-label">Active Groups</div><div className="stat-card-val">{loading ? "..." : stats.totalGroups}</div></div></div>
                    <div className="col-6 col-md-3"><div className="stat-card"><div className="stat-card-label">Files Shared</div><div className="stat-card-val">{loading ? "..." : stats.filesShared}</div></div></div>
                </div>
                {/* Rest of the UI remains static or placeholders for now */}
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="nc-card h-100">
                            <div className="card-head d-flex justify-content-between align-items-center">
                                <span className="card-title">Recent Chats</span><span className="card-action">Open chat →</span>
                            </div>
                            <div className="nc-card-body">
                                <div className="online-item d-flex align-items-center gap-2"><span className="avatar sm purple">MK</span><span className="online-dot"></span><span className="online-name flex-grow-1">Mike Khan</span><span className="online-time">Hey! Are you…</span></div>
                                <div className="online-item d-flex align-items-center gap-2"><span className="avatar sm amber">RP</span><span className="online-dot away"></span><span className="online-name flex-grow-1">Riya Patel</span><span className="online-time">Sent a photo</span></div>
                                <div className="online-item d-flex align-items-center gap-2"><span className="avatar sm">AL</span><span className="online-dot"></span><span className="online-name flex-grow-1">Alex Lee</span><span className="online-time">Let's hop on a…</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="nc-card h-100">
                            <div className="card-head"><span className="card-title">Online Users</span></div>
                            <div className="nc-card-body">
                                <div className="online-item d-flex align-items-center gap-2"><span className="avatar sm green">SR</span><span className="online-dot"></span><span className="online-name flex-grow-1">Sam Rodriguez</span></div>
                                <div className="online-item d-flex align-items-center gap-2"><span className="avatar sm">TW</span><span className="online-dot"></span><span className="online-name flex-grow-1">Tara Williams</span></div>
                                <div className="online-item d-flex align-items-center gap-2"><span className="avatar sm amber">PK</span><span className="online-dot away"></span><span className="online-name flex-grow-1">Priya Kumar</span></div>
                                <div className="online-item d-flex align-items-center gap-2"><span className="avatar sm purple">NN</span><span className="online-dot"></span><span className="online-name flex-grow-1">Neil Nair</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
