import React, { useState } from 'react';
import Modal from '../../UI/Modal';  
import './CheckoutModal.css'; // Adjust the path as needed
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { submitCheckout } from '../../util/http';
import { clearCart } from '../../store/cartSlice';


export default function CheckoutModal({ onClose }) {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items); 
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    cardNumber: '',
    cardholderName: '',
    phone: '',
    cvv: '',
    expiryDate: '',
  });

  const [errors, setErrors] = useState({});

  // Define the mutation using useMutation
  const mutation = useMutation({
    mutationFn: () => submitCheckout(formData, cartItems),
    onSuccess: (data) => {
      console.log('Checkout successful:', data);
      // Optionally reset the form or close the modal here
      dispatch(clearCart());
      onClose();
    },
    onError: (error) => {
      console.error('Checkout failed:', error);
      // Handle error feedback here
    }
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    // Validate expiry date in real-time
    if (name === 'expiryDate') {
      validateExpiryDate(value);
    }
  };

  // Validate expiry date format
  const validateExpiryDate = (value) => {
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!expiryDatePattern.test(value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        expiryDate: 'Expiry date must be in MM/YYYY format',
      }));
    } else {
      const [month, year] = value.split('/');
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed

      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          expiryDate: 'Expiry date must be in the future',
        }));
      } else {
        setErrors(prevErrors => {
          const { expiryDate, ...rest } = prevErrors;
          return rest; // Remove expiryDate error if validation passes
        });
      }
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.cardNumber || !/^\d{14}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Card number is required and must be 14 digits';
    }
    if (!formData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    // if (!formData.phone || !/^\d+$/.test(formData.phone)) {
    //   newErrors.phone = 'Phone is required and must be a valid number';
    // }
    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV is required and must be 3 or 4 digits';
    }
    if (!formData.expiryDate || errors.expiryDate) {
      newErrors.expiryDate = errors.expiryDate || 'Expiry date is required';
    }
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

    // Trigger the mutation
    mutation.mutate();
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

          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}

          <label htmlFor="cardholderName">Cardholder Name:</label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleChange}
          />
          {errors.cardholderName && <p className="error-message">{errors.cardholderName}</p>}

          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
          />
          {errors.cvv && <p className="error-message">{errors.cvv}</p>}

          <label htmlFor="expiryDate">Expiry Date (MM/YYYY):</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
          {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}

          <button type="submit" className="submit-btn" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Submitting...' : 'Submit'}
          </button>
          {mutation.isError && <p className="error-message">Submission failed. Please try again.</p>}
        </form>
      </div>
    </Modal>
  );
}
