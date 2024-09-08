import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, fetchWishlist, addItem } from '../../store/wishlistSlice';
import { useMutation } from '@tanstack/react-query'; // Make sure you're using React Query
import { addRemoveWishlist } from '../../util/http';
import './Wishlist.css';

function Wishlist() {
  const dispatch = useDispatch();
  
  // Fetch wishlist items on component mount
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);
  
  // Extract wishlist state
  const { items: wishlistItems, loading, error } = useSelector((state) => state.wishlist);



  // Wishlist mutation for adding/removing items
  const  wishlistMutation = useMutation({
    mutationFn: ({ action, productId, wishlistId }) =>
      addRemoveWishlist({ action, productId, wishlistId}),
    onSuccess: (response) => {
      console.log('response:', response);
      if (response && response.new_wishlist_item_id) {
        // console.log('wishlist_id:', data);
        setWishlistId(data.new_wishlist_item_id);
        // console.log(data.new_wishlist_item_id)
        dispatch(addItem({ ...product, id: shopId, wishlistId: data.new_wishlist_item_id }));
        alert('Item added to wishlist');
        
    } else {
      alert('Item removed from wishlist');
      //  updateWishlistPAGE
        dispatch(fetchWishlist());
    }
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  if (loading) return <p>Loading wishlist...</p>;
  if (error) {
    console.log('error:', error);
    return <p>Error: {error}</p>;
  }
  // console.log('wishlistItems:', wishlistItems);
  let allWishlist = [];
  if (!error) {
    allWishlist = wishlistItems.map(item => ({
      ...item.book, // Assuming 'book' contains book details
      book_id: item?.id|| null,
    }));
  }
  // console.log('allWishlist:', allWishlist);



    // Handle removing an item from the wishlist
    const handleRemove = (itemId) => {
      const wishlistId = allWishlist.find(item => item.book_id === itemId).book_id;
      console.log('handleRemove itemId:', itemId, 'wishlistId:', wishlistId);
      // dispatch(removeItem(itemId)); // Remove item from local state
      wishlistMutation.mutate({ action: 'remove', wishlistId });
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
            {allWishlist.map((item) => (
              <li key={item.book_id} className="wishlist-item">
                <img src={`/${item.image}`} alt={item.title} className="wishlist-image" />
                <div className="item-details">
                  <h2 className="item-title">{item.title}</h2>
                  <p className="item-description">{item.description}</p>
                  <div className="item-prices">
                    <span className="item-discount">
                      ${typeof item.discountPrice === 'number' ? item.discountPrice.toFixed(2) : 'N/A'}
                    </span>
                    <span className="item-original">
                      ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
                    </span>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item.book_id)} // Correct ID used here
                  >
                    Remove
                  </button>
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