import React, { useState, useMemo } from 'react';
import VenueCard from '../components/VenueCard';
import { venues } from '../data/venuesData';
import '../styles/Venues.css';

const PRICE_FILTERS    = [
  { label: 'All',         value: 'All' },
  { label: 'Under ₹1000', value: 1000  },
  { label: 'Under ₹1500', value: 1500  },
  { label: 'Under ₹2000', value: 2000  },
];
const CATEGORY_FILTERS = ['All', 'Nets', 'Box-Cricket'];

const Venues = () => {
  const [priceFilter,    setPriceFilter]    = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy,         setSortBy]         = useState('default');
  const [searchQuery,    setSearchQuery]    = useState('');

  const filtered = useMemo(() => {
    let r = [...venues];
    if (searchQuery.trim())    r = r.filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (priceFilter !== 'All') r = r.filter(v => v.price <= priceFilter);
    if (categoryFilter !== 'All') r = r.filter(v => v.category === categoryFilter);
    if (sortBy === 'price-asc')  r.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') r.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating')     r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [priceFilter, categoryFilter, sortBy, searchQuery]);

  const clearAll = () => { setPriceFilter('All'); setCategoryFilter('All'); setSearchQuery(''); setSortBy('default'); };

  return (
    <div className="venues-page">
      <div className="venues-page__header">
        <h1>{filtered.length} Cricket Venues in Karur</h1>
        <p>Find and book the perfect turf for your game</p>
      </div>

      {/* Controls */}
      <div className="venues-page__controls">
        <input
          className="venues-page__search"
          type="text"
          placeholder="🔍  Search venue name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <div className="venues-page__filters">
          <div className="filter-group">
            <span className="filter-label">Price</span>
            <div className="filter-btns">
              {PRICE_FILTERS.map(f => (
                <button
                  key={f.label}
                  className={`filter-btn ${priceFilter === f.value ? 'active' : ''}`}
                  onClick={() => setPriceFilter(f.value)}
                >{f.label}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Format</span>
            <div className="filter-btns">
              {CATEGORY_FILTERS.map(c => (
                <button
                  key={c}
                  className={`filter-btn ${categoryFilter === c ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(c)}
                >{c}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Sort</span>
            <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="venues-page__grid">
          {filtered.map(v => <VenueCard key={v.id} venue={v} />)}
        </div>
      ) : (
        <div className="venues-page__empty">
          <span>🏏</span>
          <p>No venues match your filters.</p>
          <button onClick={clearAll}>Clear Filters</button>
        </div>
      )}
    </div>
  );
};

export default Venues;
