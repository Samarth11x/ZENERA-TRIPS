import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import GlassCard from '../../components/common/GlassCard';
import StatusBadge from '../../components/common/StatusBadge';
import { TRIP_STATUS } from '../../utils/constants';

const UserDash = () => {
    const { user } = useAuth();
    const { activeTrip } = useTrip();
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Trips', value: '12', icon: 'bi-car-front' },
        { label: 'Total KM', value: '1,450', icon: 'bi-geo-alt' },
        { label: 'Saved %', value: '15%', icon: 'bi-piggy-bank' }
    ];

    return (
        <div className="app-shell bg-black min-vh-100 pb-5">
            <Container className="pt-4">
                <header className="mb-5 d-flex justify-content-between align-items-end">
                    <div>
                        <h2 className="text-white fw-800 mb-1">Hello, {user?.name}</h2>
                        <p className="text-muted small mb-0">Welcome back to ZENERA Premium</p>
                    </div>
                </header>

                <Row className="g-4">
                    {/* Active Trip Widget */}
                    <Col lg={8}>
                        {activeTrip ? (
                            <GlassCard className="border-accent mb-4 position-relative overflow-hidden">
                                <div className="position-absolute top-0 end-0 p-4">
                                     <StatusBadge status={activeTrip.status} />
                                </div>
                                <div className="mb-4">
                                    <h6 className="text-accent small fw-bold text-uppercase mb-2">Ongoing Booking</h6>
                                    <h3 className="text-white fw-800">{activeTrip.pickupLocation} &rarr; {activeTrip.majorDestinations?.[0] || 'Tour'}</h3>
                                    <p className="text-muted small">Trip ID: {activeTrip.id}</p>
                                </div>
                                
                                <div className="d-flex gap-4 mb-4">
                                    <div>
                                        <div className="small text-muted">Vehicle</div>
                                        <div className="text-white fw-bold">{activeTrip.vehicleType?.toUpperCase()}</div>
                                    </div>
                                    <div className="border-start border-z ps-4">
                                        <div className="small text-muted">Estimated Fare</div>
                                        <div className="text-accent fw-bold fs-5">₹{activeTrip.pricingEstimate?.total?.toLocaleString()}</div>
                                    </div>
                                </div>

                                <Button 
                                    as={Link} 
                                    to="/user/tracking" 
                                    variant="primary" 
                                    className="px-5 py-3 shadow-glow"
                                >
                                    Track Live Trip <i className="bi bi-arrow-right ms-2"></i>
                                </Button>
                            </GlassCard>
                        ) : (
                            <GlassCard className="text-center py-5 border-dashed">
                                <div className="bg-charcoal d-inline-flex p-4 rounded-circle mb-4 border border-z">
                                    <i className="bi bi-plus-circle fs-1 text-muted"></i>
                                </div>
                                <h4 className="text-white fw-800">No Active Trips</h4>
                                <p className="text-muted mb-4">Looking for a premium multi-day tour?</p>
                                <Button as={Link} to="/user/book" variant="primary" className="px-5 py-3">Book New Trip</Button>
                            </GlassCard>
                        )}

                        <div className="mt-5">
                            <h5 className="text-white fw-800 mb-4 h4">Recent Activity</h5>
                            <div className="d-grid gap-3">
                                {[1, 2].map(i => (
                                    <GlassCard key={i} className="py-3 px-4 d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-charcoal p-3 rounded-3 border border-z">
                                                <i className="bi bi-check2-circle text-success fs-5"></i>
                                            </div>
                                            <div>
                                                <div className="text-white fw-bold">Trip to Ooty-Coorg</div>
                                                <div className="text-muted small">4 Days • Completed Mar 12</div>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <div className="text-white fw-bold">₹14,250</div>
                                            <div className="text-muted small">Paid Online</div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    </Col>

                    {/* Sidebar Stats */}
                    <Col lg={4}>
                        <Row className="g-3">
                            {stats.map((stat, idx) => (
                                <Col key={idx} xs={6} lg={12}>
                                    <GlassCard className="text-center py-4">
                                        <i className={`bi ${stat.icon} fs-2 text-accent mb-2 d-block`}></i>
                                        <div className="display-6 fw-800 text-white">{stat.value}</div>
                                        <div className="text-muted small text-uppercase fw-bold">{stat.label}</div>
                                    </GlassCard>
                                </Col>
                            ))}
                        </Row>

                        <GlassCard className="mt-4 bg-accent text-dark border-0 p-4 shadow-lg overflow-hidden position-relative">
                             <div className="position-relative z-index-1">
                                <h5 className="fw-800 mb-2">Membership Perks</h5>
                                <p className="small mb-4 opacity-75">You have 2400 ZENERA Points available for your next booking.</p>
                                <Button variant="dark" size="sm" className="px-4 py-2 text-uppercase fw-bold rounded-pill">Redeem Now</Button>
                             </div>
                             <i className="bi bi-gem position-absolute top-0 end-0 opacity-10" style={{ fontSize: '10rem', transform: 'translate(20%, -20%)' }}></i>
                        </GlassCard>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserDash;
