import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../store/wishlistSlice';

 
import './Wishlist.css';

function Wishlist() {
  const dispatch = useDispatch();
  // const mutation = useMutation(

  // );
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="container-wish">
      <header>
        <h1>My Wishlist</h1>
      </header>
      <main>
        {wishlistItems.length === 0 ? (
          <p className="empty-message">Your wishlist is empty.</p>
        ) : (
          <ul className="wishlist">
            {wishlistItems.map((item) => (
              <li key={item.id} className="wishlist-item">
                <img src={`/${item.imgSrc}`} alt={item.title} className="wishlist-image" />
                <div className="item-details">
                  <h2 className="item-title">{item.title}</h2>
                  <p className="item-description">{item.description}</p>
                  <div className="item-prices">
                    <span className="item-discount">${item.discountPrice.toFixed(2)}</span>
                    <span className="item-original">${item.originalPrice.toFixed(2)}</span>
                  </div>
                  <button className="remove-button" onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default Wishlist;
