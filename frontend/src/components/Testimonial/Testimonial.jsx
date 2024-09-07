import React from 'react';
import testImage1 from '../../assets/img/testimonial-perfil-1.png';
import testImage2 from '../../assets/img/testimonial-perfil-2.png';
import testImage3 from '../../assets/img/testimonial-perfil-3.png';
import testImage4 from '../../assets/img/testimonial-perfil-4.png';

import './Testimonial.css';
import TestimonialCard from './TestimonialCard';
// import Swiper core and required modules
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Testimonial() {
    const testimonials = [
        {
            imgSrc: testImage2,
            name: 'Rial Loz',
            description: 'The best website to buy books, the purchase is very easy to make and has great discounts.',
            rating: 2,
        },
        {
            imgSrc: testImage4,
            name: 'John Doe',
            description: 'Amazing selection of books and a very user-friendly website. Highly recommended!',
            rating: 5,
        },
        {
            imgSrc: testImage2,
            name: 'Jane Smith',
            description: 'Great customer service and fast shipping. I will definitely buy again!',
            rating: 4.0,
        },
        {
            imgSrc: testImage4,
            name: 'Emily Brown',
            description: 'A wonderful shopping experience with great discounts on quality books.',
            rating: 4.5,
        },
    ];

    return (
        <section className="testimonial section" id="testimonial">
            <h2 className="section__title">Customer Opinions</h2>
            <div className="testimonial__container container">
                <Swiper
                    spaceBetween={16}
                    slidesPerView="auto"
                    centeredSlides={true}
                    loop={true}
                    grabCursor={true}
                    breakpoints={{
                        1150: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                    }}
                    // navigation
                    pagination={{ clickable: true }}
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <TestimonialCard
                                imgSrc={testimonial.imgSrc}
                                name={testimonial.name}
                                description={testimonial.description}
                                rating={testimonial.rating}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default Testimonial;
