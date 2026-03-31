import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { useTrip } from '../../context/TripContext';
import { VEHICLE_PRICING } from '../../data/mockData';
import { calculateFare } from '../../utils/pricing';
import { PRICING_MODES } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../../components/common/Autocomplete';
import { INDIAN_LOCATIONS } from '../../data/locations';

const RideBooking = () => {
    const { bookingRequest, updateRequest, resetBooking } = useBooking();
    const { requestRide } = useTrip();
    const navigate = useNavigate();
    const [isConfirming, setIsConfirming] = useState(false);
    const { step } = bookingRequest;

    const handleNext = () => updateRequest({ step: step + 1 });
    const handleBack = () => updateRequest({ step: step - 1 });

    const handleConfirm = () => {
        setIsConfirming(true);
        setTimeout(() => {
            requestRide({
                pickup: bookingRequest.pickup,
                destination: bookingRequest.destination,
                pricing: bookingRequest.pricing,
                vehicleType: bookingRequest.vehicleType
            });
            resetBooking();
            navigate('/user/trip');
        }, 1200); // Premium delay feel
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1Location />;
            case 2: return <Step2Vehicle />;
            case 3: return <Step3Review onConfirm={handleConfirm} isConfirming={isConfirming} />;
            default: return <Step1Location />;
        }
    };

    return (
        <div className="ride-booking bg-black min-vh-100 pb-5">
            <Container className="pt-4 px-4 overflow-hidden">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <button className="btn btn-dark rounded-circle p-1 border-z" onClick={() => step > 1 ? handleBack() : navigate('/user')}>
                        <i className="bi bi-chevron-left fs-4"></i>
                    </button>
                    <h4 className="text-white fw-bold mb-0">Plan Ride</h4>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </Container>
        </div>
    );
};

const Step1Location = () => {
    const { bookingRequest, updateRequest } = useBooking();
    return (
        <div className="d-grid gap-4">
            <Card className="card-glass border-z p-3 shadow-glow">
                <h5 className="text-white mb-4">Route Selection</h5>
                <Autocomplete 
                    options={INDIAN_LOCATIONS}
                    value={bookingRequest.pickup || ''}
                    onSelect={(val) => updateRequest({ pickup: val })}
                    placeholder="Enter Pickup Location"
                    className="mb-3"
                />
                <Autocomplete 
                    options={INDIAN_LOCATIONS}
                    value={bookingRequest.destination || ''}
                    onSelect={(val) => updateRequest({ destination: val })}
                    placeholder="Where to?"
                />
            </Card>
            
            <div className="ride-types d-flex gap-3 overflow-auto pb-2 scroll-hide">
                {['Local', 'Outstation', 'Rental'].map((m) => (
                    <Button 
                        key={m}
                        variant={bookingRequest.mode === m.toLowerCase() ? 'primary' : 'outline-light'} 
                        className="rounded-pill px-4 border-z transition-smooth whitespace-nowrap"
                        onClick={() => updateRequest({ mode: m.toLowerCase() })}
                    >
                        {m}
                    </Button>
                ))}
            </div>

            <Button 
                variant="primary" 
                className="py-3 shadow-glow" 
                disabled={!bookingRequest.pickup || !bookingRequest.destination}
                onClick={() => updateRequest({ step: 2 })}
            >
                Confirm Route
            </Button>
        </div>
    );
};

const Step2Vehicle = () => {
    const { bookingRequest, updateRequest } = useBooking();
    
    const handleSelect = (v) => {
        const fare = calculateFare({
            mode: bookingRequest.mode === 'local' ? PRICING_MODES.LOCAL : PRICING_MODES.TOUR,
            vehicleType: v,
            distance: Math.floor(Math.random() * 50) + 10, // Mock distance
            days: 1,
            pricingData: VEHICLE_PRICING
        });
        updateRequest({ vehicleType: v, pricing: fare, step: 3 });
    };

    return (
        <div className="d-grid gap-3">
            <h5 className="text-white mb-3">Suggested Vehicles</h5>
            {Object.entries(VEHICLE_PRICING).map(([code, v]) => (
                <Card 
                    key={code} 
                    className={`card-glass border-z p-3 hover-accent shadow-glow ${bookingRequest.vehicleType === code ? 'border-accent shadow-accent' : ''}`}
                    onClick={() => handleSelect(code)}
                >
                    <Row className="align-items-center g-3">
                        <Col xs={3}>
                            <div className="bg-dark rounded-3 overflow-hidden p-1 border-z">
                                <img src={v.image} alt={v.name} className="w-100 h-100 object-fit-contain opacity-75" />
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="text-white fw-bold">{v.name}</div>
                            <div className="text-muted small">ETA 4 mins • {v.ratePerKm}/km</div>
                        </Col>
                        <Col xs={3} className="text-end">
                            <div className="text-accent fw-bold small">SELECT</div>
                        </Col>
                    </Row>
                </Card>
            ))}
        </div>
    );
};

const Step3Review = ({ onConfirm, isConfirming }) => {
    const { bookingRequest } = useBooking();
    const fare = bookingRequest.pricing;

    return (
        <div className="d-grid gap-4">
            <Card className="card-glass border-z p-4 shadow-glow">
                <h5 className="text-white mb-4">Ride Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">BASE FARE</span>
                    <span className="text-white fw-bold">₹{fare?.baseFare}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">PLATFORM FEE</span>
                    <span className="text-white">₹{fare?.platformFee}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">GST (5%)</span>
                    <span className="text-white">₹{fare?.tax}</span>
                </div>
                <hr className="border-z opacity-25" />
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-white fw-bold fs-5">TOTAL ESTIMATE</span>
                    <span className="text-accent fw-800 display-6">₹{fare?.grandTotal}</span>
                </div>
            </Card>

            <Alert variant="dark" className="border-z border bg-transparent text-muted small">
                <i className="bi bi-shield-check text-accent me-2"></i>
                Safest rides with verified drivers and live tracking.
            </Alert>

            <div className="mb-4">
                <h6 className="text-accent fw-bold small mb-3">PAYMENT METHOD</h6>
                <div className="card-glass p-3 rounded-4 border-z d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <i className="bi bi-wallet2 text-white fs-4"></i>
                        <span className="text-white">Personal Wallet</span>
                    </div>
                    <i className="bi bi-chevron-right text-muted"></i>
                </div>
            </div>

            <Button variant="primary" className="py-3 shadow-glow" onClick={onConfirm} disabled={isConfirming}>
                {isConfirming ? (
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>Securing Ride...</span>
                    </div>
                ) : 'Confirm Ride Application'}
            </Button>
        </div>
    );
};

export default RideBooking;
