import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { currentUser } = useUserContext();
    console.log('ProtectedRoute - currentUser:', currentUser);
    return currentUser ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
