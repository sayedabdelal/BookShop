import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { resetPassword } from '../../util/http'; // Your actual API function for resetting password
import './RestPassword.css'; // Ensure the CSS file exists and is correctly referenced

function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // Separate error state for clarity
    const { token } = useParams();
  const navigate = useNavigate();
    console.log("toke",token);
    

  
     // Delay rendering for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

 

  // Mutation for password reset
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }) => resetPassword(token, password),
    onSuccess: (data) => {
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    },
    onError: (error) => {
      setError(error.message || 'An error occurred while resetting the password.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Clear previous errors and trigger mutation
    setError('');
    console.log("token",token,'\n', 'pass',password);
    resetPasswordMutation.mutate({ token, password });
  };

  return (
    
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password__form">
        <h3>Reset Your Password</h3>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={resetPasswordMutation.isLoading}>
          {resetPasswordMutation.isLoading ? 'Resetting...' : 'Reset Password'}
        </button>

        {/* Success or Error Message */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
      <Link
          to="../"
          className="ri-close-line signup__close"
          id="signup-close"
        ></Link>
    </div>
  );
}

export default ResetPasswordPage;
