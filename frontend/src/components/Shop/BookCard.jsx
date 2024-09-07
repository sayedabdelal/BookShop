import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { addItemToCart, removeItemFromCart, fetchCartItems } from '../../store/cartSlice';
import { addItem, removeItem } from '../../store/wishlistSlice';
import { addRemoveCart, addRemoveWishlist } from '../../util/http';



let cartObject = {};
let wishlistObject = {};

function BookCard({ imgSrc, title, discountPrice, originalPrice, rating, shopId, shopDes, isInCart, cart_item_id,isInWishList,wishListId   }) {
    const [wishlistId, setWishlistId] = useState(null);
    const [cartItemId, setCartItemId] = useState(null);
   
     
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // made a cart object
    madeObject(shopId, cart_item_id)

    function madeObject(shopId, cart_Item_Id) { 
        cartObject[shopId] = cart_Item_Id;
    }
    
    function updateCart() { 
        dispatch(fetchCartItems());
    }
    // made a wishlist object
    madeWishlistObject(shopId, wishListId)
    function madeWishlistObject(shopId, wishListId) { 
        wishlistObject[shopId] = wishListId;
    }

    
    
    
   


    // State to manage whether the item is in the cart or wishlist
    const [inCart, setInCart] = useState(isInCart);
    const [inWishlist, setInWishlist] = useState(isInWishList);
     


    // Get the cartItemId of the product if it is in the cart
    const cartItems = useSelector((state) => state.cart.items);
    // function getCartItemId(shopId) { 
    //     const cartItem = cartItems.find(item => item.book_id === shopId);
        
    //     // If a matching item is found, return its cart_id
    //     if (cartItem) {
    //         console.log('cart_id:', cartItem.cart_id);
    //         return cartItem.cart_id;
    //     } 
        
    //     // If no match is found, return null or undefined
    //     return null;
    // }
  

    const product = {
        shopId,
        title,
        imgSrc,
        discountPrice: parseFloat(discountPrice),
        originalPrice: parseFloat(originalPrice),
        rating,
        description: shopDes,
        
    };

    // Mutation for adding/removing from the cart
    const cartMutation = useMutation({
        mutationFn: ({ action, productId, quantity, cartItemId }) =>
            
        addRemoveCart({ action, productId, quantity, cartItemId }),
        onSuccess: (response) => {
            // console.log('Success response:', response); // Add this line
            setCartItemId(response.new_cart_item_id);
           

            if (response && response.new_cart_item_id ) {
                // console.log('allllll', response);
                setInCart(true);    
                dispatch(addItemToCart({ ...product, id: shopId, cartItemId: response.new_cart_item_id }));
                alert('Item added to cart');
                
            } else {
                setInCart(false);
                // console.log('shopIdremove:', shopId);
                // updateCart();
                dispatch(removeItemFromCart(shopId));
                dispatch(fetchCartItems());
                alert('Item removed from cart');
               
            }
        },
        onError: (error) => {
            console.error(`Failed to ${inCart ? 'remove' : 'add'} item to cart:`, error);
            alert(`Failed to ${inCart ? 'remove' : 'add'} item to cart. Please try again.`);
        }
    });

    // Mutation for adding/removing from the wishlist
    const wishlistMutation = useMutation({
        mutationFn: ({ action, productId, wishlistId }) =>
            addRemoveWishlist({ action, productId, wishlistId }),
        onSuccess: (data) => {
            // console.log('Success response:', data); // Add this line
            if (data && data.new_wishlist_item_id) {
                // console.log('wishlist_id:', data);
                setWishlistId(data.new_wishlist_item_id);
                // console.log(data.new_wishlist_item_id)
                dispatch(addItem({ ...product, id: shopId, wishlistId: data.new_wishlist_item_id }));
                alert('Item added to wishlist');
                setInWishlist(true);
            } else {
                dispatch(removeItem(shopId));
                alert('Item removed from wishlist');
                setInWishlist(false);
            }
        },
        onError: (error) => {
            console.error(`Failed to ${inWishlist ? 'remove' : 'add'} item to wishlist:`, error);
            alert(`Failed to ${inWishlist ? 'remove' : 'add'} item to wishlist. Please try again.`);
        }
    });
    
   
    

    function handleAddToCart() {
        let cartId = cartObject[shopId];
        
        if (inCart) {
            
            
            cartMutation.mutate({ action: 'remove', cartItemId: cartItemId? cartItemId : cartId });
        } else {
            
            cartMutation.mutate({ action: 'add', productId: product.shopId, quantity: 1 });
            
        }
    }

    function handleAddToWishList() {
        let wishId = wishlistObject[shopId];
        
        if (inWishlist) {
            // console.log(wishlistId)
            wishlistMutation.mutate({ action: 'remove', wishlistId: wishlistId? wishlistId : wishId });
        } else {
             
            wishlistMutation.mutate({ action: 'add', productId: product.shopId });
        }
    }

    function handleClick(e) {
        e.preventDefault();
        navigate(`/shop/${shopId}`);
    }

    return (
        <a className="new__card swiper-slide">
            <img src={`/${imgSrc}`} alt={title} className="new__img" />
            <div className="add-card">
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
                <button className="button" onClick={handleAddToCart}>
                    {inCart ? 'Remove from Cart' : 'Add To Cart'}
                </button>
                <div className="featured__actions">
                    <button>
                        <i className="ri-search-line" />
                    </button>
                    <button onClick={handleAddToWishList}>
                        <i className={inWishlist ? "ri-heart-3-fill dark" : "ri-heart-3-line"} />
                    </button>
                    <button onClick={handleClick}>
                        <i className="ri-eye-line" />
                    </button>
                </div>
            </div>
        </a>
    );
}

export default BookCard;


 
// use redux tolket to store cart_Item_Id shopdID when add to cart dispatch cart_Item_Id to store when 
// remove from cart retrun cart_Item_Id to mutate and remove from cart



