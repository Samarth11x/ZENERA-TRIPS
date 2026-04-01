import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { TRIP_STATUS } from '../utils/constants';
import { bookingService } from '../services/bookingService';
import { otpService } from '../services/otpService';
import { pricingService } from '../services/pricingService';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [activeTrip, setActiveTrip] = useState(() => {
        const saved = localStorage.getItem('zenera_active_trip');
        return saved ? JSON.parse(saved) : null;
    });

    const [availableRequests, setAvailableRequests] = useState([]);

    useEffect(() => {
        if (activeTrip) {
            localStorage.setItem('zenera_active_trip', JSON.stringify(activeTrip));
        } else {
            localStorage.removeItem('zenera_active_trip');
        }
    }, [activeTrip]);

    const refreshAvailableRequests = () => {
        const requests = bookingService.getAvailableForDrivers();
        setAvailableRequests(requests);
    };

    const createTripRequest = async (bookingData) => {
        const booking = await bookingService.createBooking(bookingData);
        setActiveTrip(booking);
        return booking;
    };

    const acceptTrip = async (bookingId, driverInfo) => {
        const updated = await bookingService.acceptBooking(bookingId, driverInfo);
        setActiveTrip(updated);
        return updated;
    };

    const startTrip = async (bookingId, otp, startOdometer) => {
        if (!activeTrip || activeTrip.id !== bookingId) throw new Error('Trip mismatch');
        
        if (otpService.verify(otp, activeTrip.otp)) {
            const updated = await bookingService.updateBookingStatus(bookingId, TRIP_STATUS.TRIP_STARTED);
            setActiveTrip({ ...updated, startOdometer, tripStartedAt: new Date().toISOString() });
            return true;
        }
        throw new Error('Invalid OTP');
    };

    const endTrip = async (bookingId, endOdometer) => {
        if (!activeTrip || activeTrip.id !== bookingId) throw new Error('Trip mismatch');
        
        const totalKm = parseFloat(endOdometer) - parseFloat(activeTrip.startOdometer || 0);
        const billing = pricingService.calculateFinalFare({
            distanceKm: totalKm,
            vehicleType: activeTrip.vehicleType,
            tripDays: activeTrip.tripDays || 1,
            advancePaid: activeTrip.advancePaid || 0
        });

        const updated = await bookingService.updateBookingStatus(bookingId, TRIP_STATUS.TRIP_COMPLETED);
        setActiveTrip({ ...updated, endOdometer, totalKm, billing, tripEndedAt: new Date().toISOString() });
        return { success: true, billing };
    };

    const cancelTrip = async (bookingId) => {
        const updated = await bookingService.updateBookingStatus(bookingId, TRIP_STATUS.CANCELLED);
        setActiveTrip(null);
        return updated;
    };

    const value = useMemo(() => ({
        activeTrip,
        availableRequests,
        refreshAvailableRequests,
        createTripRequest,
        acceptTrip,
        startTrip,
        endTrip,
        cancelTrip,
        setActiveTrip
    }), [activeTrip, availableRequests]);

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
