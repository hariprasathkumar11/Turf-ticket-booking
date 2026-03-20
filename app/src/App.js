import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Venues from './pages/Venues';
import FormatPage from './pages/FormatPage';
import BookPage from './pages/BookPage';
import SubmitForm from './pages/SubmitForm';
import ConfirmationPage from './pages/ConfirmationPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './styles/App.css';

// Admin routes don't show the Navbar
const AdminRoute = ({ element }) => element;

const App = () => {
  const isAdmin = window.location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/"              element={<Home />} />
        <Route path="/venues"        element={<Venues />} />
        <Route path="/format"        element={<FormatPage />} />
        <Route path="/book/:id"      element={<BookPage />} />
        <Route path="/submit"        element={<SubmitForm />} />
        <Route path="/confirmation"  element={<ConfirmationPage />} />

        {/* Admin routes */}
        <Route path="/admin"            element={<AdminRoute element={<AdminLogin />} />} />
        <Route path="/admin/dashboard"  element={<AdminRoute element={<AdminDashboard />} />} />
      </Routes>
    </>
  );
};

export default App;
