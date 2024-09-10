import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { resetEmail } from '../../util/http';

import './ForgotPassword.css';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // State for message
  const navigate = useNavigate(); // Hook for navigation

  const mutation = useMutation({
    mutationFn: ({ email, password }) => resetEmail(email, password),
    onSuccess: (data) => {
      console.log('Data:', data);
      setMessage(data.message || 'Password reset successful!');
      // Redirect to /home after setting the message
      setTimeout(() => navigate('/login'), 1000); // Added timeout for message display
    },
    onError: (error) => {
      console.error('Error:', error);
      setMessage(error.message || 'An error occurred');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validations
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    mutation.mutate({ email, password });
  };

  return (
    <div className="forgot-password-container grid" id="forgot-password-content">
      <form onSubmit={handleSubmit} className="forgot-password__form grid">
        <h3 className="forgot-password__title">Reset Password</h3>
        <div className="forgot-password__group grid">
          <div>
            <label htmlFor="email" className="forgot-password__label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-password-input"
              required
            />
            {mutation.isError && <span className="error">{message}</span>}
          </div>
          <div>
            <label htmlFor="password" className="forgot-password__label">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="forgot-password-input"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="forgot-password__label">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="forgot-password-input"
              required
            />
          </div>
        </div>
        <button type="submit" className="forgot-password__button button" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
        {mutation.isSuccess && <p className="success">{message}</p>}
      </form>
      <Link to="/" className="ri-close-line forgot-password__close" id="forgot-password-close"></Link>
    </div>
  );
}

export default ForgotPassword;
