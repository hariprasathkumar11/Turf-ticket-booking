import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/ConfirmationPage.css';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate  = useNavigate();

  if (!state) return (
    <div className="confirm-page">
      <p>No booking found. <Link to="/">Go Home</Link></p>
    </div>
  );

  const bookingId = `TRF-${Date.now().toString().slice(-6)}`;

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <div className="confirm-card__check">✓</div>
        <h2>Booking Confirmed!</h2>
        <p className="confirm-card__id">Booking ID: <strong>{bookingId}</strong></p>

        <div className="confirm-card__details">
          <div className="conf-row"><span>Venue</span>    <strong>{state.venue}</strong></div>
          <div className="conf-row"><span>Date</span>     <strong>{state.date}</strong></div>
          <div className="conf-row"><span>Time</span>     <strong>{state.startLabel && state.endLabel ? `${state.startLabel} – ${state.endLabel}` : state.slots?.join(' – ')}</strong></div>
          <div className="conf-row"><span>Duration</span> <strong>{state.duration} hr{state.duration > 1 ? 's' : ''}</strong></div>
          <div className="conf-row"><span>Name</span>     <strong>{state.fullName}</strong></div>
          <div className="conf-row"><span>Mobile</span>   <strong>{state.mobile}</strong></div>
          <div className="conf-row conf-row--total">
            <span>Amount Paid</span>
            <strong>₹{state.price?.toLocaleString()}</strong>
          </div>
        </div>

        <p className="confirm-card__note">
          Confirmation sent to <strong>{state.email}</strong>
        </p>

        <div className="confirm-card__actions">
          <button className="btn btn--primary" onClick={() => navigate('/')}>Back to Home</button>
          <button className="btn btn--ghost"   onClick={() => navigate('/venues')}>Book Another</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;