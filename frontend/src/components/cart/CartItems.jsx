import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItemFromCart, fetchCartItems } from '../../store/cartSlice'; // Ensure correct import path
import { useMutation } from '@tanstack/react-query';
import { addRemoveCart } from '../../util/http';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartItems({ itemsCart }) {
  const dispatch = useDispatch();

  // Mutation function for adding/removing cart items
  const cartMutation = useMutation({
    mutationFn: ({ action, productId, quantity, cartItemId }) =>
      addRemoveCart({ action, productId, quantity, cartItemId }),
    onSuccess: (response) => {
      if (response && response.new_cart_item_id) {
        dispatch(addItemToCart({ ...response.product, id: response.shopId, cartItemId: response.new_cart_item_id }));
        
      } else {
        toast.info('Item removed from cart.', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
        
        dispatch(fetchCartItems());
        
      }
    },
    onError: (error) => {
      toast.error(`Failed to 'remove' item to cart. Please try again.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    },
  });

  const handleQuantityChange = (id, delta) => {
    if (delta > 0) {
      dispatch(increaseQuantity(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const handleRemoveItem = (id) => {
    const cartItem = itemsCart.find(item => item.id === id);
    if (cartItem) {
      const { cartItemId } = cartItem;
      // dispatch(removeItemFromCart(id));
      cartMutation.mutate({ action: 'remove', cartItemId });
    }
  };

  return (
    <div className="cart-items-section">
      
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {itemsCart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={`/${item.image}`} alt={item.title} />
            </div>
            <div className="item-details">
              <div className="item-name">{item.title}</div>
              <div className="item-price">€{item.price}</div>
              <div className="item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="remove-item-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
       
    </div>
  );
}

export default CartItems;
