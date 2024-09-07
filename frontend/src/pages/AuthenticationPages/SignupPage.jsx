import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NewUser, fetchUsers } from "../../util/http.js";

function SignupPage() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Fetch existing users
  // const { data: users = [] } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchUsers,
  // });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: NewUser,
    onSuccess: () => {
      // Clear form data on success
      setFormData({ name: "", email: "", password: "" });
      navigate("/login");
    },
  });
 
   

  function validateForm(data) {
    let formErrors = {};
    if (!data.name) formErrors.name = "Name is required";
    if (!data.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!data.password) {
      formErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      formErrors.password = "Password must be at least 8 characters long";
    } 
    return formErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate the form data
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Check if email already exists
    // const emailExists = users.some((user) => user.email === formData.email);
    // if (emailExists) {
    //   setErrors({ email: "Email is already registered" });
    //   return;
    // }

    // Send data to the server
    mutate({
      // id: Date.now().toString(), // Assign a unique ID
      name: formData.name,
      email: formData.email,
      password: formData.password,
      cart: [], // Empty cart by default
    });
  }

  return (
    <>
      <div className="signup grid" id="signup-content">
        <form
          onSubmit={handleSubmit}
          className="signup__form grid"
          aria-live="assertive"
        >
          <h3 className="signup__title">Sign Up</h3>
          <div className="signup__group grid">
            <div>
              <label htmlFor="signup-name" className="signup__label">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="signup-input"
                id="signup-name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div>
              <label htmlFor="signup-email" className="signup__label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Write your email"
                className="signup-input"
                id="signup-email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="signup-pass" className="signup__label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="signup-input"
                id="signup-pass"
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>
          <div>
            <span className="signup__login">
              Already have an account?{" "}
              <Link to="../login" id="log-in">
                Log In
              </Link>
            </span>
            <button
              type="submit"
              className="signup__button button"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          {isError && (
            <div className="error">{error.message}</div>
          )}
        </form>
        <Link
          to="../"
          className="ri-close-line signup__close"
          id="signup-close"
        ></Link>
      </div>
    </>
  );
}

export default SignupPage;
