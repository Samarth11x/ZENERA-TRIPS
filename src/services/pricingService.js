import { VEHICLE_TYPES, PRICING_MODES } from '../utils/constants';

export const pricingService = {
    // Basic rates for MVP
    RATES: {
        [VEHICLE_TYPES.MINI]: { perKm: 12, base: 100, minKm: 3 },
        [VEHICLE_TYPES.SEDAN]: { perKm: 15, base: 150, minKm: 5 },
        [VEHICLE_TYPES.SUV]: { perKm: 22, base: 300, minKm: 5 },
        [VEHICLE_TYPES.PREMIUM_SUV]: { perKm: 28, base: 500, minKm: 10 }
    },

    ALLOWANCES: {
        DRIVER_DAY: 400,
        DRIVER_NIGHT: 300
    },

    calculateLocalRideFare: (distanceKm, vehicleType) => {
        const rate = pricingService.RATES[vehicleType] || pricingService.RATES[VEHICLE_TYPES.SEDAN];
        const distance = Math.max(distanceKm, rate.minKm);
        const fare = rate.base + (distance * rate.perKm);
        return Math.round(fare);
    },

    calculateTourFare: ({ vehicleType, tripDays, estimatedKm }) => {
        const rate = pricingService.RATES[vehicleType] || pricingService.RATES[VEHICLE_TYPES.SEDAN];
        // Minimum KM rule (250km/day)
        const minKm = tripDays * 250;
        const billableKm = Math.max(estimatedKm, minKm);
        
        const baseFare = billableKm * rate.perKm;
        const driverAllowance = tripDays * pricingService.ALLOWANCES.DRIVER_DAY;
        
        return {
            baseFare,
            driverAllowance,
            total: baseFare + driverAllowance,
            minKm
        };
    },

    calculateFinalFare: ({ distanceKm, vehicleType, tripDays, nightStays, advancePaid }) => {
        const rate = pricingService.RATES[vehicleType] || pricingService.RATES[VEHICLE_TYPES.SEDAN];
        const billableKm = Math.max(distanceKm, tripDays * 250);
        
        const baseFare = billableKm * rate.perKm;
        const driverAllowance = tripDays * pricingService.ALLOWANCES.DRIVER_DAY;
        const nightCharge = (nightStays || 0) * pricingService.ALLOWANCES.DRIVER_NIGHT;
        
        const grandTotal = baseFare + driverAllowance + nightCharge;
        const remaining = grandTotal - (advancePaid || 0);

        return {
            totalKm: distanceKm,
            baseFare,
            driverAllowance,
            nightCharge,
            grandTotal,
            advancePaid,
            remainingToPay: remaining
        };
    }
};
