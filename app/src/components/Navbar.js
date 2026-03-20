import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__logo">
        <Link to="/"><img src={logo} alt="Turf Town" /></Link>
      </div>

      {/* Hamburger */}
      <button
        className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        <Link to="/"       className={isActive('/')}>Home</Link>
        <Link to="/venues" className={isActive('/venues')}>Venues</Link>
        <Link to="/format" className={isActive('/format')}>Formats</Link>
        <Link to="/venues" className="navbar__cta">Book Now</Link>
      </div>
    </nav>
  );
};

export default Navbar;
