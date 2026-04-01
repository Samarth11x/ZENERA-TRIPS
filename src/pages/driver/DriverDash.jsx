import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { useUI } from '../../context/UIContext';
import { driverService } from '../../services/driverService';
import { kycService } from '../../services/kycService';
import GlassCard from '../../components/common/GlassCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { KYC_STATUS, ROLES, TRIP_STATUS } from '../../utils/constants';

const DriverDash = () => {
    const { user } = useAuth();
    const { activeTrip, refreshAvailableRequests, availableRequests } = useTrip();
    const { showToast } = useUI();
    const navigate = useNavigate();
    
    const [driverProfile, setDriverProfile] = useState(null);
    const [kycStatus, setKycStatus] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const profile = driverService.getDriverProfile(user.uid);
            const kyc = kycService.getKycStatus(user.uid);
            setDriverProfile(profile);
            setKycStatus(kyc?.status || KYC_STATUS.PENDING);
            setIsOnline(profile?.isOnline || false);
            setLoading(false);
        }
    }, [user]);

    const handleToggleOnline = async () => {
        try {
            const newStatus = !isOnline;
            await driverService.toggleOnlineStatus(user.uid, newStatus);
            setIsOnline(newStatus);
            showToast(newStatus ? "You are now ONLINE. Searching for requests..." : "You are now OFFLINE.");
            if (newStatus) refreshAvailableRequests();
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    if (loading) return <LoadingState message="Syncing Partner Dashboard..." fullPage />;

    return (
        <div className="app-shell bg-black min-vh-100 pb-5">
            <Container className="pt-4">
                <header className="mb-4 d-flex justify-content-between align-items-center">
                    <div>
                        <h2 className="text-white fw-800 mb-1">Partner Dashboard</h2>
                        <div className="d-flex align-items-center gap-2">
                             <StatusBadge status={kycStatus} type="kyc" />
                             <span className="text-muted small">• {isOnline ? 'Active' : 'Standby'}</span>
                        </div>
                    </div>
                    <Form.Check 
                        type="switch"
                        id="online-switch"
                        className="custom-switch-lg shadow-glow"
                        checked={isOnline}
                        onChange={handleToggleOnline}
                        disabled={kycStatus !== KYC_STATUS.APPROVED}
                    />
                </header>

                <Row className="g-4">
                    {/* Active Ride Card */}
                    <Col lg={8}>
                        {activeTrip && activeTrip.driver?.id === user.uid ? (
                            <GlassCard className="border-accent mb-4 position-relative overflow-hidden">
                                <div className="position-absolute top-0 end-0 p-4">
                                     <StatusBadge status={activeTrip.status} />
                                </div>
                                <div className="mb-4">
                                    <h6 className="text-accent small fw-bold text-uppercase mb-2">My Active Trip</h6>
                                    <h3 className="text-white fw-800">{activeTrip.pickupLocation} &rarr; {activeTrip.majorDestinations?.[0] || 'Tour'}</h3>
                                    <p className="text-muted small">Target: {activeTrip.userName} • ID: {activeTrip.id}</p>
                                </div>
                                
                                <div className="d-flex gap-4 mb-4">
                                    <div className="bg-charcoal p-3 rounded-4 border-z">
                                        <div className="small text-muted mb-1">Final Total (Est.)</div>
                                        <div className="text-accent fw-bold fs-4">₹{activeTrip.pricingEstimate?.total?.toLocaleString()}</div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                         {activeTrip.status === TRIP_STATUS.DRIVER_ASSIGNED && <i className="bi bi-geo-alt-fill text-accent fs-3 me-2"></i>}
                                         <span className="text-muted small">Navigate to pickup location</span>
                                    </div>
                                </div>

                                <Button 
                                    as={Link} 
                                    to="/driver/active" 
                                    variant="primary" 
                                    className="px-5 py-3 shadow-glow"
                                >
                                    Manage Trip <i className="bi bi-play-circle-fill ms-2"></i>
                                </Button>
                            </GlassCard>
                        ) : (
                            <div className="mb-4">
                                <Row className="g-3 mb-4">
                                    {[
                                        { label: 'Today Earnings', value: '₹0', icon: 'bi-wallet2', color: 'text-success' },
                                        { label: 'Pending Requests', value: availableRequests.length, icon: 'bi-list-ul', color: 'text-accent' }
                                    ].map((stat, idx) => (
                                        <Col key={idx} md={6}>
                                            <GlassCard className="d-flex align-items-center gap-3 py-3 px-4">
                                                <div className="bg-charcoal p-3 rounded-3 border border-z">
                                                    <i className={`bi ${stat.icon} fs-4 ${stat.color}`}></i>
                                                </div>
                                                <div>
                                                    <div className={`fs-4 fw-800 ${stat.color}`}>{stat.value}</div>
                                                    <div className="text-muted small text-uppercase fw-bold">{stat.label}</div>
                                                </div>
                                            </GlassCard>
                                        </Col>
                                    ))}
                                </Row>

                                {isOnline ? (
                                    <GlassCard className="text-center py-5 border-dashed bg-charcoal/30">
                                         <div className="spinner-grow text-accent mb-4" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                                         <h4 className="text-white fw-800">Searching for Rides...</h4>
                                         <p className="text-muted mb-4 px-5">Stay in high-demand areas in Bangalore to receive faster booking requests.</p>
                                         <Button as={Link} to="/driver/requests" variant="outline-accent" className="px-5 py-2 border-z" style={{ color: 'var(--z-accent-orange)' }}>View All Available Requests</Button>
                                    </GlassCard>
                                ) : (
                                    <GlassCard className="text-center py-5 border-z bg-black">
                                         <i className="bi bi-power fs-1 text-muted mb-4 opacity-50"></i>
                                         <h4 className="text-muted fw-800">You are Offline</h4>
                                         <p className="text-muted mb-4">Go online to start receiving booking requests from customers.</p>
                                         {kycStatus !== KYC_STATUS.APPROVED ? (
                                             <Alert variant="warning" className="mx-4 px-4 bg-transparent border-z text-muted small">
                                                 <i className="bi bi-info-circle-fill me-2"></i>
                                                 Complete your <Link to="/driver/kyc" className="text-accent fw-bold text-decoration-none">KYC verification</Link> to enable your online status.
                                             </Alert>
                                         ) : (
                                             <Button variant="primary" className="px-5 py-3" onClick={handleToggleOnline}>Go Online</Button>
                                         )}
                                    </GlassCard>
                                )}
                            </div>
                        )}
                    </Col>

                    {/* Quick Profile / Earnings Sidebar */}
                    <Col lg={4}>
                         <GlassCard className="p-4 mb-4">
                             <div className="d-flex align-items-center gap-3 mb-4">
                                 <div className="bg-accent text-dark fw-800 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>{user?.name?.charAt(0)}</div>
                                 <div>
                                     <div className="text-white fw-bold">{user?.name}</div>
                                     <div className="text-muted small">KA-01-MJ-1234 • Sedan</div>
                                 </div>
                             </div>
                             <div className="d-grid gap-3 border-top border-z pt-4 mt-2">
                                 <div className="d-flex justify-content-between text-muted small">
                                     <span>Lifetime Trips</span>
                                     <span className="text-white fw-bold">42</span>
                                 </div>
                                 <div className="d-flex justify-content-between text-muted small">
                                     <span>Rating</span>
                                     <span className="text-white fw-bold">4.8 <i className="bi bi-star-fill text-accent ms-1"></i></span>
                                 </div>
                                 <div className="d-flex justify-content-between text-muted small">
                                     <span>Acceptance Rate</span>
                                     <span className="text-white fw-bold">94%</span>
                                 </div>
                             </div>
                         </GlassCard>

                         <GlassCard className="p-4 bg-charcoal">
                              <h6 className="text-accent small fw-bold text-uppercase mb-3">Recent Earnings</h6>
                              <div className="d-grid gap-3">
                                  <div className="d-flex justify-content-between align-items-center p-2 rounded border border-z bg-black shadow-sm">
                                      <div className="small text-muted">Mar 28, 2026</div>
                                      <div className="text-success fw-bold">₹2,450</div>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center p-2 rounded border border-z bg-black shadow-sm">
                                      <div className="small text-muted">Mar 25, 2026</div>
                                      <div className="text-success fw-bold">₹1,820</div>
                                  </div>
                                  <Button variant="link" className="text-accent x-small p-0 text-decoration-none text-start">View Detailed Balance History &rarr;</Button>
                              </div>
                         </GlassCard>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DriverDash;
