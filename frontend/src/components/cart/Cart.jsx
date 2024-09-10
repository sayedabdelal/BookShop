import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItems from './CartItems';
import CartSummary from './CartSummary';
import { updateQuantity, removeItemFromCart, fetchCartItems, clearCart } from '../../store/cartSlice'; // Ensure the correct import path
import './cart.css';
import LoadingIndicator from '../../UI/LoadingIndicator';
import { ToastContainer } from 'react-toastify';

function Cart() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const { items, status, error } = useSelector((state) => state.cart);
  let allBooks = [];

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (!isAuth) {
      console.log('clear cart');
      dispatch(clearCart());
    }
  }, [isAuth, dispatch]);

  if (status === 'loading') {
    return <LoadingIndicator />;
  }

  if (status === 'failed') {
    console.log('cart error');
    return <p>Error fetching cart: {error}</p>;
  }

  if (status === 'succeeded') {
    allBooks = items.map(item => ({
      ...item.book,       // Assuming 'book' contains book details
      quantity: item.quantity || 0, // Add the quantity to the book details
      cartItemId: item?.id || null,
    }));
  }

  const handleQuantityChange = (id, delta) => {
    dispatch(updateQuantity({ id, delta }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const subtotal = allBooks.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
  const shipping = 5.00; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="cart-container">
      <ToastContainer />
      <CartItems
        itemsCart={allBooks}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
      />
      <CartSummary subtotal={subtotal} shipping={shipping} total={total} />
    </div>
  );
}

export default Cart;
