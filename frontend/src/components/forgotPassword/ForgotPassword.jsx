import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { requestResetToken, resetPassword } from '../../util/http'; // Separate functions for different requests
import './ForgotPassword.css';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState(null); // State to store the reset token
  const [message, setMessage] = useState(''); // State for message
  const navigate = useNavigate(); // Hook for navigation

  // Mutation for requesting a reset token
  const requestTokenMutation = useMutation({
    mutationFn: (email) => requestResetToken(email),
    onSuccess: (data) => {
      console.log('Token:', data.reset_token);
      setToken(data.reset_token); // Store the token in state
      setMessage('Token generated! Now reset your password.');
    },
    onError: (error) => {
      console.error('Error:', error);
      setMessage(error.message || 'An error occurred while requesting token');
    },
  });

  // Mutation for resetting the password
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }) => resetPassword(token, password),
    onSuccess: (data) => {
      console.log('Data:', data);
      setMessage(data.message || 'Password reset successful!');
      // Redirect to /login after setting the message
      setTimeout(() => navigate('/login'), 1000); // Added timeout for message display
    },
    onError: (error) => {
      console.error('Error:', error);
      setMessage(error.message || 'An error occurred while resetting password');
    },
  });

  const handleRequestToken = (e) => {
    e.preventDefault();
    console.log('Requesting token for:', email);
    requestTokenMutation.mutate(email);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Basic validations
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!token) {
      alert('Please request a reset token first.');
      return;
    }

    console.log('Resetting password with token:', token);
    resetPasswordMutation.mutate({ token, password });
  };

  return (
    <div className="forgot-password-container grid" id="forgot-password-content">
      {!token ? (
        // Phase 1: Request Reset Token
        <form onSubmit={handleRequestToken} className="forgot-password__form grid">
          <h3 className="forgot-password__title">Request Password Reset</h3>
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
              {requestTokenMutation.isError && <span className="error">{message}</span>}
            </div>
          </div>
          <button type="submit" className="forgot-password__button button" disabled={requestTokenMutation.isLoading}>
            {requestTokenMutation.isLoading ? 'Requesting Token...' : 'Request Reset Password'}
          </button>
        </form>
      ) : (
        // Phase 2: Reset Password
        <form onSubmit={handleResetPassword} className="forgot-password__form grid">
          <h3 className="forgot-password__title">Reset Password</h3>
          <div className="forgot-password__group grid">
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
          <button type="submit" className="forgot-password__button button" disabled={resetPasswordMutation.isLoading}>
            {resetPasswordMutation.isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
          {resetPasswordMutation.isSuccess && <p className="success">{message}</p>}
        </form>
      )}
      <Link to="/" className="ri-close-line forgot-password__close" id="forgot-password-close"></Link>
    </div>
  );
}

export default ForgotPassword;
