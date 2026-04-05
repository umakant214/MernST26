import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// General Pages
import GeneralHome from './components/general/GeneralHome';
import GeneralAbout from './components/general/GeneralAbout';
import GeneralContact from './components/general/GeneralContact';
import GeneralFaq from './components/general/GeneralFaq';
import GeneralGuidelines from './components/general/GeneralGuidelines';
import GeneralLogin from './components/general/GeneralLogin';
import GeneralNotices from './components/general/GeneralNotices';
import GeneralRegister from './components/general/GeneralRegister';

// Citizen Pages
import CitizenDashboard from './components/citizen/CitizenDashboard';
import CitizenFeedback from './components/citizen/CitizenFeedback';
import CitizenFile from './components/citizen/CitizenFile';
import CitizenHistory from './components/citizen/CitizenHistory';
import CitizenLogin from './components/citizen/CitizenLogin';
import CitizenNotifs from './components/citizen/CitizenNotifs';
import CitizenProfile from './components/citizen/CitizenProfile';
import CitizenTrack from './components/citizen/CitizenTrack';

// Dept Pages
import DeptDashboard from './components/dept/DeptDashboard';
import DeptComplaints from './components/dept/DeptComplaints';
import DeptResolve from './components/dept/DeptResolve';
import DeptComms from './components/dept/DeptComms';
import DeptLogin from './components/dept/DeptLogin';

// Admin Pages
import AdminDashboard from './components/admin/AdminDashboard';
import AdminComplaints from './components/admin/AdminComplaints';
import AdminDepartment from './components/admin/AdminDepartment';
import AdminUsers from './components/admin/AdminUsers';
import AdminNotifs from './components/admin/AdminNotifs';
import AdminAssign from './components/admin/AdminAssign';
import AdminLogin from './components/admin/AdminLogin';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* General Landing Page */}
        <Route path="/" element={<GeneralHome />} />
        
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/department" element={<DeptLogin />} />
        
        <Route path="/general-home" element={<GeneralHome />} />
        <Route path="/general-about" element={<GeneralAbout />} />
        <Route path="/general-contact" element={<GeneralContact />} />
        <Route path="/general-faq" element={<GeneralFaq />} />
        <Route path="/general-guidelines" element={<GeneralGuidelines />} />
        <Route path="/general-login" element={<GeneralLogin />} />
        <Route path="/general-notices" element={<GeneralNotices />} />
        <Route path="/general-register" element={<GeneralRegister />} />

        <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
        <Route path="/citizen-feedback" element={<CitizenFeedback />} />
        <Route path="/citizen-file" element={<CitizenFile />} />
        <Route path="/citizen-history" element={<CitizenHistory />} />
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/citizen-notifs" element={<CitizenNotifs />} />
        <Route path="/citizen-profile" element={<CitizenProfile />} />
        <Route path="/citizen-track" element={<CitizenTrack />} />

        <Route path="/dept-dashboard" element={<DeptDashboard />} />
        <Route path="/dept-complaints" element={<DeptComplaints />} />
        <Route path="/dept-resolve" element={<DeptResolve />} />
        <Route path="/dept-comms" element={<DeptComms />} />
        <Route path="/dept-login" element={<DeptLogin />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-complaints" element={<AdminComplaints />} />
        <Route path="/admin-department" element={<AdminDepartment />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-notifs" element={<AdminNotifs />} />
        <Route path="/admin-assign" element={<AdminAssign />} />
      </Routes>
    </Router>
  );
}

export default App;
