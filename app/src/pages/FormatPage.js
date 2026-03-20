import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTypes, venues } from '../data/venuesData';
import VenueCard from '../components/VenueCard';
import '../styles/FormatPage.css';

const FormatPage = () => {
  const [selected, setSelected] = useState(null);

  const matchedVenues = selected
    ? venues.filter(v => {
        if (selected === 'Box Cricket')   return v.category === 'Box-Cricket';
        if (selected === 'Nets Practice') return v.category === 'Nets';
        return true;
      })
    : [];

  return (
    <div className="format-page">
      <div className="format-page__header">
        <h1>Choose Your Format</h1>
        <p>Select the style of cricket that suits your game</p>
      </div>

      <div className="format-grid">
        {formatTypes.map(f => (
          <div
            key={f.id}
            className={`format-card ${selected === f.name ? 'format-card--active' : ''}`}
            onClick={() => setSelected(selected === f.name ? null : f.name)}
          >
            <div className="format-card__icon">{f.icon}</div>
            <h3 className="format-card__name">{f.name}</h3>
            <p className="format-card__desc">{f.desc}</p>
            <span className="format-card__cta">
              {selected === f.name ? '✓ Selected' : 'Select →'}
            </span>
          </div>
        ))}
      </div>

      {selected && (
        <div className="format-results">
          <h2>Venues for <span>{selected}</span></h2>
          {matchedVenues.length > 0 ? (
            <div className="format-results__grid">
              {matchedVenues.map(v => <VenueCard key={v.id} venue={v} />)}
            </div>
          ) : (
            <div className="format-results__empty">
              <p>No venues available for this format yet.</p>
              <Link to="/venues" className="btn btn--primary">Browse All Venues</Link>
            </div>
          )}
        </div>
      )}

      {!selected && (
        <p className="format-page__hint">
          Not sure? <Link to="/venues">Browse all venues</Link> and filter by category.
        </p>
      )}
    </div>
  );
};

export default FormatPage;
