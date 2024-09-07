import React from 'react';
import StarRating from './StarRating';

function TestimonialCard({ imgSrc, name, description, rating }) {
    return (
        <article className="testimonial__card swiper-slide">
            <img src={imgSrc} alt={`${name}'s testimonial`} className="testimonial__img" />
            <h2 className="testimonial__title">{name}</h2>
            <p className="testimonial__description">{description}</p>
            <StarRating rating={rating} />
        </article>
    );
}

export default TestimonialCard;
