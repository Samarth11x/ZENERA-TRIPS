import { ROLES } from '../utils/constants';

const AUTH_KEY = 'zenera_auth_session';
const USERS_KEY = 'zenera_users_db';

export const authService = {
    login: async (email, password) => {
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.email === email);

        if (user && user.password === password) {
            const session = { 
                uid: user.uid, 
                email: user.email, 
                role: user.role, 
                name: user.name,
                profileCompleted: user.profileCompleted || false
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(session));
            return session;
        }
        
        // Hardcoded admin for testing
        if (email === 'admin@zenera.com' && password === 'admin123') {
            const session = { uid: 'admin-1', email, role: ROLES.ADMIN, name: 'Main Admin' };
            localStorage.setItem(AUTH_KEY, JSON.stringify(session));
            return session;
        }

        throw new Error('Invalid credentials');
    },

    signup: async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        
        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email already exists');
        }

        const newUser = {
            ...userData,
            uid: 'u-' + Math.random().toString(36).substr(2, 9),
            profileCompleted: false
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return newUser;
    },

    logout: () => {
        localStorage.removeItem(AUTH_KEY);
    },

    getCurrentSession: () => {
        const session = localStorage.getItem(AUTH_KEY);
        return session ? JSON.parse(session) : null;
    }
};
