import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchBooks } from '../../util/http.js';
import { Navigation, Grid } from 'swiper/modules';
import LoadingIndicator from '../../UI/LoadingIndicator.jsx';
import ErrorPage from '../../UI/ErrorPage.jsx';
import BookCard from './BookCard.jsx';
import { useQuery } from "@tanstack/react-query";


import './Shop.css';
import { useSelector } from 'react-redux';

function Shop() {
  // Fetch existing books
  const { data: books, isError, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const cartItems = useSelector((state) => state.cart.items || []);
  const wishListItem = useSelector((state) => state.wishlist.items || []);






  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    let errorMessage = "Failed to load books. Please try again later.";
    let errorTitle = "Failed to Load Books";

    if (error?.message) {
      try {
        const parsedError = JSON.parse(error.message);
        errorTitle = `Error ${parsedError.status}`;
        errorMessage = `${parsedError.statusText}: ${parsedError.info}`;
      } catch {
        errorMessage = error.message;
      }
    }

    return <ErrorPage title={errorTitle} message={errorMessage} />;
  }




  //   const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartItemsMap = new Map(cartItems.map(item => [item.book_id, item]));

  const formattedWishListItems = new Map(wishListItem.map(item => [item.book_id, item]));

  // Combine books with cart and wishlist status
  const booksWithCartAndWishListStatus = books.map(book => {
    const cartItem = cartItemsMap.get(book.id);
    const isInWishList = formattedWishListItems.has(book.id);

    return {
      ...book,
      isInCart: !!cartItem, // Check if book is in cart
      quantityInCart: cartItem?.quantity || 0, // Get quantity if in cart
      cartItemId: cartItem?.id || null, // Get cartItemId if in cart
      isInWishList: isInWishList, // Check if book is in wishlist
      wishListId: isInWishList ? formattedWishListItems.get(book.id).id : null, // Get wishListId if in wishlist
    };
  });

  // console.log('booksWithCartAndWishListStatus:', booksWithCartAndWishListStatus);

  ;


  let booksOne = [];
  let booksTwo = [];

  if (books && books.length > 0) {
    const half = Math.ceil(books.length / 2);
    booksOne = booksWithCartAndWishListStatus.slice(0, half);
    booksTwo = booksWithCartAndWishListStatus.slice(half, books.length);
  }




  return (
    <section className="new section" id="new">
      <h2 className="section__title">New Books</h2>
      <div className="new__container container">
        <Swiper
          loop={true}
          spaceBetween={16}
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            1150: {
              slidesPerView: 4,
              centeredSlides: false,
            },
          }}
        >
          {booksOne.map((book) => (
            <SwiperSlide key={`book1-${book.id}`}>
              <BookCard
                imgSrc={book.image}
                title={book.title}
                discountPrice={book.discountPrice}
                originalPrice={book.price}
                rating={book.rating}
                shopId={book.id}
                shopDes={book.description}
                isInCart={book.isInCart}
                cart_item_id={book.cartItemId}
                isInWishList={book.isInWishList}
                wishListId={book.wishListId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="new__container container">
        <Swiper
          loop={true}
          spaceBetween={16}
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            1150: {
              slidesPerView: 4,
              centeredSlides: false,
            },
          }}
        >
          {booksTwo.map((book) => (
            <SwiperSlide key={`book2-${book.id}`}>
              <BookCard
                imgSrc={book.image}
                title={book.title}
                discountPrice={book.discountPrice}
                originalPrice={book.price}
                rating={book.rating}
                shopId={book.id}
                shopDes={book.description}
                isInCart={book.isInCart}
                cart_item_id={book.cartItemId}
                isInWishList={book.isInWishList}
                wishListId={book.wishListId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Shop;
