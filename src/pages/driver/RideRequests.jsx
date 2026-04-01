import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import GlassCard from '../../components/common/GlassCard';
import LoadingState from '../../components/common/LoadingState';
import { TRIP_STATUS } from '../../utils/constants';

const RideRequests = () => {
    const { user } = useAuth();
    const { availableRequests, refreshAvailableRequests, acceptTrip, activeTrip } = useTrip();
    const { showToast } = useUI();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshAvailableRequests();
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleAccept = async (bookingId) => {
        if (activeTrip) {
            showToast("You already have an active trip. Complete it first.", "error");
            return;
        }

        try {
            const driverInfo = {
                id: user.uid,
                name: user.name,
                rating: 4.8,
                vehicle: 'Premium Sedan',
                plate: 'KA-01-MJ-1234'
            };
            await acceptTrip(bookingId, driverInfo);
            showToast("Trip accepted! Navigate to pickup.");
            navigate('/driver/active');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    if (loading) return <LoadingState message="Fetching available bookings..." fullPage />;

    return (
        <div className="app-shell bg-black min-vh-100 py-4 pb-5">
            <Container>
                <header className="mb-5">
                    <h3 className="text-white fw-800 mb-1">Available <span className="text-accent">Requests</span></h3>
                    <p className="text-muted small">Open bookings matching your vehicle type & location.</p>
                </header>

                <Row className="g-4">
                    {availableRequests.length > 0 ? (
                        availableRequests.map((req) => (
                            <Col key={req.id} lg={6}>
                                <GlassCard className="p-4 border-z hover-accent h-100">
                                     <div className="d-flex justify-content-between align-items-start mb-4">
                                         <div>
                                             <div className="text-accent small fw-bold text-uppercase mb-1">Pickup Information</div>
                                             <div className="text-white fw-bold fs-5">{req.pickupLocation}</div>
                                             <div className="text-muted small">Destination: {req.majorDestinations?.join(', ')}</div>
                                         </div>
                                         <Badge bg="dark" className="border-z text-accent fs-6 p-2 px-3">₹{req.pricingEstimate?.total?.toLocaleString()}</Badge>
                                     </div>

                                     <Row className="g-3 mb-4">
                                         <Col xs={6}>
                                             <div className="text-muted x-small uppercase fw-bold mb-1">Trip Duration</div>
                                             <div className="text-white small fw-bold"><i className="bi bi-calendar3 me-2 text-accent"></i>{req.startDate} to {req.endDate}</div>
                                         </Col>
                                         <Col xs={6}>
                                             <div className="text-muted x-small uppercase fw-bold mb-1">Customer</div>
                                             <div className="text-white small fw-bold"><i className="bi bi-person-circle me-2 text-accent"></i>{req.userName || 'Premium User'}</div>
                                         </Col>
                                     </Row>

                                     <div className="d-flex gap-2">
                                         <Button variant="primary" className="flex-grow-1 py-3 fw-bold shadow-glow" onClick={() => handleAccept(req.id)}>
                                             Accept Booking
                                         </Button>
                                         <Button variant="outline-light" className="border-z px-4" title="Ignore">
                                             <i className="bi bi-x-lg"></i>
                                         </Button>
                                     </div>
                                </GlassCard>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12}>
                             <div className="text-center py-5 opacity-50">
                                 <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
                                 <h5>No open requests available right now</h5>
                                 <p className="small">Try changing your location or stay online to receive updates.</p>
                             </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default RideRequests;
