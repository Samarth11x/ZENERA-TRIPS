import React from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useTrip } from '../../context/TripContext';
import { TRIP_STATUS } from '../../utils/constants';

const AdminDash = () => {
    const { activeTrip } = useTrip();

    const stats = [
        { label: 'Active Trips', value: activeTrip ? 1 : 0, color: 'text-success' },
        { label: 'Total Revenue', value: '₹14.2L', color: 'text-accent' },
        { label: 'Online Drivers', value: 42, color: 'text-white' },
        { label: 'Total Users', value: '1.2K', color: 'text-white' }
    ];

    return (
        <div className="admin-portal bg-black min-vh-100 pb-5">
            <Container className="pt-4 px-4 overflow-hidden">
                <div className="mb-4">
                    <h2 className="text-white fw-800 mb-1">Admin Command Center</h2>
                    <p className="text-muted small">Real-time platform oversight</p>
                </div>

                {/* Dashboard Stats */}
                <Row className="g-3 mb-5">
                    {stats.map((stat, idx) => (
                        <Col key={idx} xs={6} md={3}>
                            <Card className="card-glass border-z p-3 shadow-glow text-center">
                                <div className="text-muted small fw-bold mb-1 opacity-50 uppercase">{stat.label}</div>
                                <div className={`fs-3 fw-800 ${stat.color}`}>{stat.value}</div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Live Bookings Table */}
                <h6 className="text-accent fw-bold small mb-3">LIVE RIDE MONITOR</h6>
                <Card className="card-glass border-0 shadow-glow rounded-4 overflow-hidden mb-5">
                    <div className="table-responsive">
                        <Table className="table-dark table-hover mb-0 align-middle">
                            <thead className="bg-charcoal text-accent small fw-bold border-bottom border-z">
                                <tr>
                                    <th className="px-4 py-3 border-0">TRIP ID</th>
                                    <th className="py-3 border-0">PASSENGER</th>
                                    <th className="py-3 border-0">DRIVER</th>
                                    <th className="py-3 border-0">STATUS</th>
                                    <th className="py-3 border-0">FARE</th>
                                    <th className="px-4 py-3 border-0 text-end">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeTrip ? (
                                    <tr className="border-bottom border-z">
                                        <td className="px-4 text-white fw-bold">{activeTrip.id}</td>
                                        <td>Samarth</td>
                                        <td>{activeTrip.driver?.name || 'Searching...'}</td>
                                        <td>
                                            <Badge bg="accent" text="dark" className="px-2 py-1 small fw-bold rounded-1">
                                                {activeTrip.status}
                                            </Badge>
                                        </td>
                                        <td className="text-white">₹{activeTrip.pricing?.grandTotal || 'Estimating...'}</td>
                                        <td className="px-4 text-end">
                                            <Button variant="outline-light" size="sm" className="border-z opacity-50"><i className="bi bi-eye"></i></Button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted fst-italic">No active trips currently in monitor</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card>

                {/* Driver Management */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-accent fw-bold small mb-0">PARTNER MANAGEMENT</h6>
                    <Button variant="link" className="text-accent small text-decoration-none p-0">View All Drivers</Button>
                </div>
                <Row className="g-3">
                    <Col md={6}>
                        <Card className="card-glass border-z p-3 d-flex flex-row align-items-center gap-3">
                            <div className="bg-charcoal p-2 rounded-3 border-z"><i className="bi bi-person-badge fs-4 text-accent"></i></div>
                            <div>
                                <div className="text-white fw-bold">Rajesh Kumar</div>
                                <div className="text-muted small">KA-01-MJ-1234 • Luxury Sedan</div>
                            </div>
                            <div className="ms-auto"><Badge bg="success" className="px-2">VERIFIED</Badge></div>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="card-glass border-z p-3 d-flex flex-row align-items-center gap-3">
                            <div className="bg-charcoal p-2 rounded-3 border-z"><i className="bi bi-person-badge fs-4 text-accent"></i></div>
                            <div>
                                <div className="text-white fw-bold">Anil Sharma</div>
                                <div className="text-muted small">MH-02-AK-5678 • Mini SUV</div>
                            </div>
                            <div className="ms-auto"><Badge bg="warning" text="dark" className="px-2">PENDING</Badge></div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDash;
