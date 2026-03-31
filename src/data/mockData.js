export const VEHICLE_PRICING = {
    hatch: {
        name: 'Hatchback',
        ratePerKm: 12,
        minKmPerDay: 250,
        allowancePerDay: 400,
        commissionPerKm: 1.5,
        icon: 'bi-car-front',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800'
    },
    sedan: {
        name: 'Premium Sedan',
        ratePerKm: 15,
        minKmPerDay: 250,
        allowancePerDay: 500,
        commissionPerKm: 2.0,
        icon: 'bi-car-front-fill',
        image: '/assets/sedan.png'
    },
    suv: {
        name: 'Luxury SUV',
        ratePerKm: 20,
        minKmPerDay: 300,
        allowancePerDay: 600,
        commissionPerKm: 2.0,
        icon: 'bi-truck-flatbed',
        image: '/assets/suv.png'
    },
    tempo: {
        name: 'Tempo Traveller',
        ratePerKm: 25,
        minKmPerDay: 300,
        allowancePerDay: 800,
        commissionPerKm: 2.5,
        icon: 'bi-bus-front',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
    }
};

export const MOCK_BOOKINGS = [
    {
        id: 'ZT-101',
        customer: 'Samarth',
        pickupLocation: 'Bangalore',
        startDate: '2026-04-10',
        endDate: '2026-04-13',
        status: 'Confirmed',
        vehicleType: 'suv'
    }
];
