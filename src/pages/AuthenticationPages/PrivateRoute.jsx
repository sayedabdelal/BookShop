import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
 

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  
  const location = useLocation();
  useEffect(() => {
    // Save the isAuth value to local storage
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuth));
}, [isAuth]); // This will run every time isAuth changes

  if (!isAuth) {
    // Redirect the user to login and store the original path
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
