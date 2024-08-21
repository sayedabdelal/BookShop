import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';

import BookCard from './BookCard';
import {books} from '../../dummy-products'
import './Shop.css';

function Shop() {
 

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
        {/* <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div> */}
      </div>
    </section>
  );
}

export default Shop;
