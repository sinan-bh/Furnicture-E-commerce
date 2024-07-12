import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"))
    return  isAdmin ? Component : <Navigate to="/login" />
};

export default ProtectedRoute;
