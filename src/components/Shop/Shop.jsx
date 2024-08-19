import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';

import BookCard from './BookCard';
import NewImg1 from '../../assets/img/book-1.png';
import NewImg2 from '../../assets/img/book-2.png';
import NewImg3 from '../../assets/img/book-3.png';
import NewImg4 from '../../assets/img/book-4.png';
import NewImg5 from '../../assets/img/book-5.png';
import NewImg6 from '../../assets/img/book-6.png';
import NewImg7 from '../../assets/img/book-7.png';
import NewImg8 from '../../assets/img/book-8.png';
import NewImg9 from '../../assets/img/book-9.png';
import NewImg10 from '../../assets/img/book-10.png';
import './Shop.css';

function Shop() {
  const books = [
    { imgSrc: NewImg1, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
    { imgSrc: NewImg2, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
    { imgSrc: NewImg3, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
    { imgSrc: NewImg4, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
    { imgSrc: NewImg5, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
    { imgSrc: NewImg6, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
    { imgSrc: NewImg7, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
    { imgSrc: NewImg8, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
    { imgSrc: NewImg9, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
    { imgSrc: NewImg10, title: 'New Book', discountPrice: '$7.99', originalPrice: '$19.99', rating: 4.5 },
  ];

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
          {books.map((book, index) => (

            <>
            
            <SwiperSlide key={index}>
                <BookCard
                    imgSrc={book.imgSrc}
                    title={book.title}
                    discountPrice={book.discountPrice}
                    originalPrice={book.originalPrice}
                    rating={book.rating}
                />
            
            
            </SwiperSlide>
            
            </>
            
            
            
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
          {books.map((book, index) => (

            <>
            
            <SwiperSlide key={index}>
                <BookCard
                    imgSrc={book.imgSrc}
                    title={book.title}
                    discountPrice={book.discountPrice}
                    originalPrice={book.originalPrice}
                    rating={book.rating}
                />
            
            
            </SwiperSlide>
            
            </>
            
            
            
          ))}

            
        </Swiper>
        {/* <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div> */}
      </div>
    </section>
  );
}

export default Shop;
