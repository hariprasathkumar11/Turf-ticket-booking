import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VenueCard.css';

const StarRating = ({ rating }) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="stars">
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </span>
  );
};

const VenueCard = ({ venue }) => (
  <div className="venue-card">
    <div className="venue-card__img-wrap">
      <img src={venue.image} alt={venue.name} loading="lazy" />
      <span className="venue-card__badge venue-card__badge--type">{venue.type}</span>
      <span className="venue-card__badge venue-card__badge--cat">{venue.category}</span>
    </div>

    <div className="venue-card__body">
      <h3 className="venue-card__name">{venue.name}</h3>
      <div className="venue-card__meta">
        <StarRating rating={venue.rating} />
        <span className="venue-card__loc">📍 {venue.location}</span>
      </div>
      <div className="venue-card__footer">
        <span className="venue-card__price">
          ₹{venue.price.toLocaleString()} <span className="per-hr">/ hr</span>
        </span>
        <Link
          to={`/book/${encodeURIComponent(venue.name)}`}
          state={{ price: venue.price, name: venue.name }}
        >
          <button className="venue-card__btn">Book Now</button>
        </Link>
      </div>
    </div>
  </div>
);

export default VenueCard;
