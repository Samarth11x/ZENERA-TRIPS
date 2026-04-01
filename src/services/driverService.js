import { KYC_STATUS } from '../utils/constants';

const DRIVER_DB_KEY = 'zenera_drivers_db';
const ONLINE_DRIVERS_KEY = 'zenera_online_drivers';

export const driverService = {
    getDriverProfile: (driverId) => {
        const drivers = JSON.parse(localStorage.getItem(DRIVER_DB_KEY) || '[]');
        return drivers.find(d => d.uid === driverId) || null;
    },

    toggleOnlineStatus: async (driverId, isOnline) => {
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const drivers = JSON.parse(localStorage.getItem(DRIVER_DB_KEY) || '[]');
        const driverIdx = drivers.findIndex(d => d.uid === driverId);
        
        if (driverIdx === -1) throw new Error('Driver not found');
        
        // Critical Rule: Block if KYC not approved
        if (isOnline && drivers[driverIdx].kycStatus !== KYC_STATUS.APPROVED) {
            throw new Error('KYC verification required to go online');
        }

        drivers[driverIdx].isOnline = isOnline;
        localStorage.setItem(DRIVER_DB_KEY, JSON.stringify(drivers));

        const onlineDrivers = JSON.parse(localStorage.getItem(ONLINE_DRIVERS_KEY) || '[]');
        if (isOnline) {
            if (!onlineDrivers.includes(driverId)) onlineDrivers.push(driverId);
        } else {
            const idx = onlineDrivers.indexOf(driverId);
            if (idx !== -1) onlineDrivers.splice(idx, 1);
        }
        localStorage.setItem(ONLINE_DRIVERS_KEY, JSON.stringify(onlineDrivers));

        return { success: true, isOnline };
    },

    getOnlineDrivers: () => {
        return JSON.parse(localStorage.getItem(ONLINE_DRIVERS_KEY) || '[]');
    }
};
