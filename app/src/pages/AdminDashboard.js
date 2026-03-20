import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRecords, deleteRecord, getAdminSession, clearAdminSession } from '../utils/bookingStorage';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate  = useNavigate();
  const session   = getAdminSession();

  const [records,    setRecords]    = useState([]);
  const [search,     setSearch]     = useState('');
  const [filterVenue,setFilterVenue]= useState('All');
  const [sortBy,     setSortBy]     = useState('newest');
  const [confirmDel, setConfirmDel] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!session) navigate('/admin');
  }, [session, navigate]);

  const load = useCallback(() => setRecords(getAllRecords()), []);

  useEffect(() => { load(); }, [load]);

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin');
  };

  const handleDelete = (id) => {
    deleteRecord(id);
    setConfirmDel(null);
    load();
  };

  // Unique venues for filter dropdown
  const venues = ['All', ...new Set(records.map(r => r.venue))];

  // Filter + search + sort
  const filtered = records
    .filter(r => filterVenue === 'All' || r.venue === filterVenue)
    .filter(r => {
      const q = search.toLowerCase();
      return (
        r.fullName?.toLowerCase().includes(q) ||
        r.venue?.toLowerCase().includes(q) ||
        r.mobile?.includes(q) ||
        r.date?.toLowerCase().includes(q) ||
        r.id?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => sortBy === 'newest'
      ? new Date(b.bookedAt) - new Date(a.bookedAt)
      : new Date(a.bookedAt) - new Date(b.bookedAt)
    );

  // Summary stats
  const totalRevenue  = records.reduce((s, r) => s + (r.price || 0), 0);
  const todayStr      = new Date().toDateString();
  const todayBookings = records.filter(r => new Date(r.bookedAt).toDateString() === todayStr).length;

  const formatBooked  = (iso) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString('en-IN')} ${d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
  };

  if (!session) return null;

  return (
    <div className="admin-dash">

      {/* ── Sidebar ── */}
      <aside className="admin-dash__sidebar">
        <div className="ads-logo">🏏 TurfAdmin</div>

        <nav className="ads-nav">
          <div className="ads-nav__item active">📋 Bookings</div>
        </nav>

        <div className="ads-profile">
          <div className="ads-profile__avatar">{session.name?.[0]}</div>
          <div className="ads-profile__info">
            <span className="ads-profile__name">{session.name}</span>
            <span className="ads-profile__role">{session.role}</span>
          </div>
          <button className="ads-logout" onClick={handleLogout} title="Logout">⏻</button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-dash__main">

        {/* Header */}
        <div className="adm-header">
          <div>
            <h1>Bookings Dashboard</h1>
            <p>Welcome back, {session.name}</p>
          </div>
          <button className="adm-refresh" onClick={load}>↻ Refresh</button>
        </div>

        {/* Stats */}
        <div className="adm-stats">
          <div className="adm-stat">
            <span className="adm-stat__icon">📋</span>
            <div>
              <div className="adm-stat__val">{records.length}</div>
              <div className="adm-stat__label">Total Bookings</div>
            </div>
          </div>
          <div className="adm-stat">
            <span className="adm-stat__icon">📅</span>
            <div>
              <div className="adm-stat__val">{todayBookings}</div>
              <div className="adm-stat__label">Today's Bookings</div>
            </div>
          </div>
          <div className="adm-stat">
            <span className="adm-stat__icon">💰</span>
            <div>
              <div className="adm-stat__val">₹{totalRevenue.toLocaleString()}</div>
              <div className="adm-stat__label">Total Revenue</div>
            </div>
          </div>
          <div className="adm-stat">
            <span className="adm-stat__icon">🏟️</span>
            <div>
              <div className="adm-stat__val">{new Set(records.map(r => r.venue)).size}</div>
              <div className="adm-stat__label">Venues Booked</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="adm-filters">
          <input
            className="adm-search"
            type="text"
            placeholder="🔍  Search by name, venue, mobile, date..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="adm-select" value={filterVenue} onChange={e => setFilterVenue(e.target.value)}>
            {venues.map(v => <option key={v}>{v}</option>)}
          </select>
          <select className="adm-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="adm-empty">
            <span>📭</span>
            <p>{records.length === 0 ? 'No bookings yet.' : 'No results match your search.'}</p>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Turf / Venue</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Duration</th>
                  <th>Amount</th>
                  <th>Booked At</th>
                  {session.role === 'Super Admin' && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td><span className="adm-id">{r.id}</span></td>
                    <td>
                      <div className="adm-customer">
                        <span className="adm-customer__name">{r.fullName || '—'}</span>
                        <span className="adm-customer__sub">{r.mobile}</span>
                        <span className="adm-customer__sub">{r.place}</span>
                      </div>
                    </td>
                    <td><span className="adm-venue">{r.venue}</span></td>
                    <td>{r.date}</td>
                    <td>
                      <span className="adm-time">
                        {r.startLabel} – {r.endLabel}
                      </span>
                    </td>
                    <td>{r.duration} hr{r.duration > 1 ? 's' : ''}</td>
                    <td><span className="adm-price">₹{r.price?.toLocaleString()}</span></td>
                    <td className="adm-booked-at">{formatBooked(r.bookedAt)}</td>
                    {session.role === 'Super Admin' && (
                      <td>
                        <button className="adm-del-btn" onClick={() => setConfirmDel(r.id)}>🗑</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="adm-count">{filtered.length} booking{filtered.length !== 1 ? 's' : ''} shown</div>
      </main>

      {/* Delete confirmation modal */}
      {confirmDel && (
        <div className="adm-modal-overlay" onClick={() => setConfirmDel(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Booking?</h3>
            <p>This will remove the record. The time slot will remain locked.</p>
            <div className="adm-modal__actions">
              <button className="adm-modal__cancel" onClick={() => setConfirmDel(null)}>Cancel</button>
              <button className="adm-modal__confirm" onClick={() => handleDelete(confirmDel)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
