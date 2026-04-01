import React, { createContext, useContext, useState, useMemo } from 'react';
import { PRICING_MODES, VEHICLE_TYPES } from '../utils/constants';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingData, setBookingData] = useState({
        step: 1,
        mode: PRICING_MODES.LOCAL,
        pickupLocation: '',
        destinationLocation: '',
        startDate: '',
        endDate: '',
        guests: 1,
        vehicleType: VEHICLE_TYPES.SEDAN,
        majorDestinations: [],
        detailedDestinations: [],
        pricingEstimate: null,
        paymentPreference: 0.25 // Default 25% advance
    });

    const updateBooking = (updates) => {
        setBookingData(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        setBookingData(prev => ({ ...prev, step: prev.step + 1 }));
    };

    const prevStep = () => {
        setBookingData(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
    };

    const resetBooking = () => {
        setBookingData({
            step: 1,
            mode: PRICING_MODES.LOCAL,
            pickupLocation: '',
            destinationLocation: '',
            startDate: '',
            endDate: '',
            guests: 1,
            vehicleType: VEHICLE_TYPES.SEDAN,
            majorDestinations: [],
            detailedDestinations: [],
            pricingEstimate: null,
            paymentPreference: 0.25
        });
    };

    const value = useMemo(() => ({
        bookingData,
        updateBooking,
        nextStep,
        prevStep,
        resetBooking
    }), [bookingData]);

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) throw new Error('useBooking must be used within a BookingProvider');
    return context;
};
