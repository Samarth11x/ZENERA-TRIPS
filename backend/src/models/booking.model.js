const mongoose = require('mongoose');
const { BOOKING_STATUS, TRIP_TYPES, VEHICLE_TYPES } = require('../utils/constants');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        index: true
    },
    tripType: {
        type: String,
        enum: Object.values(TRIP_TYPES),
        default: TRIP_TYPES.ONE_WAY
    },
    vehicleType: {
        type: String,
        enum: Object.values(VEHICLE_TYPES),
        default: VEHICLE_TYPES.SEDAN
    },
    pickupLocation: {
        address: { type: String, required: true },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        }
    },
    dropoffLocation: {
        address: { type: String, required: true },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        }
    },
    estimatedFare: {
        type: Number,
        required: true
    },
    advancePaid: {
        type: Number,
        default: 0
    },
    paymentOption: {
        type: String,
        enum: ['CASH', 'ONLINE'],
        default: 'CASH'
    },
    bookingStatus: {
        type: String,
        enum: Object.values(BOOKING_STATUS),
        default: BOOKING_STATUS.PENDING
    },
    otp: {
        type: String,
        required: true
    },
    odoReadingStart: {
        type: Number
    },
    odoReadingEnd: {
        type: Number
    },
    cancelledBy: {
        type: String,
        enum: ['USER', 'DRIVER', 'ADMIN']
    },
    cancellationReason: {
        type: String
    },
    cancelledAt: {
        type: Date
    },
    startedAt: {
        type: Date
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
