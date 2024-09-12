import React from 'react'
import { Link, useParams } from 'react-router-dom'
import NewImg1 from '../../assets/img/discount-book-2.png';
import './ShopDescritpion.css'


import { useRouteLoaderData, json } from 'react-router-dom';


export default function ShopDescritpion() {
  const data = useRouteLoaderData("shop-details");
  console.log('datassssssss:', data);
  const img =  data.image?.startsWith("http") || data.image?.startsWith("data")
  ? data.image
  : `/${data.image || "noavatar.png"}`;
  return (
    <>
      <section className="product-section">
        <div className="product-image">
          <img src={img} alt="Product Image" />
        </div>
        <div className="product-details">
          <h1 className="product-title">{data.title}</h1>
          <p className="product-author">{data.author}</p>
          <div className="product-prices">
            {data.discountPrice ? (
              <>
                <p className="discount-price">${data.discountPrice.toFixed(2)}</p>
                <p className="product-price">${data.price.toFixed(2)}</p>
              </>
            ) : (
              <p className="discount-price">${data.price.toFixed(2)}</p>
            )}
          </div>

          <p className="product-description">
            {data.description}
          </p>
          <div className="product-meta">
            <span className="product-rating">Rating: {data.rating} ★</span>
            <span className="product-stock">In Stock: {data.stockQuantity}</span>
          </div>
          <Link to='..' className="buy-now-btn">Buy Now</Link>
        </div>
      </section>

    </>

  )
}

/*
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


*/

