import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Autoplay } from 'swiper';
 

import Homeimg1 from '../../assets/img/home-book-1.png';
import Homeimg2 from '../../assets/img/home-book-2.png';
import Homeimg3 from '../../assets/img/home-book-3.png';
import Homeimg4 from '../../assets/img/home-book-4.png';
import HomeArticle from './HomeArticle';

// Initialize Swiper modules
// SwiperCore.use([Navigation, Autoplay]);

const HomeImageSwiper = () => (
  <div className="home__images">
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
      <SwiperSlide>
        <HomeArticle src={Homeimg1} alt="image 1" />
      </SwiperSlide>
      <SwiperSlide>
        <HomeArticle src={Homeimg2} alt="image 2" />
      </SwiperSlide>
      <SwiperSlide>
        <HomeArticle src={Homeimg3} alt="image 3" />
      </SwiperSlide>
      <SwiperSlide>
        <HomeArticle src={Homeimg4} alt="image 4" />
      </SwiperSlide>
    
    </Swiper>
  </div>
);

export default HomeImageSwiper;
