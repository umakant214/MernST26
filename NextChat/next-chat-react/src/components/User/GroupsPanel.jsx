import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const GroupsPanel = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    // Premium Mock Groups
    const defaultGroups = [
        { _id: "mock-g1", chatName: "#marketing-team", users: [{},{},{},{}], latestMessage: { sender: { name: "Mike" }, content: "Budget approved for NexChat!" }, groupAdmin: { name: "Mike Khan" } },
        { _id: "mock-g2", chatName: "#general-tech", users: [{},{},{}], latestMessage: { sender: { name: "Alex" }, content: "Anyone tried the new socket engine?" }, groupAdmin: { name: "Alex Lee" } },
        { _id: "mock-g3", chatName: "#project-alpha", users: [{},{},{},{},{}], latestMessage: { sender: { name: "Riya" }, content: "Deployment successful." }, groupAdmin: userInfo },
    ];

    const fetchGroups = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/chat');
            const realGroups = data.filter(c => c.isGroupChat);
            
            const merged = [...realGroups];
            defaultGroups.forEach(dg => {
                if (!merged.find(m => m.chatName === dg.chatName)) merged.push(dg);
            });
            setGroups(merged);
        } catch (error) {
            setGroups(defaultGroups);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const getAvatarColor = (name) => {
        const colors = ['purple', 'blue', 'orange', 'pink'];
        const charCode = (name?.[0]?.toUpperCase()?.charCodeAt(0) || 0) % colors.length;
        return colors[charCode];
    };

    return (
        <div className="panel active">
            <div className="dash-body">
                <div className="page-intro"><h2>Group Channels</h2><p>Your collaborative spaces and rooms</p></div>
                <div className="nc-card">
                    <div className="card-head d-flex justify-content-between align-items-center">
                        <span className="card-title">My Groups ({groups.length})</span>
                        <div className="d-flex gap-2">
                             <button className="act-btn act-btn-gray btn-sm" onClick={fetchGroups}>Sync</button>
                             <button className="act-btn act-btn-blue btn-sm">+ Create Room</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="tbl">
                            <thead><tr><th>Channel</th><th>Members</th><th>Last Activity</th><th>Manager</th><th>Action</th></tr></thead>
                            <tbody>
                                {loading && groups.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center py-5 text-muted"><div className="spinner-border spinner-border-sm me-2"></div> Fetching groups...</td></tr>
                                ) : groups.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center py-5 text-muted">No groups found. Create one to begin.</td></tr>
                                ) : groups.map((group, idx) => (
                                    <tr key={group._id || idx}>
                                        <td>
                                            <div className="tbl-avatar">
                                                <span className={`avatar sm ${getAvatarColor(group.chatName)}`}>#</span>
                                                <div className="d-flex flex-column">
                                                    <span className="fw-medium text-dark">{group.chatName}</span>
                                                    <small className="text-muted" style={{fontSize: '10px'}}>{group.isShared ? 'Public Channel' : 'Private Group'}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge-nc badge-gray">{group.users.length}</span></td>
                                        <td className="text-muted small text-truncate" style={{maxWidth: '200px'}}>
                                            {group.latestMessage ? `${group.latestMessage.sender.name}: ${group.latestMessage.content}` : "Start a conversation"}
                                        </td>
                                        <td><span className="small">{group.groupAdmin?.name || "N/A"}</span></td>
                                        <td>
                                            <button 
                                                className="act-btn act-btn-blue btn-sm" 
                                                onClick={() => navigate('/user', { state: { selectedChat: group } })}
                                            >
                                                Open Channel
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupsPanel;
