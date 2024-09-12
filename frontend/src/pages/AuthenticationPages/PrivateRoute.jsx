import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';




const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  console.log("isAdmin", isAdmin);
  const navigate = useNavigate();
   
  const location = useLocation();
  useEffect(() => {
    // Save the isAuth value to local storage
    localStorage.setItem('isAuthenticated', isAdmin);
  }, [isAdmin]); // This will run every time isAuth changes
   
  if (!isAdmin) {
    // Redirect the user to login and store the original path
    return <Navigate to="/login" state={{ from: location }} />;
  }  

  return children;
};

export default PrivateRoute;
