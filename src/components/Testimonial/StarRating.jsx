import React from 'react';

function StarRating({ rating }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="testimonial__stars">
            {Array(fullStars).fill().map((_, index) => (
                <i className="ri-star-fill" key={`full-${index}`} />
            ))}
            {halfStar && <i className="ri-star-half-fill" />}
            {Array(emptyStars).fill().map((_, index) => (
                <i className="ri-star-line" key={`empty-${index}`} />
            ))}
        </div>
    );
}

export default StarRating;
