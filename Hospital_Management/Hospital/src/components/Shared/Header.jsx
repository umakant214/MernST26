import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ zone, pageTitle }) => {

  const profiles = {
    admin: { avatar: 'AD', name: 'Admin User', role: 'Super Administrator' },
    doctor: { avatar: 'DR', name: 'Dr. Anjali Sharma', role: 'Cardiologist' },
    patient: { avatar: 'PT', name: 'Patient User', role: 'Patient' }
  };

  const profile = profiles[zone] || profiles.admin;

  return (
    <nav className="top-header navbar navbar-light bg-white shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <Link className="navbar-brand d-flex align-items-center gap-2 m-0" to={`/${zone}/dashboard`}>
            <div className="logo-icon">
              <i className="bi bi-grid-fill"></i>
            </div>
            <div>
              <div className="brand-title">HOPES System</div>
              <div className="brand-subtitle">{pageTitle || 'Dashboard'}</div>
            </div>
          </Link>
        </div>
        <ul className="navbar-nav align-items-center gap-2 m-0">
          <li className="nav-item dropdown">
            <a className="profile-btn nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <div className="avatar">{profile.avatar}</div>
              <div className="info">
                <div className="name">{profile.name}</div>
                <div className="role">{profile.role}</div>
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="/">Logout</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;