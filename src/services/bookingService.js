import { TRIP_STATUS } from '../utils/constants';

const BOOKINGS_KEY = 'zenera_bookings_db';
const TRIPS_KEY = 'zenera_trips_db';

export const bookingService = {
    createBooking: async (bookingData) => {
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        const newBooking = {
            id: 'BK-' + Math.floor(Math.random() * 100000),
            ...bookingData,
            status: TRIP_STATUS.SEARCHING,
            otp: null,
            createdAt: new Date().toISOString()
        };

        bookings.push(newBooking);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
        return newBooking;
    },

    getAvailableForDrivers: () => {
        const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        return bookings.filter(b => b.status === TRIP_STATUS.SEARCHING);
    },

    acceptBooking: async (bookingId, driverInfo) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        const idx = bookings.findIndex(b => b.id === bookingId);
        
        if (idx !== -1) {
            const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
            bookings[idx].status = TRIP_STATUS.DRIVER_ASSIGNED;
            bookings[idx].driver = driverInfo;
            bookings[idx].otp = otpCode; // Centrally generated OTP
            
            localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
            return bookings[idx];
        }
        throw new Error('Booking not found');
    },

    getUserBookings: (userId) => {
        const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        return bookings.filter(b => b.userId === userId);
    },

    getDriverBookings: (driverId) => {
        const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        return bookings.filter(b => b.driver?.id === driverId);
    },

    updateBookingStatus: async (bookingId, status) => {
        const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        const idx = bookings.findIndex(b => b.id === bookingId);
        if (idx !== -1) {
            bookings[idx].status = status;
            localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
            return bookings[idx];
        }
        return null;
    }
};
