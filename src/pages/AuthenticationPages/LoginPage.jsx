// LoginPage.js
 
import './log.css'
import { Link } from 'react-router-dom';
function LoginPage() {
  return (
    <>
  {/*==================== LOGIN ====================*/}
  <div className="login grid" id="login-content">
    <form action="" className="login__form grid">
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
        </div>
        <div>
          <label htmlFor="login-pass" className="login__label">
            Password
          </label>
          <input
            type="password"
            name="email"
            placeholder="Enter your Password"
            id="login-pass"
            className="login-input"
          />
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
          Did you forgot your password?
        </a>
        <button type="submit" className="login__button button">
          Log In
        </button>
      </div>
    </form>
    {/* <i className="ri-close-line login__close" id="login-close" /> */}
    <Link to="../" className='ri-close-line login__close' id="login-close" ></Link>
  </div>
</>

  );
}

export default LoginPage;

