import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';

const steps = [
    { id: 1, label: 'Location' },
    { id: 2, label: 'Dates' },
    { id: 3, label: 'Cities' },
    { id: 4, label: 'Details' },
    { id: 5, label: 'Vehicle' },
    { id: 6, label: 'Payment' },
    { id: 7, label: 'Confirm' }
];

const BookingStepper = ({ currentStep }) => {
    const progress = (currentStep / steps.length) * 100;

    return (
        <div className="mb-5">
            <ProgressBar now={progress} variant="warning" style={{ height: '4px', background: 'var(--z-bg-graphite)' }} className="mb-4" />
            <Row className="text-center g-0">
                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    return (
                        <Col key={step.id}>
                            <motion.div 
                                initial={false}
                                animate={{ opacity: isActive || isCompleted ? 1 : 0.6, scale: isActive ? 1.05 : 1 }}
                                className="d-flex flex-column align-items-center"
                            >
                                <div className={`px-2 py-1 rounded-pill mb-1 fw-bold fs-xs ${isActive ? 'bg-primary text-dark shadow-glow' : 'text-muted border border-z'}`} style={{ fontSize: '0.7rem' }}>
                                    {isCompleted ? <i className="bi bi-check-lg"></i> : isActive ? `STEP ${step.id}` : step.id}
                                </div>
                                <span className={`small fw-600 ${isActive ? 'text-white d-block' : 'd-none d-md-block text-muted'}`} style={{ fontSize: '0.75rem' }}>
                                    {step.label}
                                </span>
                            </motion.div>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default BookingStepper;
