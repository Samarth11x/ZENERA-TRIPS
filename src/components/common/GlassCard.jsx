import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', onClick = null, animate = true }) => {
    const Component = animate ? motion.div : 'div';
    const animationProps = animate ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    } : {};

    return (
        <Component 
            {...animationProps}
            className={`card-glass p-4 ${className} ${onClick ? 'cursor-pointer hover-accent' : ''}`}
            onClick={onClick}
        >
            {children}
        </Component>
    );
};

export default GlassCard;
