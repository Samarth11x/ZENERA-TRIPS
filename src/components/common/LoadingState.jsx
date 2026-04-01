import React from 'react';
import { Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';

const LoadingState = ({ message = 'Loading...', fullPage = false }) => {
    const content = (
        <div className="d-flex flex-column align-items-center justify-content-center p-5 text-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="mb-4"
            >
                <i className="bi bi-stars fs-1 text-accent shadow-glow"></i>
            </motion.div>
            <h5 className="text-white fw-800 text-uppercase tracking-wider">{message}</h5>
            <p className="text-muted small">Please wait while we sync with the server.</p>
        </div>
    );

    if (fullPage) {
        return (
            <div className="bg-black vh-100 d-flex align-items-center justify-content-center overflow-hidden">
                {content}
            </div>
        );
    }

    return content;
};

export default LoadingState;
