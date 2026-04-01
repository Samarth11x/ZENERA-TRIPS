import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { VEHICLE_PRICING } from '../../data/mockData';
import { calculateFare as calculateTripFare } from '../../utils/pricing';

const PlannerPage = () => {
    const [plannerData, setPlannerData] = useState({
        guests: 4,
        days: 3,
        destinations: '',
        style: 'Luxury',
        budget: 'Medium'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePlan = () => {
        setLoading(true);
        setTimeout(() => {
            // Suggest vehicle based on guests
            let vType = 'sedan';
            if (plannerData.guests > 4) vType = 'suv';
            if (plannerData.guests > 6) vType = 'tempo';

            const estimate = calculateTripFare({
                vehicleTypeCode: vType,
                tripDays: plannerData.days,
                pricingData: VEHICLE_PRICING
            });

            setResult({
                vehicle: VEHICLE_PRICING[vType],
                estimate,
                itinerary: [
                    { day: 1, activity: `Arrival at ${plannerData.destinations || 'Destination'}, Local Sightseeing` },
                    { day: 2, activity: "Nature Walk & Major Attractions visit" },
                    { day: 3, activity: "Shopping & Return Journey" }
                ],
                tips: [
                    "Carry light woolens for mountain regions.",
                    "Start early to avoid tourist traffic.",
                    "Keep your local guide's number handy."
                ]
            });
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="app-shell bg-black min-vh-100">

            <main className="section-padding pt-5 mt-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-800 text-uppercase mb-3">AI Travel <span className="text-accent">Planner</span></h2>
                        <p className="lead text-muted">Smart suggestions for your next premium road trip.</p>
                    </div>

                    <Row className="g-4">
                        <Col lg={5}>
                            <Card className="card-glass p-4 border-0 shadow-glow">
                                <h4 className="text-white mb-4">Trip Details</h4>
                                <Form className="d-grid gap-4">
                                    <Form.Group>
                                        <Form.Label className="text-accent small fw-bold">TRAVELERS</Form.Label>
                                        <Form.Range 
                                            min={1} max={16} 
                                            value={plannerData.guests} 
                                            onChange={(e) => setPlannerData({...plannerData, guests: parseInt(e.target.value)})} 
                                        />
                                        <div className="text-end text-white small mt-1">{plannerData.guests} Persons</div>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="text-accent small fw-bold">TRIP DAYS</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            className="bg-dark text-white border-z" 
                                            value={plannerData.days} 
                                            onChange={(e) => setPlannerData({...plannerData, days: parseInt(e.target.value)})}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="text-accent small fw-bold">DESTINATIONS</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="e.g. Ooty, Coorg..." 
                                            className="bg-dark text-white border-z" 
                                            value={plannerData.destinations} 
                                            onChange={(e) => setPlannerData({...plannerData, destinations: e.target.value})}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="text-accent small fw-bold">TRAVEL STYLE</Form.Label>
                                        <div className="d-flex gap-2">
                                            {['Luxury', 'Balanced', 'Economic'].map(style => (
                                                <Button 
                                                    key={style}
                                                    variant={plannerData.style === style ? 'accent' : 'outline-light'}
                                                    size="sm"
                                                    className="flex-grow-1 border-z"
                                                    onClick={() => setPlannerData({...plannerData, style})}
                                                >
                                                    {style}
                                                </Button>
                                            ))}
                                        </div>
                                    </Form.Group>

                                    <Button variant="primary" className="py-3 shadow-glow mt-2" onClick={handlePlan} disabled={loading}>
                                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-stars me-2"></i>}
                                        Generate Plan
                                    </Button>
                                </Form>
                            </Card>
                        </Col>

                        <Col lg={7}>
                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                        <Card className="card-glass p-0 border-0 overflow-hidden mb-4">
                                            <div className="bg-accent p-3 text-dark d-flex justify-content-between align-items-center shadow-lg">
                                                <h5 className="mb-0 fw-bold">Recommended: {result.vehicle?.name || 'Round-trip Vehicle'}</h5>
                                                <Badge bg="dark" text="accent" className="p-2 border border-z">Est. ₹{result.estimate?.grandTotal?.toLocaleString() || '0'}</Badge>
                                            </div>
                                            <div className="p-4">
                                                {result.vehicle?.image && (
                                                    <div className="rounded-4 overflow-hidden mb-4 border border-z" style={{ height: '200px' }}>
                                                        <img src={result.vehicle.image} alt={result.vehicle.name} className="w-100 h-100 object-fit-cover opacity-75 shadow-glow" />
                                                    </div>
                                                )}
                                                <Row className="g-4">
                                                    <Col md={6}>
                                                        <h6 className="text-white border-bottom border-z pb-2 mb-3">Itinerary Idea</h6>
                                                        <ListGroup variant="flush">
                                                            {result.itinerary?.map((item, idx) => (
                                                                <ListGroup.Item key={idx} className="bg-transparent border-0 px-0 py-2 d-flex gap-3 align-items-start">
                                                                    <div className="rounded-circle bg-accent text-dark fw-bold d-flex align-items-center justify-content-center shadow-sm" style={{ minWidth: '24px', height: '24px', fontSize: '12px' }}>{item.day}</div>
                                                                    <div className="small text-white opacity-75">{item.activity}</div>
                                                                </ListGroup.Item>
                                                            ))}
                                                        </ListGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <h6 className="text-white border-bottom border-z pb-2 mb-3">Travel Tips</h6>
                                                        <ul className="small text-muted ps-3">
                                                            {result.tips.map((tip, idx) => <li key={idx} className="mb-2">{tip}</li>)}
                                                        </ul>
                                                        <Alert variant="dark" className="border-z mt-4 py-2 small">
                                                            Min Billing KM: <strong>{result.estimate.minBillableKm} km</strong>
                                                        </Alert>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card>
                                        <div className="d-grid">
                                            <Button variant="primary" size="lg" className="py-3 shadow-glow" onClick={() => window.location.href = '/book'}>
                                                Proceed to Booking with this Plan
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-5 border border-z border-dashed rounded-5">
                                        <i className="bi bi-stars fs-1 text-accent mb-4"></i>
                                        <h5 className="text-white">AI Planner Ready</h5>
                                        <p className="text-muted max-w-400">Fill in your trip details to receive a customized recommendation and cost estimate.</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
};

export default PlannerPage;
