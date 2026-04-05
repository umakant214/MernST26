import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        try {
            const { data } = await api.get('/admin/chats');
            setRooms(data);
        } catch (error) {
            toast.error("Failed to fetch rooms");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="panel active">
            <div className="dash-body">
                <div className="page-intro"><h2>Groups & Rooms</h2><p>View and manage all active communication channels</p></div>
                <div className="nc-card">
                    <div className="card-head d-flex justify-content-between align-items-center">
                        <span className="card-title">All Groups ({rooms.length})</span>
                        <div className="d-flex gap-2">
                            <button className="act-btn act-btn-blue" onClick={fetchRooms}>Refresh</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="tbl">
                            <thead><tr><th>Room Name</th><th>Created By</th><th>Members</th><th>Type</th><th>Actions</th></tr></thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-4">Loading rooms...</td></tr>
                                ) : rooms.map((room) => (
                                    <tr key={room._id}>
                                        <td><div className="tbl-avatar"><span className="avatar sm purple">{room.isGroupChat ? "#" : "@"}</span> {room.chatName}</div></td>
                                        <td className="text-muted">{room.groupAdmin ? room.groupAdmin.name : "N/A"}</td>
                                        <td className="text-muted">{room.users.length} users</td>
                                        <td><span className={`badge-nc ${room.isGroupChat ? 'badge-green' : 'badge-blue'}`}>{room.isGroupChat ? "Group" : "Direct"}</span></td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="act-btn act-btn-gray">Settings</button>
                                                <button className="act-btn act-btn-red">Archive</button>
                                            </div>
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

export default AdminRooms;
