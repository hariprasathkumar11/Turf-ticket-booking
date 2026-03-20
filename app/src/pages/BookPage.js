import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { timeSlotsByCategory } from '../data/venuesData';
import { getBookedSlots, getEndSlotLabel } from '../utils/bookingStorage';
import '../styles/BookPage.css';

const getNext5Days = () => {
  const opts = { weekday: 'short', day: '2-digit', month: 'short' };
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return { label: date.toLocaleDateString('en-GB', opts), date };
  });
};

const CATEGORIES      = ['Twilight', 'Morning', 'Noon', 'Evening'];
const CATEGORY_ICONS  = { Twilight: '🌙', Morning: '🌅', Noon: '☀️', Evening: '🌆' };

const BookPage = () => {
  const location  = useLocation();
  const { id }    = useParams();
  const navigate  = useNavigate();

  const { price = 400, name = decodeURIComponent(id) } = location.state || {};

  const [dates,          setDates]          = useState([]);
  const [selectedDate,   setSelectedDate]   = useState(null);
  const [selectedSlots,  setSelectedSlots]  = useState([]);
  const [activeCategory, setActiveCategory] = useState('Noon');
  const [duration,       setDuration]       = useState('');
  const [bookedSlots,    setBookedSlots]    = useState([]);

  useEffect(() => {
    const d = getNext5Days();
    setDates(d);
    setSelectedDate(d[0]);
  }, []);

  // Reload booked slots whenever date or venue changes
  useEffect(() => {
    if (selectedDate) {
      const locked = getBookedSlots(name, selectedDate.date.toDateString());
      setBookedSlots(locked);
    }
  }, [selectedDate, name]);

  const isPastTime = (date, slot) => {
    const now      = new Date();
    const slotDate = new Date(date);
    const [time, modifier] = slot.split(' ');
    let hours = parseInt(time);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    slotDate.setHours(hours, 0, 0, 0);
    return slotDate < now;
  };

  const handleSlotClick = (idx) => {
    const slots = timeSlotsByCategory[activeCategory];
    const dur   = parseInt(duration);
    if (!dur || idx + dur > slots.length) return;
    const picked     = slots.slice(idx, idx + dur);
    const isPast     = selectedDate && picked.some(s => isPastTime(selectedDate.date, s));
    const hasBooked  = picked.some(s => bookedSlots.includes(s));
    if (!isPast && !hasBooked) setSelectedSlots(picked);
  };

  if (!selectedDate) return null;

  const totalPrice   = price * selectedSlots.length;
  const startLabel   = selectedSlots[0] || '';
  const endLabel     = getEndSlotLabel(selectedSlots[selectedSlots.length - 1]);

  return (
    <div className="book-page">

      {/* Header */}
      <div className="book-page__header">
        <span className="book-page__back" onClick={() => navigate(-1)}>← Back</span>
        <h2>{name}</h2>
        <span className="book-page__price-tag">₹{price}/hr</span>
      </div>

      {/* Date */}
      <section className="book-section">
        <h3 className="book-section__label">Select Date</h3>
        <div className="date-selector">
          {dates.map((d, i) => {
            const isPast  = new Date(d.date.toDateString()) < new Date(new Date().toDateString());
            const parts   = d.label.split(' ');
            return (
              <div
                key={i}
                className={`date-item ${selectedDate?.label === d.label ? 'active' : ''} ${isPast ? 'disabled' : ''}`}
                onClick={() => { if (!isPast) { setSelectedDate(d); setSelectedSlots([]); } }}
              >
                <span className="date-item__day">{parts[0]}</span>
                <span className="date-item__date">{parts.slice(1).join(' ')}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Duration */}
      <section className="book-section">
        <h3 className="book-section__label">Duration</h3>
        <div className="duration-options">
          {['1', '2', '3'].map(d => (
            <button
              key={d}
              className={`duration-btn ${duration === d ? 'active' : ''}`}
              onClick={() => { setDuration(d); setSelectedSlots([]); }}
            >
              {d} Hr{d !== '1' ? 's' : ''}
            </button>
          ))}
        </div>
      </section>

      {/* Time of day */}
      <section className="book-section">
        <h3 className="book-section__label">Time of Day</h3>
        <div className="time-category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat); setSelectedSlots([]); }}
            >
              {CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Slots */}
      <section className="book-section">
        <h3 className="book-section__label">
          Select Start Time
          {!duration && <span className="book-section__hint"> — pick a duration first</span>}
        </h3>
        <div className="time-slots">
          {timeSlotsByCategory[activeCategory].map((slot, idx) => {
            const isPast     = isPastTime(selectedDate.date, slot);
            const isBooked   = bookedSlots.includes(slot);
            const isSelected = selectedSlots.includes(slot);
            const isDisabled = isPast || isBooked || !duration;
            return (
              <button
                key={slot}
                className={`time-slot ${isSelected ? 'selected' : ''} ${isPast || !duration ? 'disabled' : ''} ${isBooked ? 'booked' : ''}`}
                onClick={() => handleSlotClick(idx)}
                disabled={isDisabled}
                title={isBooked ? 'Already booked' : undefined}
              >
                {slot}
                {isBooked && <span className="slot-booked-tag">Booked</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Summary bar */}
      {selectedSlots.length > 0 && (
        <div className="booking-summary">
          <div className="booking-summary__info">
            <div className="booking-summary__venue">{name}</div>
            <div className="booking-summary__time">
              {startLabel} – {endLabel}
              &nbsp;|&nbsp; {selectedDate.date.toDateString()}
            </div>
            <div className="booking-summary__dur">
              {selectedSlots.length} hour{selectedSlots.length > 1 ? 's' : ''}
            </div>
          </div>
          <div className="booking-summary__right">
            <span className="booking-summary__price">₹{totalPrice.toLocaleString()}</span>
            <button
              className="btn btn--primary"
              onClick={() => navigate('/submit', {
                state: {
                  venue:      name,
                  date:       selectedDate.date.toDateString(),
                  slots:      selectedSlots,
                  startLabel,
                  endLabel,
                  duration:   selectedSlots.length,
                  price:      totalPrice,
                }
              })}
            >
              Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPage;
