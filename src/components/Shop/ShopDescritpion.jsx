import React from 'react'
import {  useParams } from 'react-router-dom'
import NewImg1 from '../../assets/img/discount-book-2.png';
import './ShopDescritpion.css'
export default function ShopDescritpion() {
   
    
  return (
    <section className="product-section">
    <div className="product-image">
      <img src= {NewImg1} alt="Product Image" />
    </div>
    <div className="product-details">
      <h1 className="product-title">Product Title</h1>
      <p className="product-price">$49.99</p>
      <p className="product-description">
        This is a brief description of the product. It highlights the main
        features and benefits, giving the customer a quick overview of what the
        product offers.
      </p>
      <button className="buy-now-btn">Buy Now</button>
    </div>
  </section>
  
  )
}

