export const ROLES = {
    USER: 'user',
    DRIVER: 'driver',
    ADMIN: 'admin'
};

export const TRIP_STATUS = {
    PENDING: 'PENDING',        // User just requested
    SEARCHING: 'SEARCHING',    // System looking for driver
    ASSIGNED: 'ASSIGNED',      // Driver accepted
    ARRIVING: 'ARRIVING',      // Driver reaching pickup
    OTP_READY: 'OTP_READY',    // Driver reached, waiting for OTP
    STARTED: 'STARTED',        // OTP verified, trip in progress
    COMPLETED: 'COMPLETED',    // Driver ended trip
    CANCELLED: 'CANCELLED'     // Trip aborted
};

export const VEHICLE_TYPES = {
    MINI: 'mini',
    SEDAN: 'sedan',
    SUV: 'suv',
    PREMIUM_SUV: 'premium_suv',
    TEMPO: 'tempo'
};

export const PRICING_MODES = {
    LOCAL: 'local',
    OUTSTATION_ONE_WAY: 'outstation_one_way',
    OUTSTATION_ROUND: 'outstation_round',
    TOUR: 'tour'
};
