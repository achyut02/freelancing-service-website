import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ProviderProfilePage from './pages/ProviderProfilePage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              {/* Category landing pages like /healthcare, /fitness, /transportation, etc. */}
              <Route path="/:category" element={<SearchPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/provider/:id" element={<ProviderProfilePage />} />
              <Route path="/book/:providerId" element={<BookingPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Optional: simple 404 - could be improved with a dedicated page */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;