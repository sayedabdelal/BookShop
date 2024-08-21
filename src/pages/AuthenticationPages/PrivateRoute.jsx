import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();
  

  if (!isAuth) {
    // Redirect the user to login and store the original path
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
