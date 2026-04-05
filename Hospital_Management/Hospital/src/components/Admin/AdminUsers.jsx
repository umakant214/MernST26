import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = async (userId, currentRole, userName) => {
    const newRole = window.prompt(`Change role for ${userName} (Current: ${currentRole})\nEnter new role: admin, doctor, or user`, currentRole);
    if (!newRole) return;
    
    const validRoles = ['admin', 'doctor', 'user'];
    const formattedRole = newRole.toLowerCase().trim();
    
    if (!validRoles.includes(formattedRole)) {
      return toast.error("Invalid role. Must be 'admin', 'doctor', or 'user'.");
    }

    if (formattedRole === currentRole) return;

    try {
      const res = await api.put(`/users/${userId}/role`, { role: formattedRole });
      if (res.data.success) {
        toast.success(`Role updated to ${formattedRole}`);
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'badge bg-danger';
      case 'doctor':
        return 'badge bg-primary';
      default:
        return 'badge bg-success';
    }
  };

  return (
    <Layout zone="admin" pageTitle="User Management" breadcrumb="Admin / User Management">
      <div className="card-panel p-3">
        <h5 className="mb-3">Users</h5>
        <div style={{ overflowX: 'auto' }}>
          {loading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : (
            <table className="table-custom">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-3">No users found</td></tr>
                ) : (
                  users.map((u, i) => (
                    <tr key={u._id}>
                      <td className="text-muted" style={{ fontSize: '0.85rem' }}>...{u._id.substring(u._id.length - 6)}</td>
                      <td>
                        <div style={{ fontWeight: '600' }}>{u.name}</div>
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <span className={getRoleBadgeClass(u.role)} style={{textTransform: 'uppercase', fontSize: '0.75rem', padding: '0.35rem 0.5rem'}}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span className="badge-status badge-confirmed">Active</span>
                      </td>
                      <td>
                        <button className="btn-sm-icon edit" title="Edit Role" onClick={() => handleEditRole(u._id, u.role, u.name)}>
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;