import React, { createContext, useContext, useState, useMemo } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingRequest, setBookingRequest] = useState({
        step: 1,
        mode: 'local',
        pickup: null,
        destination: null,
        itinerary: [],
        vehicleType: 'sedan',
        dates: { start: '', end: '' },
        pricing: null
    });

    const updateRequest = (data) => {
        setBookingRequest(prev => ({ ...prev, ...data }));
    };

    const resetBooking = () => {
        setBookingRequest({
            step: 1,
            mode: 'local',
            pickup: null,
            destination: null,
            itinerary: [],
            vehicleType: 'sedan',
            dates: { start: '', end: '' },
            pricing: null
        });
    };

    const value = useMemo(() => ({
        bookingRequest,
        updateRequest,
        resetBooking
    }), [bookingRequest]);

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
