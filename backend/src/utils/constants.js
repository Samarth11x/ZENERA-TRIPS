const USER_ROLES = Object.freeze({
    USER: 'USER',
    DRIVER: 'DRIVER',
    ADMIN: 'ADMIN'
});

const BOOKING_STATUS = Object.freeze({
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    STARTED: 'STARTED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
});

const KYC_STATUS = Object.freeze({
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
});

const DRIVER_STATUS = Object.freeze({
    AVAILABLE: 'AVAILABLE',
    BUSY: 'BUSY',
    OFFLINE: 'OFFLINE'
});

const VEHICLE_TYPES = Object.freeze({
    SEDAN: 'SEDAN',
    SUV: 'SUV',
    LUXURY: 'LUXURY'
});

const TRIP_TYPES = Object.freeze({
    ONE_WAY: 'ONE_WAY',
    ROUND_TRIP: 'ROUND_TRIP'
});

module.exports = {
    USER_ROLES,
    BOOKING_STATUS,
    KYC_STATUS,
    DRIVER_STATUS,
    VEHICLE_TYPES,
    TRIP_TYPES
};
