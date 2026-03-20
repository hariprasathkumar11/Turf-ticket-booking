import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_USERS } from '../data/adminUsers';
import { setAdminSession } from '../utils/bookingStorage';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ username: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const match = ADMIN_USERS.find(
        u => u.username === form.username.trim() && u.password === form.password
      );
      if (match) {
        setAdminSession(match);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__icon">🏏</div>
        <h1 className="admin-login__title">Admin Portal</h1>
        <p className="admin-login__sub">Turf Booking Management</p>

        <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
          <div className="al-group">
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          <div className="al-group">
            <label>Password</label>
            <div className="al-pwd-wrap">
              <input
                name="password"
                type={showPwd ? 'text' : 'password'}
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="al-pwd-toggle"
                onClick={() => setShowPwd(p => !p)}
              >
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && <div className="al-error">⚠️ {error}</div>}

          <button className="al-submit" type="submit" disabled={loading}>
            {loading ? <span className="al-spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="admin-login__back" onClick={() => navigate('/')}>
          ← Back to main site
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
