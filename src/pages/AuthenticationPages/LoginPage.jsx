import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../util/http.js"; // Assume this fetches users from the server or local storage
import "./log.css";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth.js';

function LoginPage() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Fetch existing users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
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

    // Validate the form data
    const formErrors = validateLogin(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Check if email and password match any user
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (!user) {
      setErrors({ email: "Invalid email or password" });
      return;
    }
    dispatch(authActions.login());
    // If successful, navigate to the user's page
    navigate("/user");
  }

  return (
    <>
      {/*==================== LOGIN ====================*/}
      <div className="login grid" id="login-content">
        <form onSubmit={handleSubmit} className="login__form grid">
          <h3 className="login__title">Log In</h3>
          <div className="login__group grid">
            <div>
              <label htmlFor="login-email" className="login__label">
                Email
              </label>
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
              <label htmlFor="login-pass" className="login__label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                id="login-pass"
                className="login-input"
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>
          <div>
            <span className="login__signup">
              Are you dont have an account?
              <Link to="../signup" id="sign-up">
                Sign Up
              </Link>
            </span>
            <a href="#" className="login__forgot">
              Did you forget your password?
            </a>
            <button type="submit" className="login__button button">
              Log In
            </button>
          </div>
        </form>
        <Link
          to="../"
          className="ri-close-line login__close"
          id="login-close"
        ></Link>
      </div>
    </>
  );
}

export default LoginPage;
