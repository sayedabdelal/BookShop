import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../../store/cartSlice';
import { addItem, removeItem } from '../../store/wishlistSlice';

function BookCard({ imgSrc, title, discountPrice, originalPrice, rating, shopId, shopDes }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // State to manage whether the item is in the cart or wishlist
    const [inCart, setInCart] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);

    const cartItems = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.wishlist.items);

    // Check if the item is already in the cart or wishlist
    React.useEffect(() => {
        const isInCart = cartItems.some(item => item.id === shopId);
        const isInWishlist = wishlistItems.some(item => item.id === shopId);
        setInCart(isInCart);
        setInWishlist(isInWishlist);
    }, [cartItems, wishlistItems, shopId]);

    function handleClick(e) { 
        e.preventDefault();
        console.log('The link was clicked.');
        navigate(`${shopId}`);
    }

    function handleAddToCart() {
        const product = {
            id: shopId,
            title,
            imgSrc,
            discountPrice: parseFloat(discountPrice), 
            originalPrice: parseFloat(originalPrice),  
            rating,
        };

        if (inCart) {
            dispatch(removeItemFromCart(shopId));
            alert('Item removed from cart');
        } else {
            dispatch(addItemToCart(product));
            alert('Item added to cart');
        }
        setInCart(!inCart);
    }

    function handleAddToWishList() { 
        const product = {
            id: shopId,
            title,
            imgSrc,
            discountPrice: parseFloat(discountPrice), 
            originalPrice: parseFloat(originalPrice),  
            rating,
            description: shopDes,   
        };

        if (inWishlist) {
            dispatch(removeItem(shopId));
            alert('Item removed from wishlist');
        } else {
            dispatch(addItem(product));
            alert('Item added to wishlist');
        }
        setInWishlist(!inWishlist);
    }

    return (
        <a className="new__card swiper-slide">
            <img src={`/${imgSrc}`} alt={title} className="new__img" />
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
                    <button>
                        <i className="ri-eye-line" onClick={handleClick} />
                    </button>
                </div>
            </div>
        </a>
    );
}

export default BookCard;
