import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Portals & Components
import LandingPage from './pages/public/LandingPage';
import AuthPage from './pages/public/AuthPage';
import RegisterPage from './pages/public/RegisterPage';
import PlannerPage from './pages/public/PlannerPage';

// User Portal
import UserDash from './pages/user/UserDash';
import RideBooking from './pages/user/RideBooking';
import RideTracking from './pages/user/RideTracking';

// Driver Portal
import DriverDash from './pages/driver/DriverDash';
import DriverKycPage from './pages/driver/DriverKycPage';
import RideRequests from './pages/driver/RideRequests';
import RideExecution from './pages/driver/RideExecution';

// Admin Portal
import AdminDash from './pages/admin/AdminDash';
import AdminKycQueue from './pages/admin/AdminKycQueue';
import AdminBookingManager from './pages/admin/AdminBookingManager';

// Shared
import RoleRoute from './components/common/RoleRoute';
import AppNavbar from './components/common/AppNavbar';
import BottomNav from './components/common/BottomNav';
import AppToast from './components/common/AppToast';
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
                <Route path="/user/home" element={<RoleRoute allowedRoles={[ROLES.USER]}><UserDash /></RoleRoute>} />
                <Route path="/user/book" element={<RoleRoute allowedRoles={[ROLES.USER]}><RideBooking /></RoleRoute>} />
                <Route path="/user/tracking" element={<RoleRoute allowedRoles={[ROLES.USER]}><RideTracking /></RoleRoute>} />
                <Route path="/user/history" element={<RoleRoute allowedRoles={[ROLES.USER]}><div className="p-5 text-center text-muted">Ride History Coming Soon</div></RoleRoute>} />
                <Route path="/user/profile" element={<RoleRoute allowedRoles={[ROLES.USER]}><div className="p-5 text-center text-muted">Profile Settings Coming Soon</div></RoleRoute>} />

                {/* Driver Portal */}
                <Route path="/driver/home" element={<RoleRoute allowedRoles={[ROLES.DRIVER]}><DriverDash /></RoleRoute>} />
                <Route path="/driver/kyc" element={<RoleRoute allowedRoles={[ROLES.DRIVER]}><DriverKycPage /></RoleRoute>} />
                <Route path="/driver/requests" element={<RoleRoute allowedRoles={[ROLES.DRIVER]}><RideRequests /></RoleRoute>} />
                <Route path="/driver/active" element={<RoleRoute allowedRoles={[ROLES.DRIVER]}><RideExecution /></RoleRoute>} />
                <Route path="/driver/earnings" element={<RoleRoute allowedRoles={[ROLES.DRIVER]}><div className="p-5 text-center text-muted">Earnings Detailed View Coming Soon</div></RoleRoute>} />
                <Route path="/driver/profile" element={<RoleRoute allowedRoles={[ROLES.DRIVER]}><div className="p-5 text-center text-muted">Partner Profile Coming Soon</div></RoleRoute>} />

                {/* Admin Portal */}
                <Route path="/admin/dashboard" element={<RoleRoute allowedRoles={[ROLES.ADMIN]}><AdminDash /></RoleRoute>} />
                <Route path="/admin/kyc" element={<RoleRoute allowedRoles={[ROLES.ADMIN]}><AdminKycQueue /></RoleRoute>} />
                <Route path="/admin/bookings" element={<RoleRoute allowedRoles={[ROLES.ADMIN]}><AdminBookingManager /></RoleRoute>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <div className="zenera-app bg-black min-vh-100 flex-column d-flex overflow-hidden">
            <AppNavbar />
            <ScrollToTop />
            <main className="flex-grow-1">
                <AnimatedRoutes />
            </main>
            <BottomNav />
            <AppToast />
        </div>
    );
}

export default App;
