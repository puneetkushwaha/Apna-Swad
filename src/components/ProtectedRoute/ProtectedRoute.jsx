import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, token, loading } = useAuth();

    if (loading) {
        return (
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className="premium-loader"></div>
                <p style={{marginTop: '20px', color: '#7c2d12', fontWeight: 500}}>Authenticating Heritage Session...</p>
            </div>
        );
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
