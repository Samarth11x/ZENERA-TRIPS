import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ROLES } from '../utils/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Current user and role with persistence
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('zenera_auth');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('zenera_auth', JSON.stringify(user));
        } else {
            localStorage.removeItem('zenera_auth');
        }
    }, [user]);

    const login = (role = ROLES.USER) => {
        setUser({
            id: role === ROLES.USER ? 'U1' : (role === ROLES.DRIVER ? 'D1' : 'A1'),
            name: role === ROLES.USER ? 'Samarth' : (role === ROLES.DRIVER ? 'Driver Partner' : 'Admin'),
            role
        });
    };

    const logout = () => {
        setUser(null);
    };

    const value = useMemo(() => ({
        user,
        role: user?.role || null,
        login,
        logout,
        isAuthenticated: !!user
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
