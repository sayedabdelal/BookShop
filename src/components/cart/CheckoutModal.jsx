import React, { useState } from 'react';
import Modal from '../../UI/Modal';  
import './CheckoutModal.css'; // Adjust the path as needed
import { useSelector } from 'react-redux';

export default function CheckoutModal({ onClose }) {

  const cartItems = useSelector(state => state.cart.items); 
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    cardNumber: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If no errors, print form data to console
    console.log('Form Data:', formData);
    

    // Optionally, you can reset the form or close the modal here
    onClose();
  };

  return (
    <Modal title="Checkout" onClose={onClose}>
      <div className="checkout-modal-content">
        <h3>Complete Your Purchase</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error-message">{errors.city}</p>}

          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </Modal>
  );
}
