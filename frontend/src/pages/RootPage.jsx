import { Outlet, Link, useNavigate } from "react-router-dom";
import LI from "./Header/LI";
import "./Header/Header.css";
import Footer from "../components/Footer";

import { authActions } from '../store/auth';
import { logoutUser, fetchCarts } from "../util/http";

import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueries } from "@tanstack/react-query";
import { fetchCartItems } from '../store/cartSlice';
import { useEffect } from "react";
import { clearUserId } from "../store/userSlice";
import { fetchWishlist } from "../store/wishlistSlice";

import DarkModeToggle from "../UI/DarkModeToggle";




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

    const darkMode = useSelector((state) => state.theme.darkMode);
console.log('ROOOOOOOt', darkMode);

useEffect(() => {
  // Apply or remove the 'dark-theme' class based on darkMode state
  if (darkMode) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}, [darkMode]);


    useEffect(() => {
        if (isAuth) {
            dispatch(fetchCartItems());
            dispatch(fetchWishlist());
        }
    }, [dispatch, isAuth])





    const handleLoginClick = () => {
        navigate("/user");
    };

    // Use React Query's useMutation to handle logout
    const mutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            // Dispatch Redux action to update auth state
            dispatch(authActions.logout());

            // Remove the isAuth value from local storage
            localStorage.removeItem('isAuthenticated');
            dispatch(clearUserId());

            // Optionally redirect to the home page or login page
            navigate('/login');
        },
        onError: (error) => {
            console.error('Logout failed:', error);
            alert('Failed to log out. Please try again.');
        }
    });

    function handleLogot() {
        // dispatch(authActions.logout());
        // // Remove the isAuth value from local storage
        // localStorage.removeItem('isAuthenticated');
        // dispatch(authActions.logout());
        mutation.mutate();
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
                        <Link to='shop/wishlist' className="icon-wrapper">
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
                        <DarkModeToggle />
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
