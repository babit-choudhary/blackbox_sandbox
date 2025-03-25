import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const location = useLocation();

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists
  };

  // Get user's role
  const getUserRole = () => {
    return localStorage.getItem('userRole') || '';
  };

  // Check if user has required role
  const hasRequiredRole = () => {
    const userRole = getUserRole();
    return roles ? roles.includes(userRole) : true;
  };

  if (!isAuthenticated()) {
    // Not logged in, redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRequiredRole()) {
    // Logged in but role not authorized, redirect to home page based on role
    const userRole = getUserRole();
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'vendor':
        return <Navigate to="/vendor" replace />;
      default:
        return <Navigate to="/customer/home" replace />;
    }
  }

  // Authorized, render component
  return children;
};

export default PrivateRoute;