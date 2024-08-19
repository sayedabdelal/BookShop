import React from 'react';

function BookCard({ imgSrc, title, discountPrice, originalPrice, rating }) {
  return (
    <a href="#" className="new__card swiper-slide">
        <img src={imgSrc} alt="Book" className="new__img" />
        <div className='add-card'>
        <h3 className="new__title">{title}</h3>
        <div className="new__prices">
            <span className="new__discount">{discountPrice}</span>
            <span className="new__price">{originalPrice}</span>
        </div>
        <div className="new__starts">
            {Array.from({ length: 5 }).map((_, index) => (
            <i
                key={index}
                className={
                    index < rating
                        ? 'ri-star-fill'
                        : index < rating + 0.5
                        ? 'ri-star-half-fill'
                        : 'ri-star-line'
            }
            />
        ))}
        </div>
        <button className="button">Add To Cart</button>
    </div>
    </a>
  );
}

export default BookCard;
