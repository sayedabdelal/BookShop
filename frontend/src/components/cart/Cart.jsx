import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItems from './CartItems';
import CartSummary from './CartSummary';
import { updateQuantity, removeItemFromCart, fetchCartItems, clearCart } from '../../store/cartSlice'; // Ensure the correct import path
import './cart.css';
import LoadingIndicator from '../../UI/LoadingIndicator';
import { ToastContainer } from 'react-toastify';
import { use } from 'framer-motion/client';

function Cart() {
 
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // console.log("items",cartItems)

  
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  // Extracting items, status, and error from the cart state
  const { items, status, error } = useSelector((state) => state.cart);
  // console.log('items:', items);
  let allBooks = [];
 
  if (!isAuth) {
    useEffect(() => { 
      console.log('clear cart');
      dispatch(clearCart());
     
        
    }, [isAuth]);

    // dispatch(fetchCartItems());
  }

  useEffect(() => {
    
    // Fetch cart items when the component mounts
    {isAuth && dispatch(fetchCartItems()) }
     
  }, [dispatch]);


  // Handling loading and error states
  if (status === 'loading') {
    return <LoadingIndicator />;
    
  }

  if (status === 'failed') {
    console.log('cart error');
    return <p>Error fetching cart: {error}</p>;
  }

 
  // Log the current state of cart items
  // console.log('cartItems from Redux:', items);

  // Prepare the list of books with quantities


  if (status === 'succeeded') {
    allBooks = items.map(item => ({
      ...item.book,       // Assuming 'book' contains book details
      quantity: item.quantity || 0, // Add the quantity to the book details
      cartItemId: item?.id || null,
    }));
  }

  // Log the merged book list
  // console.log('allBooks:', allBooks);

  // Function to handle quantity change (increment/decrement)
  const handleQuantityChange = (id, delta) => {
    dispatch(updateQuantity({ id, delta }));
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  // Calculate the subtotal
  const subtotal = allBooks.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
  const shipping = 5.00; // Example shipping cost
  const total = subtotal + shipping;

  // Log the calculated subtotal and total
  // console.log('subtotal:', subtotal);
  // console.log('total:', total);

  return (
    <div className="cart-container">
      <ToastContainer />
      {/* Render CartItems with the list of books, quantity change, and remove item handlers */}
      <CartItems
        
        itemsCart={allBooks} // Passing the prepared books with quantities
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}

      />
     
      {/* Render CartSummary with subtotal, shipping, and total */}
      <CartSummary subtotal={subtotal} shipping={shipping} total={total} />
    </div>
  );
}

export default Cart;
