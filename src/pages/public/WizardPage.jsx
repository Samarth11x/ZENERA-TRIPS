import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, ListGroup, InputGroup, Badge, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { VEHICLE_PRICING } from '../../data/mockData';
import { calculateFare as calculateTripFare, getTripDuration } from '../../utils/pricing';
import BookingStepper from '../../components/booking/BookingStepper';
import AppNavbar from '../../components/common/AppNavbar';
import Autocomplete from '../../components/common/Autocomplete';
import { INDIAN_LOCATIONS } from '../../data/locations';

const WizardPage = () => {
    const { bookingData, updateBooking, nextStep, prevStep, setPricingEstimate, pricingEstimate } = useBooking();
    const { step } = bookingData;

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1Location />;
            case 2: return <Step2Dates />;
            case 3: return <Step3MajorDestinations />;
            case 4: return <Step4DetailedDestinations />;
            case 5: return <Step5VehicleSelection />;
            case 6: return <Step6Payment />;
            case 7: return <Step7Review />;
            default: return <Step1Location />;
        }
    };

    return (
        <div className="app-shell bg-black min-vh-100">
            <AppNavbar />
            <main className="section-padding pt-5 mt-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={9} xl={8}>
                            <BookingStepper currentStep={step} />
                            
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <Card className="card-glass p-4 p-md-5 shadow-glow border-0">
                                        {renderStep()}
                                    </Card>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="d-flex justify-content-between mt-4">
                                {step > 1 && (
                                    <Button variant="outline-light" onClick={prevStep} className="px-4 py-2 border-z">
                                        <i className="bi bi-arrow-left me-2"></i>Back
                                    </Button>
                                )}
                                <div className="ms-auto" />
                                {step < 7 && step !== 5 && step !== 6 && (
                                    <Button variant="primary" onClick={nextStep} className="px-5 py-2 shadow-glow">
                                        Next Step<i className="bi bi-arrow-right ms-2"></i>
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
};

/* --- Step Components --- */

const Step1Location = () => {
    const { bookingData, updateBooking } = useBooking();
    return (
        <div>
            <h2 className="display-6 fw-bold mb-3">Where are we <span className="text-accent">starting?</span></h2>
            <p className="text-muted mb-5">Enter your pickup location. Note: ZENERA trips are round-trip, so your journey will also end here.</p>
            <Autocomplete 
                options={INDIAN_LOCATIONS}
                value={bookingData.pickupLocation}
                onChange={(val) => updateBooking({ pickupLocation: val })}
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
            <h2 className="display-6 fw-bold mb-3">Select Your <span className="text-accent">Dates</span></h2>
            <p className="text-muted mb-4">Choose your trip window. Note: We provide a ±2 day flexibility buffer for travel delays.</p>
            <Row className="g-4">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className="text-accent small fw-bold">START DATE</Form.Label>
                        <Form.Control 
                            type="date" 
                            className="bg-dark text-white border-z py-3 shadow-none"
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
                            className="bg-dark text-white border-z py-3 shadow-none"
                            value={bookingData.endDate}
                            onChange={(e) => updateBooking({ endDate: e.target.value })}
                        />
                    </Form.Group>
                </Col>
            </Row>
            {bookingData.startDate && bookingData.endDate && (
                <Alert variant="dark" className="mt-4 border-z border">
                    <i className="bi bi-info-circle-fill text-accent me-2"></i>
                    Your trip duration: <strong>{getTripDuration(bookingData.startDate, bookingData.endDate)} Days</strong>
                </Alert>
            )}
        </div>
    );
};

const Step3MajorDestinations = () => {
    const { bookingData, updateBooking } = useBooking();
    const [inputValue, setInputValue] = useState("");

    const addDestination = (val) => {
        const target = val || inputValue;
        if (target && !bookingData.majorDestinations.includes(target)) {
            updateBooking({ majorDestinations: [...bookingData.majorDestinations, target] });
            setInputValue("");
        }
    };

    const removeDestination = (idx) => {
        const updated = bookingData.majorDestinations.filter((_, i) => i !== idx);
        updateBooking({ majorDestinations: updated });
    };

    return (
        <div>
            <h2 className="display-6 fw-bold mb-3">Major <span className="text-accent">Destinations</span></h2>
            <p className="text-muted mb-4">Add the main cities or regions you want to visit. These are shown to drivers before they accept your trip.</p>
            <Autocomplete 
                options={INDIAN_LOCATIONS}
                value={inputValue}
                onChange={(val) => setInputValue(val)}
                onSelect={(val) => {
                    if (val && !bookingData.majorDestinations.includes(val)) {
                        updateBooking({ majorDestinations: [...bookingData.majorDestinations, val] });
                    }
                    setInputValue("");
                }}
                placeholder="e.g. Ooty, Coorg, Mysore..."
                label="ADD DESTINATION"
            />
            <div className="d-flex flex-wrap gap-2">
                {bookingData.majorDestinations.map((dest, idx) => (
                    <div key={idx} className="bg-dark border border-z px-3 py-2 rounded-pill d-flex align-items-center">
                        <span className="me-2">{dest}</span>
                        <i className="bi bi-x-circle-fill text-muted cursor-pointer" onClick={() => removeDestination(idx)}></i>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Step4DetailedDestinations = () => {
    const { bookingData, updateBooking } = useBooking();
    const [newDest, setNewDest] = useState({ name: '', notes: '' });

    const addItem = () => {
        if (newDest.name) {
            const item = { id: Date.now(), ...newDest };
            updateBooking({ detailedDestinations: [...bookingData.detailedDestinations, item] });
            setNewDest({ name: '', notes: '' });
        }
    };

    const removeItem = (id) => {
        const filtered = bookingData.detailedDestinations.filter(i => i.id !== id);
        updateBooking({ detailedDestinations: filtered });
    };

    return (
        <div>
            <h2 className="display-6 fw-bold mb-3">Trip <span className="text-accent">Itinerary</span></h2>
            <p className="text-muted mb-4">List specific sightseeing spots or local destinations. Drivers see this only after the trip starts.</p>
            
            <div className="bg-dark p-3 rounded-4 mb-4 border border-z">
                <Row className="g-3 align-items-end">
                    <Col md={5}>
                        <Form.Label className="text-accent small fw-bold">LOCATION NAME</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="e.g. Abbey Falls, Mysore Palace" 
                            value={newDest.name}
                            onChange={(e) => setNewDest({...newDest, name: e.target.value})}
                        />
                    </Col>
                    <Col md={5}>
                        <Form.Label className="text-accent small fw-bold">NOTES (OPTIONAL)</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="e.g. Visit at 10 AM, Photography" 
                            value={newDest.notes}
                            onChange={(e) => setNewDest({...newDest, notes: e.target.value})}
                        />
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" className="w-100" onClick={addItem}>Add</Button>
                    </Col>
                </Row>
            </div>

            <ListGroup variant="flush">
                {bookingData.detailedDestinations.map((item) => (
                    <ListGroup.Item key={item.id} className="bg-transparent border-z py-3 px-0 d-flex justify-content-between align-items-start">
                        <div>
                            <div className="fw-bold text-white">{item.name}</div>
                            {item.notes && <div className="small text-muted">{item.notes}</div>}
                        </div>
                        <Button variant="link" className="text-danger p-0" onClick={() => removeItem(item.id)}>
                            <i className="bi bi-trash fs-5"></i>
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

const Step5VehicleSelection = () => {
    const { bookingData, updateBooking, setPricingEstimate, nextStep } = useBooking();
    const duration = getTripDuration(bookingData.startDate, bookingData.endDate);

    const handleSelect = (type) => {
        const fare = calculateTripFare({
            vehicleTypeCode: type,
            tripDays: duration,
            pricingData: VEHICLE_PRICING
        });
        setPricingEstimate(fare);
        updateBooking({ vehicleType: type });
        nextStep();
    };

    return (
        <div>
            <h2 className="display-6 fw-bold mb-3">Choose Your <span className="text-accent">Vehicle</span></h2>
            <p className="text-muted mb-5">Select a vehicle category that fits your group size and budget.</p>
            <Row className="g-4">
                {Object.entries(VEHICLE_PRICING).map(([code, v]) => {
                    const est = calculateTripFare({
                        vehicleTypeCode: code,
                        tripDays: duration,
                        pricingData: VEHICLE_PRICING
                    });
                    return (
                        <Col md={6} key={code}>
                            <Card 
                                className={`card-glass h-100 border-z p-3 cursor-pointer ${bookingData.vehicleType === code ? 'border-accent shadow-glow' : ''}`}
                                onClick={() => handleSelect(code)}
                            >
                                <div className="position-relative mb-3">
                                    <div className="rounded-3 overflow-hidden bg-dark" style={{ height: '160px' }}>
                                        <img src={v.image} alt={v.name} className="w-100 h-100 object-fit-cover opacity-75" />
                                    </div>
                                    <div className="position-absolute top-0 end-0 p-2">
                                        <Badge bg="accent" text="dark" className="p-2 fw-bold">₹{v.ratePerKm}/km</Badge>
                                    </div>
                                </div>
                                <h4 className="fw-bold text-white mb-2">{v.name}</h4>
                                <div className="text-muted small mb-4">
                                   <i className="bi bi-people-fill me-2"></i>Ideal for {code === 'hatch' || code === 'sedan' ? '4' : code === 'suv' ? '6' : '12'} travelers
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="text-accent fw-bold fs-5">Est. ₹{est.grandTotal.toLocaleString()}</div>
                                    <Button variant={bookingData.vehicleType === code ? "primary" : "outline-light"} size="sm">Select</Button>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

const Step6Payment = () => {
    const { bookingData, updateBooking, pricingEstimate, nextStep } = useBooking();
    const [loading, setLoading] = useState(false);

    const handlePayment = (pref) => {
        updateBooking({ paymentPreference: pref });
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            nextStep();
        }, 1500); // Simulate network delay
    };

    if (loading) return (
        <div className="text-center py-5">
            <div className="spinner-border text-accent mb-4" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            <h4 className="text-white">Authorizing Payment...</h4>
            <p className="text-muted">Please do not close this window.</p>
        </div>
    );

    return (
        <div>
            <h2 className="display-6 fw-bold mb-3">Select <span className="text-accent">Advance</span></h2>
            <p className="text-muted mb-5">Choose how much you want to pay upfront to confirm your booking.</p>
            <div className="d-grid gap-4">
                {[0.25, 0.50, 1.0].map((pref) => (
                    <Card key={pref} className={`card-glass p-4 border-z cursor-pointer hover-accent ${bookingData.paymentPreference === pref ? 'border-accent shadow-glow' : ''}`} onClick={() => handlePayment(pref)}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <div className="fw-bold fs-4 text-white">{Math.round(pref * 100)}% Advance</div>
                                <div className="text-muted">Required to confirm driver</div>
                            </div>
                            <div className="text-end">
                                <div className="display-6 fw-bold text-accent">₹{Math.round((pricingEstimate?.grandTotal || 0) * pref).toLocaleString()}</div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="mt-5 text-center text-muted small">
                <i className="bi bi-lock-fill me-2"></i>Secure payment powered by ZENERA Payments
            </div>
        </div>
    );
};

const Step7Review = () => {
    const { bookingData, pricingEstimate } = useBooking();
    const vehicle = VEHICLE_PRICING[bookingData.vehicleType || 'hatch'];
    const total = pricingEstimate?.grandTotal || 0;
    const paid = Math.round(total * (bookingData.paymentPreference || 0.25));

    return (
        <div>
            <h2 className="display-6 fw-bold mb-4 text-success">Verification <span className="text-accent">Complete</span></h2>
            <Row className="g-5">
                <Col md={7}>
                    <h5 className="text-white border-bottom border-z pb-2 mb-3">Trip Details</h5>
                    <div className="mb-4">
                        <div className="small text-accent fw-bold mb-1">ROUTE</div>
                        <div className="fs-5 fw-bold">{bookingData.pickupLocation} &rarr; {bookingData.majorDestinations.join(' &rarr; ')} &rarr; {bookingData.pickupLocation}</div>
                    </div>
                    <div className="d-flex gap-5 mb-4">
                        <div>
                            <div className="small text-accent fw-bold mb-1">DATES</div>
                            <div>{bookingData.startDate} to {bookingData.endDate}</div>
                        </div>
                        <div className="d-flex align-items-center gap-4">
                            <div>
                                <div className="small text-accent fw-bold mb-1">VEHICLE</div>
                                <div className="fs-5">{vehicle?.name || 'Hatchback'}</div>
                                <div className="small text-muted">{vehicle?.ratePerKm}/km Rate</div>
                            </div>
                            {vehicle?.image && (
                                <div className="rounded-3 overflow-hidden border border-z" style={{ width: '100px', height: '60px' }}>
                                    <img src={vehicle.image} alt={vehicle.name} className="w-100 h-100 object-fit-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                    <Alert variant="warning" className="bg-transparent border-z text-muted small">
                        <i className="bi bi-info-circle-fill me-2 text-warning"></i>
                        Booking within 24 hours? You'll see "Waiting for driver" while we find the best match for your route.
                    </Alert>
                </Col>
                <Col md={5}>
                    <Card className="bg-dark border border-z p-4">
                        <h5 className="text-white mb-4">Fare Summary</h5>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-white">Base Fare</span>
                            <span className="text-white fw-bold">₹{pricingEstimate?.baseFare?.toLocaleString() || '0'}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-white">Driver Allowance</span>
                            <span className="text-white fw-bold">₹{pricingEstimate?.allowanceTotal?.toLocaleString() || '0'}</span>
                        </div>
                        <hr className="border-z opacity-25" />
                        <div className="d-flex justify-content-between mb-4">
                            <span className="fw-bold text-white">Total Estimated</span>
                            <span className="fw-bold fs-4 text-accent">₹{total?.toLocaleString() || '0'}</span>
                        </div>
                        <div className="bg-accent text-dark p-2 rounded text-center fw-bold">
                             Paid Advance: ₹{paid.toLocaleString()}
                        </div>
                    </Card>
                </Col>
            </Row>
            <div className="mt-5 d-grid">
                <Button variant="primary" size="lg" className="py-3 shadow-glow" onClick={() => window.location.href = '/'}>
                    Go to My Dashboard
                </Button>
            </div>
        </div>
    );
};

export default WizardPage;
