import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

const BottomNav = () => {
    const { isAuthenticated, role } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) return null;

    const navItems = {
        [ROLES.USER]: [
            { icon: 'bi-house-door', label: 'Home', path: '/user' },
            { icon: 'bi-clock-history', label: 'Rides', path: '/user/history' },
            { icon: 'bi-person', label: 'Profile', path: '/user/profile' },
        ],
        [ROLES.DRIVER]: [
            { icon: 'bi-speedometer2', label: 'Dash', path: '/driver' },
            { icon: 'bi-wallet2', label: 'Earnings', path: '/driver/earnings' },
            { icon: 'bi-person-badge', label: 'Account', path: '/driver/profile' },
        ],
        [ROLES.ADMIN]: [
            { icon: 'bi-kanban', label: 'Overview', path: '/admin' },
            { icon: 'bi-people', label: 'Partners', path: '/admin/drivers' },
            { icon: 'bi-gear', label: 'Settings', path: '/admin/settings' },
        ]
    };

    const items = navItems[role] || [];

    return (
        <div className="fixed-bottom bg-dark border-top border-z d-lg-none py-2 safe-area-bottom shadow-glow">
            <Nav className="justify-content-around align-items-center">
                {items.map((item, idx) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Nav.Link 
                            key={idx} 
                            as={Link} 
                            to={item.path}
                            className={`d-flex flex-column align-items-center p-0 transition-smooth relative position-relative ${isActive ? 'text-accent' : 'text-muted'}`}
                        >
                            <motion.div
                                initial={false}
                                animate={{ y: isActive ? -2 : 0, scale: isActive ? 1.1 : 1 }}
                            >
                                <i className={`bi ${isActive ? item.icon + '-fill' : item.icon} fs-5`}></i>
                            </motion.div>
                            <span style={{ fontSize: '10px' }} className="mt-1 fw-bold text-uppercase letter-spacing-tight">{item.label}</span>
                            {isActive && (
                                <motion.div 
                                    layoutId="bottom-nav-active"
                                    className="position-absolute bg-accent rounded-circle"
                                    style={{ bottom: '-6px', width: '4px', height: '4px', boxShadow: '0 0 8px var(--accent)' }}
                                />
                            )}
                        </Nav.Link>
                    );
                })}
            </Nav>
        </div>
    );
};

export default BottomNav;
