import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {fetchBooks} from '../../util/http.js';
import { Navigation, Grid } from 'swiper/modules';
import  LoadingIndicator from '../../UI/LoadingIndicator.jsx'


import BookCard from './BookCard';

import { useQuery } from "@tanstack/react-query";

import './Shop.css';

function Shop() {
   // Fetch existing books
   const { data: books, isError, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <div>Error fetching books.</div>;
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
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <BookCard
                imgSrc={book.imgSrc}
                title={book.title}
                discountPrice={book.discountPrice}
                originalPrice={book.originalPrice}
                rating={book.rating}
                shopId={book.id}
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
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <BookCard
                imgSrc={book.imgSrc}
                title={book.title}
                discountPrice={book.discountPrice}
                originalPrice={book.originalPrice}
                rating={book.rating}
                shopId={book.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </section>
  );
}

export default Shop;
