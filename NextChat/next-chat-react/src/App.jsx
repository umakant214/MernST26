import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SharedHeader from './components/SharedHeader';
import Navbar from './components/General/Navbar';
import Footer from './components/General/Footer';
import Home from './components/General/Home';
import About from './components/General/About';
import Help from './components/General/Help';
import Contact from './components/General/Contact';
import Login from './components/General/Login';
import Register from './components/General/Register';
import AdminSidebar from './components/Admin/AdminSidebar';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserManagement from './components/Admin/UserManagement';
import AdminRooms from './components/Admin/AdminRooms';
import AdminLogin from './components/Admin/AdminLogin';
import UserSidebar from './components/User/UserSidebar';
import ChatPanel from './components/User/ChatPanel';
import GroupsPanel from './components/User/GroupsPanel';
import CallsPanel from './components/User/CallsPanel';
import UserDashboard from './components/User/UserDashboard';
import UserLogin from './components/User/UserLogin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);

  const isAdminZone = location.pathname.startsWith('/admin') && !['/admin/login', '/adminlogin'].includes(location.pathname);
  const isUserZone = location.pathname.startsWith('/user') && location.pathname !== '/user/login';
  const isGeneralZone = !isAdminZone && !isUserZone && !['/admin/login', '/adminlogin', '/user/login'].includes(location.pathname);

  const toggleNotif = () => setNotifOpen(!notifOpen);

  const getHeaderInfo = () => {
    if (isAdminZone) {
      const titles = {
        '/admin': { title: 'Dashboard', sub: 'Welcome back, Super Admin' },
        '/admin/users': { title: 'User Management', sub: 'Manage system users' },
        '/admin/rooms': { title: 'Groups & Rooms', sub: 'Manage chat rooms' },
        '/admin/login': { title: 'Admin Sign In', sub: 'Authorised personnel only' }
      };
      return { ...(titles[location.pathname] || { title: 'Admin Panel', sub: 'Management' }), type: 'admin' };
    }
    if (isUserZone) {
      const titles = {
        '/user': { title: 'Messages', sub: 'Stay connected' },
        '/user/dashboard': { title: 'Dashboard', sub: 'Welcome back, Jane!' },
        '/user/groups': { title: 'Groups', sub: 'Manage your rooms' },
        '/user/calls': { title: 'Calls', sub: 'Stay connected' },
        '/user/login': { title: 'Sign In', sub: 'Welcome back' }
      };
      return { ...(titles[location.pathname] || { title: 'User Panel', sub: 'Messages' }), type: 'user' };
    }
    return null;
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="nc-app">
      {isGeneralZone && <Navbar />}

      <div className={isAdminZone || isUserZone ? 'd-flex' : ''}>
        {isAdminZone && <AdminSidebar />}
        {isUserZone && <UserSidebar />}

        <div className={(isAdminZone || isUserZone) ? 'nc-main flex-grow-1' : ''}>
          {(isAdminZone || isUserZone) && headerInfo && (
            <SharedHeader 
              title={headerInfo.title} 
              sub={headerInfo.sub} 
              type={headerInfo.type} 
              onToggleNotif={toggleNotif}
              notifOpen={notifOpen}
            />
          )}

          <Routes>
            {/* General Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute isAdmin><AdminDashboard isShared /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute isAdmin><UserManagement isShared /></ProtectedRoute>} />
            <Route path="/admin/rooms" element={<ProtectedRoute isAdmin><AdminRooms isShared /></ProtectedRoute>} />
            <Route path="/admin/login" element={<AdminLogin isShared />} />
            <Route path="/adminlogin" element={<AdminLogin isShared />} />

            {/* User Routes */}
            <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard isShared /></ProtectedRoute>} />
            <Route path="/user" element={<ChatPanel isShared />} />
            <Route path="/user/groups" element={<GroupsPanel isShared />} />
            <Route path="/user/calls" element={<CallsPanel isShared />} />
            <Route path="/user/login" element={<UserLogin isShared />} />
          </Routes>
        </div>
      </div>

      {isGeneralZone && <Footer />}
    </div>
  );
}

export default App;
