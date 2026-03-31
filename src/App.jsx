import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { TripProvider } from './context/TripContext';
import LandingPage from './pages/public/LandingPage';
import AuthPage from './pages/public/AuthPage';
import RegisterPage from './pages/public/RegisterPage';
import PlannerPage from './pages/public/PlannerPage';

// User Portal Pages
import UserDash from './pages/user/UserDash';
import RideBooking from './pages/user/RideBooking';
import RideTracking from './pages/user/RideTracking';

// Driver Portal Pages
import DriverDash from './pages/driver/DriverDash';

// Admin Portal Pages
import AdminDash from './pages/admin/AdminDash';

// Shared Components
import RoleRoute from './components/common/RoleRoute';
import AppNavbar from './components/common/AppNavbar';
import BottomNav from './components/common/BottomNav';
import { ROLES } from './utils/constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/planner" element={<PlannerPage />} />

                {/* User Portal */}
                <Route path="/user/*" element={
                    <RoleRoute allowedRoles={[ROLES.USER]}>
                        <Routes>
                            <Route path="/" element={<UserDash />} />
                            <Route path="/book" element={<RideBooking />} />
                            <Route path="/trip" element={<RideTracking />} />
                            <Route path="/history" element={<div className="p-4 text-white">Ride History...</div>} />
                            <Route path="/profile" element={<div className="p-4 text-white">User Profile...</div>} />
                        </Routes>
                    </RoleRoute>
                } />

                {/* Driver Portal */}
                <Route path="/driver/*" element={
                    <RoleRoute allowedRoles={[ROLES.DRIVER]}>
                        <Routes>
                            <Route path="/" element={<DriverDash />} />
                            <Route path="/earnings" element={<div className="p-4 text-white">Earnings...</div>} />
                            <Route path="/profile" element={<div className="p-4 text-white">Driver Profile...</div>} />
                        </Routes>
                    </RoleRoute>
                } />

                {/* Admin Portal */}
                <Route path="/admin/*" element={
                    <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                        <AdminDash />
                    </RoleRoute>
                } />

                <Route path="*" element={<LandingPage />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
            <TripProvider>
              <ScrollToTop />
              <div className="zenera-app bg-black min-vh-100 flex-column d-flex overflow-hidden">
                <AppNavbar />
                <main className="flex-grow-1 pb-5">
                    <AnimatedRoutes />
                </main>
                <BottomNav />
              </div>
            </TripProvider>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
