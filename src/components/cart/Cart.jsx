import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItems from './CartItems';
import CartSummary from './CartSummary';
import { updateQuantity, removeItemFromCart } from '../../store/cartSlice'; // Ensure the correct import path
import './cart.css';

function Cart() {
    const cartItems = useSelector(state => state.cart.items); // Accessing cart items from Redux store
    const dispatch = useDispatch();
  
    // Function to handle quantity change
    const handleQuantityChange = (id, delta) => {
      dispatch(updateQuantity({ id, delta }));
    };
  
    // Function to remove item from cart
    const handleRemoveItem = id => {
      dispatch(removeItemFromCart(id));
    };
  
    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
    const shipping = 5.00; // Example shipping cost
    const total = subtotal + shipping;
  
    return (
      <div className="cart-container">
        <CartItems
          items={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
          
        />
        <CartSummary subtotal={subtotal} shipping={shipping} total={total} />
      </div>
    );
  }
  
  export default Cart;
  

/*
cart number > 10
stockQuantity > 10

click + >> requset -> id
click - >> requset -> 

click remove >> requset -> cartitemid

btn delet -- all 




*/