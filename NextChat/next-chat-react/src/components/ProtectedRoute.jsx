import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
        return <Navigate to={isAdmin ? "/admin/login" : "/login"} />;
    }

    if (isAdmin && !userInfo.isAdmin) {
        return <Navigate to="/user/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
