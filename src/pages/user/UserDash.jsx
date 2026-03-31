import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { TRIP_STATUS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const UserDash = () => {
    const { user } = useAuth();
    const { activeTrip } = useTrip();
    const navigate = useNavigate();

    return (
        <div className="user-portal bg-black min-vh-100 pb-5">
            <Container className="pt-4 px-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="text-white fw-800 mb-1">Hello, {user?.name.split(' ')[0]}!</h2>
                        <p className="text-muted small">Where are we heading today?</p>
                    </div>
                    <div className="rounded-circle bg-dark border border-z d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                        <i className="bi bi-person text-accent fs-5"></i>
                    </div>
                </div>

                {/* Active Trip Banner */}
                {activeTrip && activeTrip.status !== TRIP_STATUS.COMPLETED && (
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        className="active-trip-card mb-4"
                    >
                        <Card className="card-glass border-z p-3 hover-accent shadow-glow" onClick={() => navigate('/user/trip')}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="badge bg-accent text-dark px-3 py-2 fw-bold">RIDE IN PROGRESS</span>
                                <span className="text-white small fw-bold">#{activeTrip.id}</span>
                            </div>
                            <h5 className="text-white mb-0">{activeTrip.driver?.name || 'Searching for driver...'}</h5>
                            <p className="text-muted small mb-0">{activeTrip.status.replace('_', ' ')}</p>
                        </Card>
                    </motion.div>
                )}

                {/* Search Bar - Uber Style */}
                <Card 
                    className="card-glass shadow-glow p-3 mb-4 rounded-4 border-z cursor-pointer hover-accent"
                    onClick={() => navigate('/user/book')}
                >
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-accent rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                        <div className="text-white opacity-75 p-2 fs-5">Enter Pickup Location</div>
                    </div>
                    <hr className="my-3 border-z op-25" />
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-white rounded-0" style={{ width: '12px', height: '12px' }}></div>
                        <div className="text-white p-2 fs-5">Where to?</div>
                    </div>
                </Card>

                {/* Quick Info Cards */}
                <Row className="g-3 mb-4">
                    <Col xs={12}>
                        <Card className="card-glass border-z p-3 d-flex flex-row align-items-center gap-3 bg-gradient-dark">
                            <div className="rounded-circle bg-accent-light p-3">
                                <i className="bi bi-star-fill text-accent"></i>
                            </div>
                            <div>
                                <h6 className="text-white mb-0">ZENERA Gold</h6>
                                <p className="text-muted small mb-0">2,450 Loyalty Points • 15% Off Active</p>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Service Types */}
                <h6 className="text-accent fw-bold small mb-3">ZENERA SERVICES</h6>
                <Row className="g-3 mb-4">
                    <Col xs={6}>
                        <Card className="card-glass text-center p-3 h-100 hover-accent shadow-glow border-z" onClick={() => navigate('/book')}>
                            <i className="bi bi-geo-alt fs-2 text-accent mb-2"></i>
                            <span className="text-white fw-bold small">Local Rides</span>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card className="card-glass text-center p-3 h-100 hover-accent shadow-glow border-z" onClick={() => navigate('/book')}>
                            <i className="bi bi-map fs-2 text-accent mb-2"></i>
                            <span className="text-white fw-bold small">Outstation</span>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card className="card-glass text-center p-3 h-100 hover-accent shadow-glow border-z" onClick={() => navigate('/planner')}>
                            <i className="bi bi-robot fs-2 text-accent mb-2"></i>
                            <span className="text-white fw-bold small">AI Planner</span>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card className="card-glass text-center p-3 h-100 hover-accent shadow-glow border-z">
                            <i className="bi bi-calendar-check fs-2 text-accent mb-2"></i>
                            <span className="text-white fw-bold small">Rentals</span>
                        </Card>
                    </Col>
                </Row>

                {/* Recent Activity */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-accent fw-bold small mb-0">RECENT ACTIVITY</h6>
                    <span className="text-muted small cursor-pointer">View All</span>
                </div>
                <div className="d-grid gap-3 mb-5">
                    {[
                        { to: 'Mysore Palace', from: 'Indiranagar', date: 'Yesterday', price: '₹3,450', status: 'Completed' },
                        { to: 'Kempegowda Int. Airport', from: 'Whitefield', date: '28 Mar', price: '₹1,200', status: 'Completed' }
                    ].map((item, idx) => (
                        <div key={idx} className="d-flex align-items-center justify-content-between p-3 card-glass border-z rounded-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-dark p-2 rounded-2 border border-z">
                                    <i className="bi bi-clock-history text-muted"></i>
                                </div>
                                <div>
                                    <div className="text-white small fw-bold">{item.to}</div>
                                    <div className="text-muted x-small">{item.from} • {item.date}</div>
                                </div>
                            </div>
                            <div className="text-end">
                                <div className="text-white small fw-bold">{item.price}</div>
                                <div className="text-accent x-small text-uppercase">{item.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default UserDash;
