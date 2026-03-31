import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { TRIP_STATUS } from '../../utils/constants';
import ZeneraMap from '../../components/common/ZeneraMap';

const DriverDash = () => {
    const { user } = useAuth();
    const { activeTrip, acceptRide, updateStatus, verifyTripOTP, completeTrip, cancelTrip } = useTrip();
    const [isOnline, setIsOnline] = useState(true);
    const [otpInput, setOtpInput] = useState('');
    const [otpError, setOtpError] = useState(false);

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setOtpError(false);
        const success = verifyTripOTP(otpInput);
        if (!success) {
            setOtpError(true);
        } else {
            setOtpInput('');
        }
    };

    return (
        <div className="driver-portal bg-black min-vh-100 pb-5">
            <Container className="pt-4 px-4 overflow-hidden">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="text-white fw-800 mb-1">Driver Partner</h2>
                        <div className="d-flex align-items-center gap-2">
                            <i className={`bi bi-circle-fill ${isOnline ? 'text-success' : 'text-danger'}`} style={{ fontSize: '10px' }}></i>
                            <span className="text-muted small fw-bold">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                        </div>
                    </div>
                    <Form.Check 
                        type="switch" 
                        id="online-switch" 
                        className="custom-switch-accent" 
                        checked={isOnline}
                        onChange={(e) => setIsOnline(e.target.checked)}
                    />
                </div>

                {/* Earnings Summary */}
                <Row className="g-3 mb-4">
                    <Col xs={6}>
                        <Card className="card-glass border-z p-3 text-center shadow-glow bg-gradient-dark">
                            <div className="text-muted small fw-bold mb-1 opacity-75">TODAY'S EARNINGS</div>
                            <div className="text-white fs-4 fw-800">₹1,245.50</div>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card className="card-glass border-z p-3 text-center shadow-glow">
                            <div className="text-muted small fw-bold mb-1 opacity-75">RIDES COMPLETED</div>
                            <div className="text-white fs-4 fw-800">8 Trips</div>
                        </Card>
                    </Col>
                </Row>

                {/* Performance Chart - SVG Mock */}
                <Card className="card-glass border-z p-4 mb-4 shadow-glow">
                    <h6 className="text-accent fw-bold small mb-3">WEEKLY PERFORMANCE</h6>
                    <div className="d-flex align-items-end justify-content-between mb-2" style={{ height: '80px' }}>
                        {[40, 70, 45, 90, 65, 85, 30].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className={`rounded-top ${i === 3 ? 'bg-accent' : 'bg-secondary op-25'}`}
                                style={{ width: '8%', minWidth: '10px' }}
                            ></motion.div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between text-muted x-small">
                        <span>MON</span>
                        <span>THU</span>
                        <span>SUN</span>
                    </div>
                </Card>

                {/* Metrics Grid */}
                <Row className="g-3 mb-4">
                    {[
                        { label: 'RATING', value: '4.95', icon: 'star-fill', color: 'text-warning' },
                        { label: 'ACCEPTANCE', value: '98%', icon: 'check-all', color: 'text-success' },
                        { label: 'CANCEL RATE', value: '2%', icon: 'x-circle', color: 'text-danger' }
                    ].map((m, idx) => (
                        <Col key={idx} xs={4}>
                            <div className="text-center p-2 card-glass border-z rounded-3">
                                <i className={`bi bi-${m.icon} ${m.color} small mb-1 d-block`}></i>
                                <div className="text-white fw-bold small">{m.value}</div>
                                <div className="text-muted x-small fw-bold">{m.label}</div>
                            </div>
                        </Col>
                    ))}
                </Row>

                {/* Active Trip Card */}
                <AnimatePresence>
                    {activeTrip && isOnline && (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="mb-4"
                        >
                            <Card className="card-glass border-z p-4 shadow-glow border-accent shadow-accent">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Badge bg="accent" text="dark" className="px-3 py-2 fw-bold">
                                        {activeTrip.status.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-white small fw-bold">ID: {activeTrip.id}</span>
                                </div>
                                <div className="mb-3 rounded-4 overflow-hidden border-z" style={{ height: '180px' }}>
                                    <ZeneraMap trip={activeTrip} />
                                </div>
                                <h4 className="text-white fw-bold mb-3">{activeTrip.pickup || 'Location assigned'}</h4>
                                
                                <div className="d-grid gap-3">
                                    {/* Action based on status */}
                                    {activeTrip.status === TRIP_STATUS.SEARCHING && (
                                        <div className="text-center py-3">
                                            <div className="pulse-animation mb-4 mx-auto bg-accent rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                                <i className="bi bi-geo-alt-fill text-dark fs-2"></i>
                                            </div>
                                            <h5 className="text-white fw-bold mb-3">New Ride Request!</h5>
                                            <p className="text-muted small mb-4">{activeTrip.pickup} → {activeTrip.destination}</p>
                                            <div className="d-flex gap-3">
                                                <Button variant="danger" className="flex-grow-1 py-3 border-z" onClick={cancelTrip}>REJECT</Button>
                                                <Button variant="primary" className="flex-grow-1 py-3 shadow-glow" onClick={() => acceptRide()}>ACCEPT</Button>
                                            </div>
                                        </div>
                                    )}

                                    {activeTrip.status === TRIP_STATUS.ASSIGNED && (
                                        <Button variant="primary" className="py-3 shadow-glow" onClick={() => updateStatus(TRIP_STATUS.ARRIVING)}>
                                            REACHED PICKUP
                                        </Button>
                                    )}

                                    {activeTrip.status === TRIP_STATUS.ARRIVING && (
                                        <Button variant="success" className="py-3 shadow-glow" onClick={() => updateStatus(TRIP_STATUS.OTP_READY)}>
                                            I'M AT LOCATION
                                        </Button>
                                    )}

                                    {activeTrip.status === TRIP_STATUS.OTP_READY && (
                                        <div className="otp-verification p-3 bg-dark rounded-4 border-z border border-accent">
                                            <h6 className="text-accent text-center fw-bold small mb-3">ASK USER FOR PIN</h6>
                                            <Form onSubmit={handleOtpSubmit}>
                                                <Form.Control 
                                                    type="number" 
                                                    placeholder="ENTER 4-DIGIT OTP" 
                                                    className={`bg-dark text-white text-center fs-2 fw-800 border-z mb-3 letter-spacing-wide ${otpError ? 'border-danger' : ''}`} 
                                                    value={otpInput}
                                                    onChange={(e) => setOtpInput(e.target.value)}
                                                    maxLength={4}
                                                    required
                                                />
                                                {otpError && <p className="text-danger small text-center mb-2">Incorrect OTP. Try again.</p>}
                                                <Button type="submit" variant="primary" className="w-100 py-3">START TRIP</Button>
                                            </Form>
                                        </div>
                                    )}

                                    {activeTrip.status === TRIP_STATUS.STARTED && (
                                        <div className="text-center">
                                            <div className="text-success small fw-bold mb-2">TRIP IN PROGRESS</div>
                                            <Button variant="danger" className="w-100 py-3 shadow-glow" onClick={completeTrip}>
                                                COMPLETE RIDE
                                            </Button>
                                        </div>
                                    )}

                                    {activeTrip.status === TRIP_STATUS.COMPLETED && (
                                        <div className="text-center py-4">
                                            <i className="bi bi-patch-check-fill text-success fs-1 mb-2"></i>
                                            <h5 className="text-white">Trip Finished!</h5>
                                            <p className="text-muted small">Ride summary and earnings updated.</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Status Toggle Info */}
                {!isOnline && (
                    <div className="text-center py-5">
                        <i className="bi bi-moon-stars fs-1 text-muted mb-3 opacity-25"></i>
                        <h4 className="text-white opacity-50">You are Offline</h4>
                        <p className="text-muted small">Go online to start receiving ride requests in your area.</p>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default DriverDash;
