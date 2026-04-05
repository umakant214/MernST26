import React, { useState, useEffect } from 'react';
import Layout from '../Shared/Layout';
import api from '../../services/api';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemActivity();
  }, []);

  const fetchSystemActivity = async () => {
    try {
      setLoading(true);
      const [aptRes, usrRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/users')
      ]);

      const apts = aptRes.data.data || [];
      const users = usrRes.data.data || [];

      const generatedNotifs = [];

      // Generate notifications from recent pending appointments
      apts.filter(a => a.status === 'pending').slice(0, 5).forEach((a, i) => {
        generatedNotifs.push({
          id: `apt-${a._id}`,
          type: 'appointment',
          title: 'New Appointment Booking',
          message: `${a.userId?.name || 'A patient'} has booked an appointment with ${a.doctorId?.userId?.name || 'a doctor'}`,
          time: new Date(a.createdAt || Date.now()).toLocaleDateString('en-GB'),
          read: false
        });
      });

      // Generate notifications from recent users
      const newUsers = users.filter(u => u.role === 'user').slice(-3).reverse();
      newUsers.forEach((u, i) => {
        generatedNotifs.push({
          id: `usr-${u._id}`,
          type: 'patient',
          title: 'New Patient Registration',
          message: `${u.name} registered as a new patient`,
          time: 'Recently',
          read: false
        });
      });

      // Default System Notifications
      generatedNotifs.push({
        id: 'sys-welcome',
        type: 'system',
        title: 'Welcome to your Dashboard',
        message: 'Your hospital management system is active and ready to process requests.',
        time: 'Just now',
        read: false
      });

      generatedNotifs.push({
        id: 'sys-update',
        type: 'billing',
        title: 'Billing Module Active',
        message: 'You can now generate and download text invoices from the Billing menu.',
        time: 'Today',
        read: true
      });

      setNotifications(generatedNotifs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    const icons = {
      appointment: 'bi-calendar-check-fill',
      doctor: 'bi-person-badge-fill',
      patient: 'bi-person-heart',
      billing: 'bi-receipt',
      system: 'bi-gear-fill'
    };
    return icons[type] || 'bi-bell-fill';
  };

  const getColor = (type) => {
    const colors = {
      appointment: '#1a73e8',
      doctor: '#06d6a0',
      patient: '#f39c12',
      billing: '#e74c3c',
      system: '#9b59b6'
    };
    return colors[type] || '#666';
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout zone="admin" pageTitle="Notifications" breadcrumb="Admin / Notifications">
      <div className="row">
        <div className="col-lg-8">
          <div className="card-panel p-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h5 style={{ margin: 0 }}>All Notifications ({notifications.length})</h5>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-outline-custom" onClick={markAllRead} style={{ fontSize: '.85rem', padding: '6px 12px' }}>
                  <i className="bi bi-check-all"></i> Mark All Read
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '600px', overflowY: 'auto' }}>
              {loading ? (
                <div className="text-center py-4">Loading notifications...</div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-4 text-muted">No recent notifications available.</div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      display: 'flex',
                      gap: '15px',
                      padding: '15px',
                      background: notif.read ? 'transparent' : 'var(--body-bg)',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${getColor(notif.type)}`,
                      transition: 'all 0.3s'
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: getColor(notif.type) + '20',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <i className={`bi ${getIcon(notif.type)}`} style={{ color: getColor(notif.type), fontSize: '1.2rem' }}></i>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{notif.title}</div>
                      <div style={{ fontSize: '.9rem', color: 'var(--text-light)', marginBottom: '5px' }}>{notif.message}</div>
                      <div style={{ fontSize: '.75rem', color: 'var(--text-light)' }}>{notif.time}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                      {!notif.read && (
                        <button
                          className="btn-sm-icon"
                          title="Mark as read"
                          onClick={() => markAsRead(notif.id)}
                          style={{ fontSize: '.85rem' }}
                        >
                          <i className="bi bi-check2"></i>
                        </button>
                      )}
                      <button
                        className="btn-sm-icon del"
                        title="Delete"
                        onClick={() => deleteNotification(notif.id)}
                        style={{ fontSize: '.85rem' }}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card-panel p-3 mb-3">
            <h5 className="mb-3">Notification Settings</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                <span>Appointment Notifications</span>
              </label>
              <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                <span>Doctor Updates</span>
              </label>
              <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                <span>Patient Registration</span>
              </label>
              <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                <span>Billing Alerts</span>
              </label>
              <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                <span>System Messages</span>
              </label>
            </div>
            <button className="btn-primary-custom" style={{ width: '100%', marginTop: '20px', fontSize: '.85rem', padding: '8px' }}>
              Save Settings
            </button>
          </div>

          <div className="card-panel p-3">
            <h5 className="mb-3">Quick Stats</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--body-bg)', borderRadius: '6px' }}>
                <span style={{ fontSize: '.9rem' }}>Unread</span>
                <span style={{ fontWeight: '600', color: '#e74c3c' }}>{unreadCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--body-bg)', borderRadius: '6px' }}>
                <span style={{ fontSize: '.9rem' }}>Total</span>
                <span style={{ fontWeight: '600' }}>{notifications.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--body-bg)', borderRadius: '6px' }}>
                <span style={{ fontSize: '.9rem' }}>This Week</span>
                <span style={{ fontWeight: '600' }}>{notifications.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminNotifications;
