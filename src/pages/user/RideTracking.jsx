import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import { useUI } from '../../context/UIContext';
import GlassCard from '../../components/common/GlassCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { TRIP_STATUS } from '../../utils/constants';

const RideTracking = () => {
    const { activeTrip, cancelTrip } = useTrip();
    const { showToast, showModal, hideModal } = useUI();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a small delay for "fetching" trip state
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingState message="Connecting to Trip Sync..." fullPage />;

    if (!activeTrip) {
        return (
            <div className="app-shell bg-black min-vh-100 py-5">
                <Container className="text-center py-5">
                    <i className="bi bi-geo-alt fs-1 text-muted mb-4 d-block"></i>
                    <h3 className="text-white fw-800">No Active Trip Found</h3>
                    <p className="text-muted mb-4">You don't have any ongoing or upcoming trips.</p>
                    <Button onClick={() => navigate('/user/book')} variant="primary" className="px-5 py-3">Book Your First Journey</Button>
                </Container>
            </div>
        );
    }

    const handleCancel = () => {
        showModal(
            "Cancel Trip?", 
            "Are you sure you want to cancel this booking? This action cannot be undone.",
            async () => {
                await cancelTrip(activeTrip.id);
                showToast("Trip cancelled successfully.");
                hideModal();
                navigate('/user/home');
            }
        );
    };

    return (
        <div className="app-shell bg-black min-vh-100 py-4 pb-5">
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="text-white fw-800 mb-0">Live Trip <span className="text-accent">Tracking</span></h4>
                        <p className="text-muted small mb-0">Trip ID: {activeTrip.id}</p>
                    </div>
                    <StatusBadge status={activeTrip.status} />
                </div>

                <Row className="g-4">
                    {/* Main Tracking View */}
                    <Col lg={8}>
                        <GlassCard className="p-0 border-0 overflow-hidden mb-4">
                             <div className="bg-charcoal border-bottom border-z p-4 d-flex justify-content-between align-items-center">
                                 <div>
                                     <div className="text-accent small fw-bold text-uppercase">Pickup Location</div>
                                     <div className="text-white fw-bold fs-5">{activeTrip.pickupLocation}</div>
                                 </div>
                                 <div className="text-end">
                                     <div className="text-muted small fw-bold">Vehicle Class</div>
                                     <div className="text-white fw-bold text-uppercase">{activeTrip.vehicleType}</div>
                                 </div>
                             </div>
                             
                             <div className="p-4 bg-dark/50" style={{ minHeight: '300px' }}>
                                 {/* Mock Map Placeholder */}
                                 <div className="h-100 rounded-4 border border-z border-dashed d-flex align-items-center justify-content-center flex-column text-center p-5">
                                      <i className="bi bi-map fs-1 text-muted mb-3"></i>
                                      <h5 className="text-muted">Live Route Visualization</h5>
                                      <p className="text-muted x-small">Driver is moving towards your pickup location...</p>
                                      {activeTrip.status === TRIP_STATUS.SEARCHING && (
                                         <div className="mt-3">
                                            <div className="spinner-border spinner-border-sm text-accent me-2"></div>
                                            <span className="text-accent small fw-bold">SEARCHING FOR DRIVER...</span>
                                         </div>
                                      )}
                                 </div>
                             </div>
                        </GlassCard>

                        <div className="d-grid gap-4">
                             {/* Major Stops */}
                             <GlassCard>
                                 <h6 className="text-white fw-800 text-uppercase mb-4">Major Destinations</h6>
                                 <div className="ps-3 border-start border-z ms-2">
                                     {activeTrip.majorDestinations?.map((dest, idx) => (
                                         <div key={idx} className="position-relative mb-4">
                                             <div className="position-absolute top-0 start-0 translate-middle-x bg-accent rounded-circle shadow-glow" style={{ width: '12px', height: '12px', left: '-13px' }}></div>
                                             <div className="ms-3">
                                                 <div className="text-white fw-bold">{dest}</div>
                                                 <div className="text-muted x-small">Intermediate Stop</div>
                                             </div>
                                         </div>
                                     ))}
                                     <div className="position-relative">
                                         <div className="position-absolute top-0 start-0 translate-middle-x bg-white border border-z rounded-circle" style={{ width: '12px', height: '12px', left: '-13px' }}></div>
                                         <div className="ms-3">
                                             <div className="text-white fw-bold">{activeTrip.pickupLocation} (Return)</div>
                                             <div className="text-muted x-small">Round-trip Completion</div>
                                         </div>
                                     </div>
                                 </div>
                             </GlassCard>
                        </div>
                    </Col>

                    {/* Action Panel / Driver Info */}
                     <Col lg={4}>
                        {activeTrip.driver ? (
                             <GlassCard className="text-center mb-4 border-accent">
                                 <div className="d-flex justify-content-center mb-3">
                                     <div className="rounded-circle border border-accent p-1">
                                         <div className="bg-charcoal rounded-circle d-flex align-items-center justify-content-center fw-800 shadow-glow" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                                            {activeTrip.driver.name?.charAt(0)}
                                         </div>
                                     </div>
                                 </div>
                                 <h5 className="text-white fw-800 mb-1">{activeTrip.driver.name}</h5>
                                 <div className="d-flex justify-content-center gap-2 mb-4">
                                     <Badge bg="accent" text="dark" className="px-2 py-1"><i className="bi bi-star-fill me-1"></i>{activeTrip.driver.rating || '4.8'}</Badge>
                                     <Badge bg="dark" className="border-z px-2 py-1">{activeTrip.driver.plate || 'KA-XX-XXXX'}</Badge>
                                 </div>
                                 <div className="text-muted small mb-4">{activeTrip.driver.vehicle || 'Luxury Sedan'}</div>
                                 
                                 <div className="d-grid gap-2">
                                     <Button variant="outline-light" className="py-2 border-z"><i className="bi bi-chat-dots me-2"></i>Message</Button>
                                     <Button variant="outline-light" className="py-2 border-z"><i className="bi bi-telephone me-2"></i>Call Driver</Button>
                                 </div>
                             </GlassCard>
                        ) : (
                            <GlassCard className="text-center py-5 mb-4 italic opacity-75">
                                <h6 className="text-muted">Waiting for driver assignment...</h6>
                            </GlassCard>
                        )}

                        {activeTrip.otp && activeTrip.status !== TRIP_STATUS.TRIP_STARTED && activeTrip.status !== TRIP_STATUS.TRIP_COMPLETED && (
                            <GlassCard className="text-center border-accent bg-charcoal/50 mb-4 shadow-lg py-5">
                                <div className="text-accent small fw-bold text-uppercase mb-2">Ride Start OTP</div>
                                <div className="display-3 fw-800 tracking-widest text-white mb-2">{activeTrip.otp}</div>
                                <p className="text-muted x-small px-4 px-lg-2">Share this with your driver only when you are ready to start the journey.</p>
                                <i className="bi bi-shield-lock text-accent opacity-25" style={{ fontSize: '4rem' }}></i>
                            </GlassCard>
                        )}

                        {activeTrip.status !== TRIP_STATUS.TRIP_STARTED && activeTrip.status !== TRIP_STATUS.TRIP_COMPLETED && (
                             <div className="d-grid">
                                <Button variant="link" className="text-danger text-decoration-none small" onClick={handleCancel}>
                                    Need to cancel booking?
                                </Button>
                             </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RideTracking;
