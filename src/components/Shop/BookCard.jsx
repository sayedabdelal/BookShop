import React from 'react';
import { useNavigate } from 'react-router-dom';

function BookCard({ imgSrc, title, discountPrice, originalPrice, rating, shopId }) {
    const navigate = useNavigate();
    function handleClick(e) { 
        e.preventDefault()
        console.log('The link was clicked.');
        navigate(`${shopId}`);
    }   
  return (
    <a  onClick={handleClick} className="new__card swiper-slide">
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
        <div className="featured__actions">
            <button>
                <i className="ri-search-line" />
            </button>
            <button>
                <i className="ri-heart-3-line" />
            </button>
            <button>
                <i className="ri-eye-line" />
            </button>
        </div>

    </div>
    </a>
  );
}

export default BookCard;


// import { Link } from 'react-router-dom';

// function Product({ shopId }) {
//   return (
//     <Link to={`/shop/${shopId}`} className="button">
//       Add To Cart
//     </Link>
//   );
// }