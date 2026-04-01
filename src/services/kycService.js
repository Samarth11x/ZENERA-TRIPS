import { KYC_STATUS } from '../utils/constants';

const KYC_KEY = 'zenera_kyc_db';
const DRIVER_DB_KEY = 'zenera_drivers_db';

export const kycService = {
    uploadKyc: async (driverId, kycData) => {
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const db = JSON.parse(localStorage.getItem(KYC_KEY) || '{}');
        const submission = {
            id: 'KYC-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
            driverId,
            ...kycData,
            status: KYC_STATUS.PENDING,
            submittedAt: new Date().toISOString()
        };

        db[driverId] = submission;
        localStorage.setItem(KYC_KEY, JSON.stringify(db));
        
        // Update driver's KYC pointer
        const drivers = JSON.parse(localStorage.getItem(DRIVER_DB_KEY) || '[]');
        const idx = drivers.findIndex(d => d.uid === driverId);
        if (idx !== -1) {
            drivers[idx].kycStatus = KYC_STATUS.PENDING;
            localStorage.setItem(DRIVER_DB_KEY, JSON.stringify(drivers));
        }

        return submission;
    },

    getKycStatus: (driverId) => {
        const db = JSON.parse(localStorage.getItem(KYC_KEY) || '{}');
        return db[driverId] || null;
    },

    getPendingSubmissions: () => {
        const db = JSON.parse(localStorage.getItem(KYC_KEY) || '{}');
        return Object.values(db).filter(s => s.status === KYC_STATUS.PENDING || s.status === KYC_STATUS.VERIFYING);
    },

    approveKyc: async (kycId, driverId) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const db = JSON.parse(localStorage.getItem(KYC_KEY) || '{}');
        if (db[driverId]) {
            db[driverId].status = KYC_STATUS.APPROVED;
            db[driverId].approvedAt = new Date().toISOString();
            localStorage.setItem(KYC_KEY, JSON.stringify(db));
        }

        // Update main driver profile
        const drivers = JSON.parse(localStorage.getItem(DRIVER_DB_KEY) || '[]');
        const idx = drivers.findIndex(d => d.uid === driverId);
        if (idx !== -1) {
            drivers[idx].kycStatus = KYC_STATUS.APPROVED;
            localStorage.setItem(DRIVER_DB_KEY, JSON.stringify(drivers));
        }

        return { success: true, fcExpiry: '2028-12-31', dlExpiry: '2030-05-15' };
    }
};
