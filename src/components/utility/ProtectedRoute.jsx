import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ allowedRoles }) {
    let { user } = useAuth();
    const location = useLocation();
    return (
        user?.email ? (
            allowedRoles.includes(user.role) ? < Outlet /> : <Navigate to="/unauthorise" state={{ from: location }} replace />
        ) : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoute;
