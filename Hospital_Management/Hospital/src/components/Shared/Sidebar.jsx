import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ zone }) => {
  const location = useLocation();

  const sidebars = {
    admin: {
      avatar: 'AD',
      name: 'Admin User',
      role: 'Super Administrator',
      icon: 'bi-hospital',
      label: 'Admin Zone',
      sections: [
        {
          title: 'Main Menu',
          links: [
            { href: '/admin/dashboard', icon: 'bi-grid-fill', label: 'Dashboard' },
            { href: '/admin/appointments', icon: 'bi-calendar-check-fill', label: 'Appointments', badge: '24' },
            { href: '/admin/schedule', icon: 'bi-calendar3', label: 'Doctor Schedules' },
          ]
        },
        {
          title: 'Management',
          links: [
            { href: '/admin/users', icon: 'bi-people-fill', label: 'User Management' },
            { href: '/admin/departments', icon: 'bi-building', label: 'Departments' },
            { href: '/admin/billing', icon: 'bi-receipt', label: 'Billing & Services' },
            { href: '/admin/bill-generate', icon: 'bi-file-earmark-plus-fill', label: 'Generate Bill' },
            { href: '/admin/analytics', icon: 'bi-bar-chart-fill', label: 'Reports & Analytics' },
            { href: '/admin/notifications', icon: 'bi-bell-fill', label: 'Notifications', badge: '5' },
          ]
        },
        {
          title: 'System',
          links: [
            { href: '#', icon: 'bi-gear-fill', label: 'Settings' },
            { href: '/', icon: 'bi-box-arrow-right', label: 'Logout' },
          ]
        },
      ]
    },
    doctor: {
      avatar: 'DR',
      name: 'Dr. Anjali Sharma',
      role: 'Cardiologist',
      icon: 'bi-heart-pulse-fill',
      label: 'Doctor Zone',
      sections: [
        {
          title: 'Overview',
          links: [
            { href: '/doctor/dashboard', icon: 'bi-grid-fill', label: 'Dashboard' },
            { href: '/doctor/appointments', icon: 'bi-calendar-check-fill', label: 'Appointments', badge: '7' },
            { href: '/doctor/schedule', icon: 'bi-calendar3', label: 'My Schedule' },
          ]
        },
        {
          title: 'Patient Care',
          links: [
            { href: '/doctor/prescriptions', icon: 'bi-prescription2', label: 'Prescriptions' },
            { href: '/doctor/chat', icon: 'bi-chat-dots-fill', label: 'Chat', badge: '3' },
          ]
        },
        {
          title: 'System',
          links: [
            { href: '#', icon: 'bi-gear-fill', label: 'Settings' },
            { href: '/', icon: 'bi-box-arrow-right', label: 'Logout' },
          ]
        },
      ]
    },
    patient: {
      avatar: 'PT',
      name: 'Patient User',
      role: 'Patient',
      icon: 'bi-person-heart',
      label: 'Patient Zone',
      sections: [
        {
          title: 'Overview',
          links: [
            { href: '/patient/dashboard', icon: 'bi-grid-fill', label: 'Dashboard' },
            { href: '/patient/book-appointment', icon: 'bi-calendar-plus', label: 'Book Appointment' },
            { href: '/patient/appointments', icon: 'bi-calendar-check-fill', label: 'My Appointments' },
          ]
        },
        {
          title: 'Health Records',
          links: [
            { href: '/patient/prescriptions', icon: 'bi-prescription2', label: 'Prescriptions' },
            { href: '/patient/chat', icon: 'bi-chat-dots-fill', label: 'Chat', badge: '2' },
          ]
        },
        {
          title: 'Account',
          links: [
            { href: '#', icon: 'bi-gear-fill', label: 'Settings' },
            { href: '/', icon: 'bi-box-arrow-right', label: 'Logout' },
          ]
        },
      ]
    }
  };

  const sidebarData = sidebars[zone];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className={`bi ${sidebarData.icon}`}></i>
        </div>
        <div className="logo-text">HOPES</div>
        <div className="zone-label">{sidebarData.label}</div>
      </div>

      {sidebarData.sections.map((section, index) => (
        <div key={index}>
          <div className="sidebar-section-title">{section.title}</div>
          <ul className="sidebar-nav">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  to={link.href}
                  className={`nav-link ${location.pathname === link.href ? 'active' : ''}`}
                >
                  <i className={`bi ${link.icon}`}></i>
                  <span>{link.label}</span>
                  {link.badge && <span className="badge-count">{link.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="sidebar-footer">
        <div className="user-mini">
          <div className="avatar">{sidebarData.avatar}</div>
          <div className="info">
            <div className="name">{sidebarData.name}</div>
            <div className="role">{sidebarData.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;