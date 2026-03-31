import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Table } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { MOCK_BOOKINGS, VEHICLE_PRICING } from '../../data/mockData';
import AppNavbar from '../../components/common/AppNavbar';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
    return (
        <div className="app-shell bg-black min-vh-100">
            <AppNavbar />
            <main className="section-padding pt-5 mt-5">
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <h2 className="display-5 fw-bold text-white">My <span className="text-accent">Trips</span></h2>
                        <Button as={Link} to="/book" variant="primary" className="shadow-glow px-4">
                            <i className="bi bi-plus-lg me-2"></i>New Booking
                        </Button>
                    </div>

                    <Row className="g-4 mb-5">
                        <Col lg={8}>
                            <h5 className="text-white mb-4"><i className="bi bi-clock-history me-2 text-accent"></i>Active & Upcoming</h5>
                            {MOCK_BOOKINGS.map((booking) => (
                                <TripCard key={booking.id} booking={booking} />
                            ))}
                        </Col>
                        <Col lg={4}>
                            <Card className="card-glass p-4 border-0 mb-4">
                                <h5 className="text-white mb-4">AI Travel Assistant</h5>
                                <div className="bg-dark p-3 rounded-4 border border-z mb-3">
                                    <p className="small text-muted mb-3">Need help with your current trip? Ask our AI planner for itinerary suggestions or cost estimates.</p>
                                    <Button variant="outline-accent" size="sm" className="w-100">Open AI Planner</Button>
                                </div>
                            </Card>
                            <Card className="card-glass p-4 border-0">
                                <h5 className="text-white mb-4">Quick Stats</h5>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Total Trips</span>
                                    <span className="fw-bold">12</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">KM Travelled</span>
                                    <span className="fw-bold">4,250 km</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Member Since</span>
                                    <span className="fw-bold">Jan 2026</span>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <h5 className="text-white mb-4"><i className="bi bi-calendar-check me-2 text-accent"></i>Past Journeys</h5>
                    <div className="card-glass p-0 border-0 overflow-hidden">
                        <Table responsive hover variant="dark" className="bg-transparent mb-0">
                            <thead className="bg-charcoal border-bottom border-z">
                                <tr>
                                    <th className="py-3 px-4 border-0">ID</th>
                                    <th className="py-3 px-4 border-0">Route</th>
                                    <th className="py-3 px-4 border-0">Dates</th>
                                    <th className="py-3 px-4 border-0">Vehicle</th>
                                    <th className="py-3 px-4 border-0">Total</th>
                                    <th className="py-3 px-4 border-0">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <PastTripRow id="ZT-089" route="Bangalore → Coorg" dates="Mar 12 - 15" vehicle="SUV" total="₹24,500" />
                                <PastTripRow id="ZT-075" route="Chennai → Pondicherry" dates="Feb 20 - 22" vehicle="Sedan" total="₹8,200" />
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </main>
        </div>
    );
};

const TripCard = ({ booking }) => {
    const vehicle = VEHICLE_PRICING[booking.vehicleType];
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="card-glass border-0 p-4 mb-4">
                <Row className="align-items-center">
                    <Col md={3} className="mb-3 mb-md-0">
                        <div className="rounded-4 overflow-hidden border border-z" style={{ height: '120px' }}>
                            <img src={vehicle?.image} alt={vehicle?.name} className="w-100 h-100 object-fit-cover" />
                        </div>
                    </Col>
                    <Col md={5}>
                        <h4 className="fw-bold text-white mb-2">{booking.pickupLocation} &rarr; Coorg</h4>
                        <div className="text-muted small mb-1"><i className="bi bi-calendar3 me-2"></i>{booking.startDate} to {booking.endDate}</div>
                        <div className="text-accent small"><i className="bi bi-car-front-fill me-2"></i>{vehicle?.name}</div>
                    </Col>
                    <Col md={2} className="text-center">
                        <Badge bg="success" className="px-3 py-2 rounded-pill mb-2">Confirmed</Badge>
                        <div className="small text-muted">Driver Assigned</div>
                    </Col>
                    <Col md={2} className="text-end">
                        <Button variant="outline-light" size="sm" className="border-z w-100">Details</Button>
                    </Col>
                </Row>
            </Card>
        </motion.div>
    );
};

const PastTripRow = ({ id, route, dates, vehicle, total }) => (
    <tr className="border-bottom border-z">
        <td className="py-3 px-4 border-0">{id}</td>
        <td className="py-3 px-4 border-0 fw-bold">{route}</td>
        <td className="py-3 px-4 border-0 text-muted">{dates}</td>
        <td className="py-3 px-4 border-0">{vehicle}</td>
        <td className="py-3 px-4 border-0 fw-bold text-accent">{total}</td>
        <td className="py-3 px-4 border-0"><Badge bg="secondary" className="bg-opacity-25 text-white border border-z">Completed</Badge></td>
    </tr>
);

export default CustomerDashboard;
