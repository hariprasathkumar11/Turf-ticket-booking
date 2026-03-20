import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const stats = [
  { value: '9+',   label: 'Venues'   },
  { value: '500+', label: 'Bookings' },
  { value: '4.5★', label: 'Rating'   },
];

const steps = [
  { icon: '🔍', num: '01', title: 'Find a Venue',   desc: 'Browse 9+ cricket venues in Karur, filter by price and format.' },
  { icon: '📅', num: '02', title: 'Pick a Slot',    desc: 'Select your preferred date, time category and duration in seconds.' },
  { icon: '✅', num: '03', title: 'Confirm & Play', desc: 'Enter your details, confirm the booking, and show up to play.' },
];

const Home = () => (
  <main className="home">

    {/* ── HERO ── */}
    <section className="hero">
      <div className="hero__bg-grid" aria-hidden="true" />

      <div className="hero__content">
        <span className="hero__badge">🏏 Karur's #1 Turf Booking Platform</span>

        <h1 className="hero__heading">
          <span className="fade-slide">The easiest way to</span><br />
          <span className="fade-slide delay-1">meet <span className="hero__highlight">new players</span></span>
        </h1>

        <p className="hero__sub fade-slide delay-2">
          Explore venues in your neighbourhood and book your slot in minutes.
          No calls. No hassle. Just play.
        </p>

        <div className="hero__actions fade-slide delay-3">
          <Link to="/venues" className="btn btn--primary">Book a Slot <span>→</span></Link>
          <Link to="/format" className="btn btn--ghost">Explore Formats</Link>
        </div>
      </div>

      <div className="hero__stats fade-slide delay-4">
        {stats.map(s => (
          <div className="hero__stat" key={s.label}>
            <span className="hero__stat-value">{s.value}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* ── HOW IT WORKS ── */}
    <section className="how-it-works">
      <h2 className="section-title">How It Works</h2>
      <p className="section-sub">Three simple steps to get on the field</p>
      <div className="steps">
        {steps.map(s => (
          <div className="step-card" key={s.num}>
            <div className="step-card__icon">{s.icon}</div>
            <span className="step-card__num">{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── CTA BANNER ── */}
    <section className="cta-banner">
      <h2>Ready to play?</h2>
      <p>Join hundreds of players booking every week.</p>
      <Link to="/venues" className="btn btn--white">View All Venues →</Link>
    </section>

    {/* ── FOOTER ── */}
    <footer className="site-footer">
      <span className="site-footer__copy">© 2026 Karur Turf. All rights reserved.</span>
      <Link to="/admin" className="site-footer__admin">Admin</Link>
    </footer>

  </main>
);

export default Home;
