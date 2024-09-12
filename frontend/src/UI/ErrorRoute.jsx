import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorRoute.css'; // Import your CSS file for styling

function ErrorRoute() {
  return (
    <div className="error-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default ErrorRoute;
