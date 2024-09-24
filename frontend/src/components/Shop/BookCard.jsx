import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addItemToCart, removeItemFromCart, fetchCartItems } from '../../store/cartSlice';
import { addItem, removeItem } from '../../store/wishlistSlice';
import { addRemoveCart, addRemoveWishlist } from '../../util/http';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let cartObject = {};
let wishlistObject = {};

function BookCard({ imgSrc, title, discountPrice, originalPrice, rating, shopId, shopDes, isInCart, cart_item_id, isInWishList, wishListId }) {
  const [cartItemId, setCartItemId] = useState(cart_item_id || null);
  const [wishlistItemId, setWishlistItemId] = useState(wishListId || null);
  const [inCart, setInCart] = useState(isInCart || false);
  
  const [inWishlist, setInWishlist] = useState(isInWishList || false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  useEffect(() => {
    setCartItemId(cart_item_id);
    setWishlistItemId(wishListId);
  }, [cart_item_id, wishListId]);

  const product = {
    shopId,
    title,
    imgSrc,
    discountPrice: parseFloat(discountPrice),
    originalPrice: parseFloat(originalPrice),
    rating,
    description: shopDes,
  };

  const cartMutation = useMutation({
    mutationFn: ({ action, productId, quantity, cartItemId }) =>
      addRemoveCart({ action, productId, quantity, cartItemId }),
    onSuccess: (response) => {
      if (response.new_cart_item_id) {
        setCartItemId(response.new_cart_item_id);
        dispatch(addItemToCart({ ...product, id: shopId, cartItemId: response.new_cart_item_id }));
        toast.success('Item added to cart successfully!', { position: "top-center" });
        setInCart(true);
      } else {
        setInCart(false);
        console.log('remove from cart', shopId);
        dispatch(removeItemFromCart(shopId));
        toast.info('Item removed from cart.', { position: "top-center" });
      }
      queryClient.invalidateQueries('cartItems');
    },
    onError: () => {
      toast.error(`Failed to ${inCart ? 'remove' : 'add'} item to cart. Please try again.`, { position: "top-center" });
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: ({ action, productId, wishlistId }) =>
      addRemoveWishlist({ action, productId, wishlistId }),
    onSuccess: (data) => {
      if (data.new_wishlist_item_id) {
        setWishlistItemId(data.new_wishlist_item_id);
        dispatch(addItem({ ...product, id: shopId, wishlistId: data.new_wishlist_item_id }));
        
        toast.success('Item added to wishlist successfully!', { position: "top-center" });
        setInWishlist(true);
      } else {
        dispatch(removeItem(shopId));
        toast.info('Item removed from wishlist.', { position: "top-center" });
        setInWishlist(false);
      }
      queryClient.invalidateQueries('wishlistItems');
    },
    onError: () => {
      toast.error(`Failed to ${inWishlist ? 'remove' : 'add'} item to wishlist. Please try again.`, { position: "top-center" });
    },
  });

  function handleAddToCart() {
    if (!isAuth || isAdmin) {
      navigate('/login');
      return;
    }

    if (inCart) {
      cartMutation.mutate({ action: 'remove', cartItemId });

    } else {
      cartMutation.mutate({ action: 'add', productId: shopId, quantity: 1 });
    //   addItemToCart({ ...product, id: shopId, cartItemId });
    }
  }

  function handleAddToWishList() {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (inWishlist) {
      wishlistMutation.mutate({ action: 'remove', wishlistId: wishlistItemId });
      
      
    } else {
      wishlistMutation.mutate({ action: 'add', productId: shopId });
    //   addItem({ ...product, id: shopId, wishlistId: wishlistItemId });
    }
  }

  function handleClick(e) {
    e.preventDefault();
    navigate(`/shop/${shopId}`);
  }

  const img = imgSrc?.startsWith("http") || imgSrc?.startsWith("data") ? imgSrc : `/${imgSrc || "noavatar.png"}`;

  return (
    <a className="new__card swiper-slide">
      <img src={img} alt="Image" className="new__img" />

      <div className="add-card">
        <h3 className="new__title">{title}</h3>
        <div className="new__prices">
          {discountPrice ? (
            <>
              <span className="new__discount">${discountPrice}</span>
              <span className="new__price">${originalPrice}</span>
            </>
          ) : (
            <span className="new__discount">${originalPrice}</span>
          )}
        </div>

        <div className="new__stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <i
              key={index}
              className={
                index < Math.floor(rating) 
                  ? 'ri-star-fill'
                  : index < Math.ceil(rating) && rating % 1 >= 0.5
                    ? 'ri-star-half-fill'
                    : 'ri-star-line'
              }
            />
          ))}
        </div>

        <div className="featured__actions">
          <button onClick={handleAddToWishList}>
            <i className={inWishlist ? "ri-heart-3-fill dark" : "ri-heart-3-line"} />
          </button>
          <button onClick={handleClick}>
            <i className="ri-eye-line" />
          </button>
        </div>
      </div>

      <button className="button Cartbtn" onClick={handleAddToCart}>
        {inCart ? 'Remove from Cart' : 'Add To Cart'}
      </button>
    </a>
  );
}
export default BookCard;

