// SignupPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function SignupPage() {
  return (
    <>
    <div className="signup grid" id="signup-content">
  <form action="" className="signup__form grid">
    <h3 className="signup__title">Sign Up</h3>
    <div className="signup__group grid">
      <div>
        <label htmlFor="signup-name" className="signup__label">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="signup-input"
          id="signup-name"
        />
      </div>
      <div>
        <label htmlFor="signup-email" className="signup__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Write your email"
          className="signup-input"
          id="signup-email"
        />
      </div>
      <div>
        <label htmlFor="signup-pass" className="signup__label">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="signup-input"
          id="signup-pass"
        />
      </div>
    </div>
    <div>
      <span className="signup__login">
        Already have an account?{" "}
        <Link to="../login" id="log-in">
          Log In
        </Link>
      </span>
      <button type="submit" className="signup__button button">
        Sign Up
      </button>
    </div>
  </form>
  {/* <i className="ri-close-line signup__close" id="signup-close" /> */}
  <Link to='../' className='ri-close-line signup__close' id="signup-close"></Link>
</div>

    </>
  );
}

export default SignupPage;
