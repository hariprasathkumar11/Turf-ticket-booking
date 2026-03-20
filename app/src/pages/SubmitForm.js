import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveBooking } from '../utils/bookingStorage';
import '../styles/SubmitForm.css';

const SubmitForm = () => {
  const { state } = useLocation();
  const navigate  = useNavigate();

  const [formData, setFormData] = useState({ fullName: '', email: '', mobile: '', place: '' });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);

  if (!state) {
    return (
      <div className="submit-page">
        <div className="submit-page__empty">
          <span>🏏</span>
          <p>No booking details found.</p>
          <button className="btn btn--primary" onClick={() => navigate('/venues')}>Go to Venues</button>
        </div>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim())                               e.fullName = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))    e.email    = 'Valid email required';
    if (!formData.mobile.match(/^[6-9]\d{9}$/))                  e.mobile   = 'Valid 10-digit mobile required';
    if (!formData.place.trim())                                   e.place    = 'Place is required';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev  => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    // Save booking with full user details for admin dashboard
    saveBooking(state.venue, state.date, state.slots, {
      startLabel: state.startLabel,
      endLabel:   state.endLabel,
      duration:   state.duration,
      price:      state.price,
      ...formData,
    });

    setTimeout(() => {
      setLoading(false);
      navigate('/confirmation', { state: { ...state, ...formData } });
    }, 1200);
  };

  const timeDisplay = state.startLabel && state.endLabel
    ? `${state.startLabel} – ${state.endLabel}`
    : state.slots?.join(' – ');

  return (
    <div className="submit-page">
      <div className="submit-page__container">
        <h2>Confirm Your Booking</h2>

        <div className="booking-details-card">
          <div className="bdc-row"><span>📍 Venue</span>    <strong>{state.venue}</strong></div>
          <div className="bdc-row"><span>📅 Date</span>     <strong>{state.date}</strong></div>
          <div className="bdc-row"><span>🕐 Time</span>     <strong>{timeDisplay}</strong></div>
          <div className="bdc-row"><span>⏱ Duration</span> <strong>{state.duration} hour{state.duration > 1 ? 's' : ''}</strong></div>
          <div className="bdc-row bdc-row--total"><span>💰 Total</span><strong>₹{state.price?.toLocaleString()}</strong></div>
        </div>

        <form className="submit-form" onSubmit={handleSubmit} noValidate>
          {[
            { id: 'fullName', label: 'Full Name',     type: 'text',  ph: 'Your full name' },
            { id: 'email',    label: 'Email Address', type: 'email', ph: 'you@example.com' },
            { id: 'mobile',   label: 'Mobile Number', type: 'tel',   ph: '10-digit number', max: 10 },
            { id: 'place',    label: 'Area / Place',  type: 'text',  ph: 'e.g. Karur' },
          ].map(f => (
            <div className="form-group" key={f.id}>
              <label htmlFor={f.id}>{f.label}</label>
              <input
                id={f.id} name={f.id} type={f.type}
                placeholder={f.ph}
                value={formData[f.id]}
                onChange={handleChange}
                maxLength={f.max}
              />
              {errors[f.id] && <span className="form-error">{errors[f.id]}</span>}
            </div>
          ))}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="submit-btn__spinner" /> : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;
