import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CartSummary({ subtotal, shipping, total }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const openModal = () => {
    if (isAuth) {
      setModalOpen(true);
    } else {
      navigate('/login'); // Redirect to login page
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="cart-summary-section">
      <div className="cart-summary">
        <h3 className="summary-title">Order Summary</h3>
        <div className="summary-item">
          <span className="summary-label">Subtotal:</span>
          <span className="summary-value">€{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Shipping:</span>
          <span className="summary-value">€{shipping.toFixed(2)}</span>
        </div>
        <div className="summary-item total">
          <span className="summary-label">Total:</span>
          <span className="summary-value">€{total.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={openModal}>Proceed to Checkout</button>
        
        {/* Render Modal */}
        {isModalOpen && (
        <CheckoutModal onClose={closeModal} />
        )}
      </div>
    </div>
  );
}

export default CartSummary;
