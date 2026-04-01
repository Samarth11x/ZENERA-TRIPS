const mongoose = require('mongoose');
const { KYC_STATUS, DRIVER_STATUS } = require('../utils/constants');

const driverSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    licenseNumber: {
        type: String,
        required: [true, 'License number is required'],
        unique: true,
        trim: true,
        index: true
    },
    vehicleDetails: {
        model: { type: String, required: true },
        plateNumber: { type: String, required: true },
        year: { type: Number, required: true },
        color: { type: String },
        capacity: { type: Number, default: 4 }
    },
    kycStatus: {
        type: String,
        enum: Object.values(KYC_STATUS),
        default: KYC_STATUS.PENDING
    },
    status: {
        type: String,
        enum: Object.values(DRIVER_STATUS),
        default: DRIVER_STATUS.OFFLINE
    },
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
    rating: {
        type: Number,
        default: 5.0
    },
    totalTrips: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Index for geo-spatial queries
driverSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Driver', driverSchema);
