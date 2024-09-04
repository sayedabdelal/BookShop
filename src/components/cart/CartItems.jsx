import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItemFromCart } from '../../store/cartSlice'; // Update import path if needed

function CartItems({ items }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (id, delta) => {
    if (delta > 0) {
      dispatch(increaseQuantity(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <div className="cart-items-section">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            
            <div className="item-image">
              <img src= {`/${item.imgSrc}`} alt={item.title} />
            </div>
            <div className="item-details">
              <div className="item-name">{item.title}</div>
              <div className="item-price">€{item.originalPrice}</div>
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
