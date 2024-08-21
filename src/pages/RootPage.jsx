import { Outlet, Link, useNavigate } from "react-router-dom";
import LI from "./Header/LI";
import "./Header/Header.css";
import Footer from "../components/Footer";

import { authActions } from '../store/auth';

import { useSelector, useDispatch } from 'react-redux';


function RootPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const handleLoginClick = () => {
    navigate("/user");
  };
  function handleLogot() {
    dispatch(authActions.logout());
  }



  return (
    <>
        <header className="header" id="header">
            <nav className="nav container">
            <Link to="/" className="nav__logo">
                <i className="ri-book-3-line" />
                E-Book
            </Link>
            <div className="nav__menu">
                <ul className="nav__list">
                <LI to="/" iconClass="ri-home-3-fill" text="Home" />
                <LI to="shop" iconClass="ri-shopping-bag-fill" text="Shop" />
                <LI
                    to="discount"
                    iconClass="ri-price-tag-3-line"
                    text="Discount"
                />
                
                <LI
                    to="testimonial"
                    iconClass="ri-message-3-line"
                    text="Testimonial"
                />
                </ul>
            </div>
            <div className="nav__actions">
                {/* search button */}
                <i className="ri-search-line search-button" id="search-btn" />
                {/* login button */}
                <i
                    className="ri-user-3-line login-button"
                    id="login-btn"
                    onClick={handleLoginClick}
                />
                
                {isAuth && ( <i
                    className="ri-logout-box-line"
                    id="logout-btn"
                    onClick={handleLogot}
                />
                )}
                {/* theme button */}
                <i className="ri-moon-line change-theme" id="theme-button" />
            </div>
            </nav>
        </header>

        <main className="main">
            <Outlet />
        
        </main>
        <Footer />
    </>
  );
}

export default RootPage;
