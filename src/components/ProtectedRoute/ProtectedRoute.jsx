import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, token, loading } = useAuth();
    const isAdminRoute = window.location.pathname.startsWith('/admin');

    if (loading) {
        return (
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className="premium-loader"></div>
                <p style={{marginTop: '20px', color: '#7c2d12', fontWeight: 500}}>Authenticating Heritage Session...</p>
            </div>
        );
    }

    // If it's an admin route and user is not admin OR not logged in, redirect to Home
    if (isAdminRoute && (!user || user.role !== 'admin')) {
        return <Navigate to="/" replace />;
    }

    // General protection for non-admin routes
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
