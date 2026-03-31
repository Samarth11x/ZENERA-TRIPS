import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrip } from '../../context/TripContext';
import { TRIP_STATUS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ZeneraMap from '../../components/common/ZeneraMap';

const RideTracking = () => {
    const { activeTrip, cancelTrip } = useTrip();
    const navigate = useNavigate();

    if (!activeTrip) {
        return (
            <div className="bg-black min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <i className="bi bi-geo-alt fs-1 text-muted"></i>
                    <p className="text-muted mt-3">No active trip found</p>
                    <Button onClick={() => navigate('/user')} variant="outline-accent" size="sm">Back home</Button>
                </div>
            </div>
        );
    }

    const { status, driver, otp } = activeTrip;

    return (
        <div className="ride-tracking bg-black min-vh-100 pb-5">
            <Container className="pt-4 px-4 overflow-hidden">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <button className="btn btn-dark rounded-circle p-1 border-z" onClick={() => navigate('/user')}>
                        <i className="bi bi-chevron-left fs-4"></i>
                    </button>
                    <h4 className="text-white fw-bold mb-0">Ride Details</h4>
                </div>

                {/* Map Integration */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-4 position-relative z-0"
                >
                    <ZeneraMap trip={activeTrip} />
                </motion.div>

                {/* Status Card */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-4"
                >
                    <Card className="card-glass border-z p-4 text-center shadow-glow">
                        <Badge bg="accent" text="dark" className="px-3 py-2 fw-bold mb-3">
                            {status.replace('_', ' ')}
                        </Badge>
                        <h2 className="text-white mb-3">
                            {status === TRIP_STATUS.SEARCHING ? 'Finding your Driver...' : 
                             status === TRIP_STATUS.STARTED ? 'On your way' : 'Driver is Arriving'}
                        </h2>
                        
                        {status === TRIP_STATUS.SEARCHING && (
                            <div className="position-relative my-5 py-4 d-flex justify-content-center align-items-center">
                                <motion.div
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                                    className="position-absolute bg-accent rounded-circle"
                                    style={{ width: '80px', height: '80px' }}
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeOut" }}
                                    className="position-absolute bg-accent rounded-circle"
                                    style={{ width: '80px', height: '80px' }}
                                />
                                <div className="z-index-10 bg-accent rounded-circle d-flex align-items-center justify-content-center shadow-accent" style={{ width: '60px', height: '60px' }}>
                                    <i className="bi bi-broadcast text-dark fs-3"></i>
                                </div>
                            </div>
                        )}

                        <p className="text-muted small mt-2">
                            {status === TRIP_STATUS.SEARCHING ? 'Nearby drivers are being notified' : 'Driver will reach you in approx. 8 mins'}
                        </p>
                    </Card>
                </motion.div>

                {/* Driver Info Card */}
                <AnimatePresence>
                    {(status !== TRIP_STATUS.SEARCHING) && (
                        <motion.div 
                            initial={{ x: 30, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }}
                            className="mb-4"
                        >
                            <Card className="card-glass border-z p-3 shadow-glow">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center p-1 border-z" style={{ width: '60px', height: '60px' }}>
                                        <i className="bi bi-person-check text-accent fs-2"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="text-white fw-bold mb-0">{driver?.name}</h5>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="text-accent small"><i className="bi bi-star-fill me-1"></i>{driver?.rating}</span>
                                            <span className="text-muted small">• {driver?.vehicle}</span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <div className="text-white fw-bold small">{driver?.plate}</div>
                                        <Button variant="outline-accent" size="sm" className="mt-1 border-z p-1 px-2"><i className="bi bi-telephone"></i></Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* OTP Card */}
                {status === TRIP_STATUS.OTP_READY && (
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-4"
                    >
                        <Card className="card-glass border-z p-4 text-center shadow-glow shadow-accent">
                            <h6 className="text-accent fw-bold small mb-2">PIN TO START RIDE</h6>
                            <h1 className="display-3 fw-800 text-white letter-spacing-wide mb-3">{otp}</h1>
                            <p className="text-muted small">Share this 4-digit code with your driver only after you are inside the vehicle.</p>
                        </Card>
                    </motion.div>
                )}

                {/* Trip Route Card */}
                <Card className="card-glass border-z p-3 mb-4">
                    <div className="d-flex align-items-start gap-3">
                        <div className="d-flex flex-column align-items-center pt-1" style={{ width: '20px' }}>
                            <div className="rounded-circle bg-accent" style={{ width: '10px', height: '10px' }}></div>
                            <div className="border-start border-z border-2 h-10 my-2 shadow-glow" style={{ height: '30px', minHeight: '30px' }}></div>
                            <div className="rounded-0 bg-white" style={{ width: '10px', height: '10px' }}></div>
                        </div>
                        <div className="flex-grow-1">
                            <div className="mb-4">
                                <div className="text-accent small fw-bold">PICKUP</div>
                                <div className="text-white fw-semibold">{activeTrip.pickup || 'Searching...'}</div>
                            </div>
                            <div>
                                <div className="text-white small fw-bold opacity-50">DESTINATION</div>
                                <div className="text-white fw-semibold">{activeTrip.destination || 'Searching...'}</div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Cancel Action */}
                <div className="d-grid gap-3">
                    <Button variant="outline-danger" className="py-3 border-z transition-smooth opacity-75 hover-opacity-100" onClick={cancelTrip}>
                        Cancel Ride
                    </Button>
                    <Button variant="outline-light" className="py-3 border-z op-50" disabled>
                        Safety Center
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default RideTracking;
