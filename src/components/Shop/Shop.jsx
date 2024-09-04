import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchBooks } from '../../util/http.js';
import { Navigation, Grid } from 'swiper/modules';
import LoadingIndicator from '../../UI/LoadingIndicator.jsx';
import ErrorPage from '../../UI/ErrorPage.jsx';
import BookCard from './BookCard';
import { useQuery } from "@tanstack/react-query";
 
 

import './Shop.css';

function Shop() {
  // Fetch existing books
  const { data: books, isError, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
  
  let booksOne = [];
  let booksTwo = [];

  if (books && books.length > 0) {
    const half = Math.ceil(books.length / 2);
    booksOne = books.slice(0, half);
    booksTwo = books.slice(half, books.length);
  }

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
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Shop;
