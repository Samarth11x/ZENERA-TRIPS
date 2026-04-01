import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, ListGroup, Badge, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useTrip } from '../../context/TripContext';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { pricingService } from '../../services/pricingService';
import { INDIAN_LOCATIONS } from '../../data/locations';
import GlassCard from '../../components/common/GlassCard';
import Autocomplete from '../../components/common/Autocomplete';
import { TRIP_STATUS, VEHICLE_TYPES } from '../../utils/constants';

const RideBooking = () => {
    const { bookingData, updateBooking, nextStep, prevStep, resetBooking } = useBooking();
    const { createTripRequest } = useTrip();
    const { user } = useAuth();
    const { showToast } = useUI();
    const navigate = useNavigate();
    const { step } = bookingData;

    const handleFinalSubmit = async () => {
        try {
            const trip = await createTripRequest({
                ...bookingData,
                userId: user.uid,
                userName: user.name,
                status: TRIP_STATUS.SEARCHING
            });
            showToast('Booking request sent to drivers!');
            navigate('/user/tracking');
        } catch (err) {
            showToast('Failed to create booking', 'error');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1Location />;
            case 2: return <Step2Dates />;
            case 3: return <Step3MajorDestinations />;
            case 4: return <Step4DetailedDestinations />;
            case 5: return <Step5VehicleSelection />;
            case 6: return <Step6Payment />;
            case 7: return <Step7Review onConfirm={handleFinalSubmit} />;
            default: return <Step1Location />;
        }
    };

    return (
        <div className="app-shell bg-black min-vh-100 py-5 pb-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={9} xl={8}>
                        <div className="mb-5 text-center">
                            <h2 className="display-6 fw-800 text-uppercase mb-2">Book Your <span className="text-accent">Journey</span></h2>
                            <div className="d-flex justify-content-center gap-2 mb-4">
                                {[1, 2, 3, 4, 5, 6, 7].map(s => (
                                    <div 
                                        key={s} 
                                        className={`rounded-pill transition-smooth ${step >= s ? 'bg-accent shadow-glow' : 'bg-charcoal border-z'}`} 
                                        style={{ width: step === s ? '40px' : '10px', height: '10px' }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <GlassCard className="p-4 p-md-5">
                                    {renderStep()}
                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>

                        <div className="d-flex justify-content-between mt-4 pb-5">
                            {step > 1 && (
                                <Button variant="outline-light" onClick={prevStep} className="px-4 py-2 border-z">
                                    <i className="bi bi-arrow-left me-2"></i>Back
                                </Button>
                            )}
                            <div className="ms-auto" />
                            {step < 7 && (
                                <Button 
                                    variant="primary" 
                                    onClick={nextStep} 
                                    className="px-5 py-2 shadow-glow" 
                                    disabled={(step === 1 && !bookingData.pickupLocation)}
                                >
                                    Next Step<i className="bi bi-arrow-right ms-2"></i>
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

/* --- Step Components --- */

const Step1Location = () => {
    const { bookingData, updateBooking } = useBooking();
    return (
        <div>
            <h4 className="text-white fw-800 mb-2">Where are we <span className="text-accent">starting?</span></h4>
            <p className="text-muted small mb-5">Enter your pickup city. All ZENERA trips are round-trip, returning to this point.</p>
            <Autocomplete 
                options={INDIAN_LOCATIONS}
                value={bookingData.pickupLocation}
                onSelect={(val) => updateBooking({ pickupLocation: val })}
                placeholder="e.g. Bangalore, Mysore, Chennai..."
                label="PICKUP LOCATION"
            />
        </div>
    );
};

const Step2Dates = () => {
    const { bookingData, updateBooking } = useBooking();
    return (
        <div>
            <h4 className="text-white fw-800 mb-2">Select Your <span className="text-accent">Travel Window</span></h4>
            <p className="text-muted small mb-5">Choose the days. We include a ±2 day flexible buffer for multi-day tours.</p>
            <Row className="g-4">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className="text-accent small fw-bold">START DATE</Form.Label>
                        <Form.Control 
                            type="date" 
                            className="bg-dark text-white border-z py-3 shadow-none mt-1"
                            value={bookingData.startDate}
                            onChange={(e) => updateBooking({ startDate: e.target.value })}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className="text-accent small fw-bold">END DATE</Form.Label>
                        <Form.Control 
                            type="date" 
                            className="bg-dark text-white border-z py-3 shadow-none mt-1"
                            value={bookingData.endDate}
                            onChange={(e) => updateBooking({ endDate: e.target.value })}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
};

const Step3MajorDestinations = () => {
    const { bookingData, updateBooking } = useBooking();
    const [inputValue, setInputValue] = useState("");

    const addDest = (val) => {
        if (val && !bookingData.majorDestinations.includes(val)) {
            updateBooking({ majorDestinations: [...bookingData.majorDestinations, val] });
        }
        setInputValue("");
    };

    return (
        <div>
            <h4 className="text-white fw-800 mb-2">Major <span className="text-accent">Destinations</span></h4>
            <p className="text-muted small mb-5">Add the main cities/regions you want to visit. These are shown to drivers before they accept.</p>
            <Autocomplete 
                options={INDIAN_LOCATIONS}
                value={inputValue}
                onSelect={addDest}
                placeholder="e.g. Ooty, Coorg, Wayanad..."
                label="ADD DESTINATION"
            />
            <div className="d-flex flex-wrap gap-2 mt-3">
                {bookingData.majorDestinations.map((dest, idx) => (
                    <Badge key={idx} bg="dark" className="border-z p-2 px-3 fw-normal rounded-pill d-flex align-items-center gap-2">
                        {dest} <i className="bi bi-x-circle cursor-pointer text-danger" onClick={() => updateBooking({ majorDestinations: bookingData.majorDestinations.filter(d => d !== dest) })}></i>
                    </Badge>
                ))}
            </div>
        </div>
    );
};

const Step4DetailedDestinations = () => {
    const { bookingData, updateBooking } = useBooking();
    const [newItem, setNewItem] = useState({ name: '', notes: '' });

    const addItem = () => {
        if (newItem.name) {
            updateBooking({ detailedDestinations: [...bookingData.detailedDestinations, { ...newItem, id: Date.now() }] });
            setNewItem({ name: '', notes: '' });
        }
    };

    return (
        <div>
            <h4 className="text-white fw-800 mb-2">Trip <span className="text-accent">Itinerary</span></h4>
            <p className="text-muted small mb-5">List specific sightseeing spots. Drivers see this only after the trip starts.</p>
            <div className="bg-charcoal p-3 rounded-4 mb-4 border border-z">
                 <Form.Control className="mb-2" placeholder="Spot name (e.g. Abbey Falls)" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                 <Form.Control className="mb-3" placeholder="Notes (e.g. Photography, 2 hours)" value={newItem.notes} onChange={e => setNewItem({...newItem, notes: e.target.value})} />
                 <Button variant="outline-accent" size="sm" className="w-100 py-2 border-z" onClick={addItem} style={{ color: 'var(--z-accent-orange)' }}>Add to Itinerary</Button>
            </div>
            <ListGroup variant="flush">
                {bookingData.detailedDestinations.map(item => (
                    <ListGroup.Item key={item.id} className="bg-transparent border-z py-2 px-0 d-flex justify-content-between text-white">
                        <div>
                            <div className="fw-bold">{item.name}</div>
                            <div className="small text-muted">{item.notes}</div>
                        </div>
                        <i className="bi bi-trash text-muted cursor-pointer" onClick={() => updateBooking({ detailedDestinations: bookingData.detailedDestinations.filter(i => i.id !== item.id) })}></i>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

const Step5VehicleSelection = () => {
    const { bookingData, updateBooking } = useBooking();
    
    const vehicles = [
        { type: VEHICLE_TYPES.MINI, name: 'Hatchback (Mini)', seats: 4, desc: 'Ideal for small groups, city tours.' },
        { type: VEHICLE_TYPES.SEDAN, name: 'Premium Sedan', seats: 4, desc: 'Luxury comfort for families.' },
        { type: VEHICLE_TYPES.SUV, name: 'Premium SUV', seats: 6, desc: 'Ultimate ground clearance & comfort.' },
        { type: VEHICLE_TYPES.TEMPO, name: 'Luxe Traveler', seats: 12, desc: 'Perfect for large family gatherings.' }
    ];

    return (
        <div>
            <h4 className="text-white fw-800 mb-2">Choose Your <span className="text-accent">Vehicle</span></h4>
            <p className="text-muted small mb-4">Select the category that fits your party size and luggage needs.</p>
            <Row className="g-3">
                {vehicles.map(v => (
                    <Col key={v.type} md={6}>
                        <div 
                            className={`p-3 rounded-4 border transition-smooth cursor-pointer h-100 ${bookingData.vehicleType === v.type ? 'border-accent bg-charcoal shadow-glow' : 'border-z bg-dark'}`}
                            onClick={() => updateBooking({ vehicleType: v.type })}
                        >
                            <div className="d-flex justify-content-between mb-2">
                                <h6 className="text-white fw-bold mb-0">{v.name}</h6>
                                <Badge bg="dark" className="border-z text-accent">{v.seats} Seats</Badge>
                            </div>
                            <p className="text-muted small mb-0">{v.desc}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

const Step6Payment = () => {
    const { bookingData, updateBooking } = useBooking();
    return (
        <div>
            <h4 className="text-white fw-800 mb-2">Advance <span className="text-accent">Preference</span></h4>
            <p className="text-muted small mb-5">Confirm your driver by paying a small advance upfront.</p>
            <div className="d-grid gap-3">
                {[0.25, 0.50, 1.0].map(pref => (
                    <div 
                        key={pref}
                        className={`p-4 rounded-4 border transition-smooth cursor-pointer text-center ${bookingData.paymentPreference === pref ? 'border-accent bg-charcoal shadow-glow' : 'border-z bg-dark'}`}
                        onClick={() => updateBooking({ paymentPreference: pref })}
                    >
                         <h3 className="text-white fw-800 mb-0">{pref * 100}%</h3>
                         <p className="text-muted small mb-0">{pref === 0.25 ? 'Minimum required to confirm' : pref === 1.0 ? 'Full settlement upfront' : 'Balanced confirmation'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Step7Review = ({ onConfirm }) => {
    const { bookingData } = useBooking();
    return (
        <div className="text-center">
            <i className="bi bi-patch-check fs-1 text-accent mb-4 d-block"></i>
            <h4 className="text-white fw-800 mb-4">Final Trip Review</h4>
            <div className="text-start bg-charcoal p-4 rounded-4 border-z mb-4">
                 <div className="mb-3 border-bottom border-z pb-2">
                    <div className="text-muted small uppercase fw-bold">Route</div>
                    <div className="text-white fw-bold">{bookingData.pickupLocation} &rarr; {bookingData.majorDestinations.join(', ')}</div>
                 </div>
                 <Row className="g-3">
                    <Col xs={6}>
                        <div className="text-muted small uppercase fw-bold">Dates</div>
                        <div className="text-white fw-bold">{bookingData.startDate} to {bookingData.endDate}</div>
                    </Col>
                    <Col xs={6}>
                        <div className="text-muted small uppercase fw-bold">Vehicle</div>
                        <div className="text-white fw-bold text-uppercase">{bookingData.vehicleType}</div>
                    </Col>
                 </Row>
            </div>
            <p className="text-muted small mb-5">By confirming, your request will be visible to all online drivers matching your criteria.</p>
            <Button variant="primary" className="py-3 px-5 shadow-glow w-100" onClick={onConfirm}>Confirm & Post Ride</Button>
        </div>
    );
};

export default RideBooking;
