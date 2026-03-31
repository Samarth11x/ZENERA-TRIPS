import { PRICING_MODES } from './constants';

export const calculateFare = ({
    mode = PRICING_MODES.LOCAL,
    vehicleType = 'sedan',
    distance = 0,
    days = 1,
    pricingData = {}
}) => {
    const config = pricingData[vehicleType] || {};
    const rate = config.ratePerKm || 15;
    const minKmPerDay = config.minKmPerDay || 250;
    const allowancePerDay = config.allowancePerDay || 500;

    let baseFare = 0;
    let allowanceTotal = 0;
    let billableKm = distance;

    if (mode === PRICING_MODES.LOCAL) {
        // Point-to-point local pricing
        baseFare = Math.max(distance * rate, 300); // Min 300 for local
        allowanceTotal = 0;
    } else {
        // Outstation / Tour pricing
        const totalMinKm = minKmPerDay * days;
        billableKm = Math.max(distance, totalMinKm);
        baseFare = billableKm * rate;
        allowanceTotal = allowancePerDay * days;
    }

    const platformFee = 49;
    const subtotal = baseFare + allowanceTotal + platformFee;
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const grandTotal = subtotal + tax;

    return {
        baseFare,
        allowanceTotal,
        billableKm,
        platformFee,
        tax,
        grandTotal,
        minBillableKm: mode === PRICING_MODES.LOCAL ? 0 : (minKmPerDay * days)
    };
};
