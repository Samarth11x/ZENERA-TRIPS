import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleRoute = ({ children, allowedRoles = [] }) => {
    const { user, isAuthenticated, role } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // Redirect to home if user doesn't have the required role
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RoleRoute;
