import React from 'react';

const getLogo = (rating) => {
    if (rating > 250) return './ratings/diamond.png';
    if (rating > 150) return './ratings/crown.png';
    if (rating > 50) return './ratings/silver.png';
    return './ratings/newbie.png';
};

const Rating = ({ rating }) => {

    const src = getLogo(rating);
    return (
        <img alt={rating} className="rating-logo" src={src} />
    )
};
export default Rating;