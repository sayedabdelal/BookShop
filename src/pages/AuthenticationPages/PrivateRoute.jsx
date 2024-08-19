import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = false; // Replace with your auth logic
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect the user to login and store the original path
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
