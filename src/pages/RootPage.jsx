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
    // Access the cart state from Redux
    const cartItems = useSelector(state => state.cart.items);
    // Calculate the total number of items in the cart
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Access the wishlist state from Redux
    const wishlistItems = useSelector(state => state.wishlist.items);
    // Calculate the total number of items in the wishlist
    const totalWishlistItems = wishlistItems.length;

    const handleLoginClick = () => {
        navigate("/user");
    };
    function handleLogot() {
        dispatch(authActions.logout());
        // Remove the isAuth value from local storage
        localStorage.removeItem('isAuthenticated');
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
                        <Link to='shop/cart' className="icon-wrapper">
                            <i className="ri-shopping-cart-line cart-icon" />
                            <span className="icon-number" id="cart-number">
                                {totalItems}
                            </span>
                        </Link>

                        {/* Wishlist Icon */}
                        <Link  to='shop/wishlist' className="icon-wrapper">
                            <i className="ri-heart-line wishlist-icon" />
                            <span className="icon-number wish" id="wishlist-number">
                                {totalWishlistItems}
                            </span>
                        </Link>

                        {/* login button */}
                        <i
                            className="ri-user-3-line login-button"
                            id="login-btn"
                            onClick={handleLoginClick}
                        />

                        {isAuth && (<i
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
