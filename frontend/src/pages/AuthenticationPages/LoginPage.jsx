import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { fetchUsers, logoutUser} from "../../util/http";
import "./log.css";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { clearCart, fetchCartItems } from '../../store/cartSlice';
import { clearWishList, fetchWishlist } from "../../store/wishlistSlice";
import { clearUserId } from "../../store/userSlice";



function LoginPage() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const isAuth = useSelector(state=> state.auth.isAuthenticated);
  console.log(isAdmin, isAuth)

  const loginMutation = useMutation({
    mutationFn: (userData) => fetchUsers(userData, dispatch),
    onSuccess: (data) => {
       
      if (data.message === 'Login successful!') {
          if(data.admin){ 
            dispatch(authActions.setAdmin(true));
          } else {
            dispatch(fetchCartItems());
            dispatch(fetchWishlist());
            console.log('Login successful');
            console.log("data", data);
            // dispatch(authActions.login(data.user_id));
            dispatch(authActions.login());
          }
          
          
        
         
        navigate("/");
      } else {
        setErrors({ email: data.error });
      }
    },
    onError: (error) => {
      setErrors({ email: error.message });
    }
  });

  const mutateLogout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {

        console.log('Logout successful');
        // dispatch(fetchWishlist());
        dispatch(clearCart());
        dispatch(clearWishList());
        // Dispatch Redux action to update auth state
        dispatch(authActions.logout());

        // Remove the isAuth value from local storage
        localStorage.removeItem('isAuthenticated');
        dispatch(clearUserId());
        // dispatch(fetchCartItems());

        // Optionally redirect to the home page or login page
        navigate('/login');
    },
    onError: (error) => {
        console.error('Logout failed:', error);
        alert('Failed to log out. Please try again.');
    }
});

  function validateLogin(data) {
    let formErrors = {};
    if (!data.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!data.password) {
      formErrors.password = "Password is required";
    }
    return formErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const formErrors = validateLogin(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    if (isAdmin || isAuth) {
      console.log('isAdmin logggouttttttttttttt', isAdmin);
      mutateLogout.mutate();
    }
    console.log('data otttttttttttttt');
    // dispatch(clearCart());
    // dispatch(clearWishList());
    // dispatch(clearUserId());
    // dispatch(authActions.logout())

    loginMutation.mutate(data);
  }

 

 

  

  return (
    <div className="login grid" id="login-content">
      <form onSubmit={handleSubmit} className="login__form grid">
        <h3 className="login__title">Log In</h3>
        <div className="login__group grid">
          <div>
            <label htmlFor="login-email" className="login__label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Write your email"
              className="login-input"
              id="login-email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="login-pass" className="login__label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              id="login-pass"
              className="login-input"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
        </div>
        <div>
          <span className="login__signup">
            Don't have an account? <Link to="../signup" id="sign-up">Sign Up</Link>
          </span>
          <Link to="/forgot-password" className="login__forgot">Forgot your password?</Link>
          <button type="submit" className="login__button button">Log In</button>
        </div>
      </form>
     

      <Link to="../" className="ri-close-line login__close" id="login-close"></Link>
    </div>
  );
}

export default LoginPage;
