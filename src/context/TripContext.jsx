import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { TRIP_STATUS } from '../utils/constants';
import { otpService } from '../services/otpService';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    // Persistent trip state
    const [activeTrip, setActiveTrip] = useState(() => {
        const saved = localStorage.getItem('zenera_active_trip');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (activeTrip) {
            localStorage.setItem('zenera_active_trip', JSON.stringify(activeTrip));
        } else {
            localStorage.removeItem('zenera_active_trip');
        }
    }, [activeTrip]);

    // Cross-Tab Sync: Listen for storage changes from other tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'zenera_active_trip') {
                const updatedTrip = e.newValue ? JSON.parse(e.newValue) : null;
                setActiveTrip(updatedTrip);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Mock: When a trip is requested, simulate driver assignment
    const requestRide = (rideData) => {
        const id = 'ZT-' + Math.floor(Math.random() * 10000);
        const newTrip = {
            id,
            ...rideData,
            status: TRIP_STATUS.SEARCHING,
            otp: null,
            driver: null,
            paymentStatus: 'PENDING',
            createdAt: new Date().toISOString()
        };
        setActiveTrip(newTrip);
        // Note: No automatic assignment anymore. Driver must accept manually.
    };

    const acceptRide = (driverInfo) => {
        setActiveTrip(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                status: TRIP_STATUS.ASSIGNED,
                driver: driverInfo || {
                    id: 'D1',
                    name: 'Rajesh Kumar',
                    rating: 4.8,
                    vehicle: 'White Maruti Dzire',
                    plate: 'KA-01-MJ-1234'
                }
            };
        });
    };

    const updateStatus = (status) => {
        setActiveTrip(prev => {
            if (!prev) return prev;
            const updates = { status };
            // Auto-generate OTP when ready
            if (status === TRIP_STATUS.OTP_READY && !prev.otp) {
                updates.otp = otpService.generate();
            }
            return { ...prev, ...updates };
        });
    };

    const verifyTripOTP = (input) => {
        if (!activeTrip || !activeTrip.otp) return false;
        if (otpService.verify(input, activeTrip.otp)) {
            updateStatus(TRIP_STATUS.STARTED);
            return true;
        }
        return false;
    };

    const completeTrip = () => {
        updateStatus(TRIP_STATUS.COMPLETED);
    };

    const cancelTrip = () => {
        updateStatus(TRIP_STATUS.CANCELLED);
        setTimeout(() => setActiveTrip(null), 2000);
    };

    const resetTrip = () => setActiveTrip(null);

    const value = useMemo(() => ({
        activeTrip,
        requestRide,
        acceptRide,
        updateStatus,
        verifyTripOTP,
        completeTrip,
        cancelTrip,
        resetTrip
    }), [activeTrip]);

    return (
        <TripContext.Provider value={value}>
            {children}
        </TripContext.Provider>
    );
};

export const useTrip = () => {
    const context = useContext(TripContext);
    if (!context) throw new Error('useTrip must be used within a TripProvider');
    return context;
};
