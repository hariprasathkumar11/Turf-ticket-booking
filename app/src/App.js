import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/venues"          element={<Venues />} />
        <Route path="/format"          element={<FormatPage />} />
        <Route path="/book/:id"        element={<BookPage />} />
        <Route path="/submit"          element={<SubmitForm />} />
        <Route path="/confirmation"    element={<ConfirmationPage />} />
        <Route path="/admin"           element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*"                element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;