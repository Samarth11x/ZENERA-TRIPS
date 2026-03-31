import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Tabs, Tab, Form, InputGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { VEHICLE_PRICING, MOCK_BOOKINGS } from '../../data/mockData';
import AppNavbar from '../../components/common/AppNavbar';

const AdminDashboard = () => {
    const [pricing, setPricing] = useState(VEHICLE_PRICING);

    const updatePrice = (type, field, val) => {
        setPricing({
            ...pricing,
            [type]: { ...pricing[type], [field]: parseFloat(val) || 0 }
        });
    };

    return (
        <div className="app-shell bg-black min-vh-100">
            <AppNavbar />
            <main className="section-padding pt-5 mt-5">
                <Container>
                    <h2 className="display-5 fw-bold text-white mb-5">Admin <span className="text-accent">Control</span></h2>
                    
                    <Row className="g-4 mb-5">
                        <Col md={3}><AdminStatCard label="Total Bookings" value="156" icon="bi-calendar-check" color="accent" /></Col>
                        <Col md={3}><AdminStatCard label="Active Trips" value="28" icon="bi-play-circle" color="success" /></Col>
                        <Col md={3}><AdminStatCard label="Total Revenue" value="₹12.4L" icon="bi-cash-stack" color="white" /></Col>
                        <Col md={3}><AdminStatCard label="Commission" value="₹1.8L" icon="bi-percent" color="accent" /></Col>
                    </Row>

                    <Tabs defaultActiveKey="bookings" id="admin-tabs" className="mb-4 custom-tabs border-0">
                        <Tab eventKey="bookings" title="All Bookings">
                            <div className="pt-4 card-glass p-0 border-0 overflow-hidden">
                                <Table responsive hover variant="dark" className="bg-transparent mb-0">
                                    <thead className="bg-charcoal border-bottom border-z">
                                        <tr>
                                            <th className="py-3 px-4 border-0">ID</th>
                                            <th className="py-3 px-4 border-0">Customer</th>
                                            <th className="py-3 px-4 border-0">Route</th>
                                            <th className="py-3 px-4 border-0">Dates</th>
                                            <th className="py-3 px-4 border-0">Vehicle</th>
                                            <th className="py-3 px-4 border-0">Status</th>
                                            <th className="py-3 px-4 border-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_BOOKINGS.map((b) => (
                                            <tr key={b.id} className="border-bottom border-z">
                                                <td className="py-3 px-4 border-0">{b.id}</td>
                                                <td className="py-3 px-4 border-0 fw-bold text-white">{b.customer}</td>
                                                <td className="py-3 px-4 border-0">{b.pickupLocation} &rarr; Mysore</td>
                                                <td className="py-3 px-4 border-0 text-muted">{b.startDate} to {b.endDate}</td>
                                                <td className="py-3 px-4 border-0 text-accent uppercase">{b.vehicleType}</td>
                                                <td className="py-3 px-4 border-0"><Badge bg="success" className="bg-opacity-25 text-success border border-success">{b.status}</Badge></td>
                                                <td className="py-3 px-4 border-0"><Button variant="link" className="text-accent p-0 small">Manage</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                        <Tab eventKey="pricing" title="Pricing Engine Settings">
                            <div className="pt-4">
                                <Card className="card-glass border-0 p-4">
                                    <h5 className="text-white mb-4">Edit Vehicle Pricing Rules</h5>
                                    <Table responsive variant="dark" className="bg-transparent text-muted align-middle">
                                        <thead>
                                            <tr className="border-bottom border-z">
                                                <th className="py-3">Category</th>
                                                <th className="py-3">₹ / KM</th>
                                                <th className="py-3">Min KM/Day</th>
                                                <th className="py-3">Allowance/Day</th>
                                                <th className="py-3">Comm. / KM</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(pricing).map(([type, v]) => (
                                                <tr key={type} className="border-bottom border-z">
                                                    <td className="py-3 fw-bold text-white">{v.name}</td>
                                                    <td className="py-3">
                                                        <Form.Control 
                                                            size="sm" 
                                                            className="bg-dark text-white border-z" 
                                                            value={v.ratePerKm} 
                                                            onChange={(e) => updatePrice(type, 'ratePerKm', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="py-3">
                                                        <Form.Control 
                                                            size="sm" 
                                                            className="bg-dark text-white border-z" 
                                                            value={v.minKmPerDay}
                                                            onChange={(e) => updatePrice(type, 'minKmPerDay', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="py-3">
                                                        <Form.Control 
                                                            size="sm" 
                                                            className="bg-dark text-white border-z" 
                                                            value={v.allowancePerDay}
                                                            onChange={(e) => updatePrice(type, 'allowancePerDay', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="py-3">
                                                        <Form.Control 
                                                            size="sm" 
                                                            className="bg-dark text-white border-z" 
                                                            value={v.commissionPerKm}
                                                            onChange={(e) => updatePrice(type, 'commissionPerKm', e.target.value)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="text-end mt-4">
                                        <Button variant="primary" className="px-5 shadow-glow">Save Updates</Button>
                                    </div>
                                </Card>
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
            </main>
        </div>
    );
};

const AdminStatCard = ({ label, value, icon, color }) => (
    <Card className="card-glass border-0 p-4 h-100 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted small fw-bold">{label}</span>
            <i className={`bi ${icon} fs-4 text-${color}`}></i>
        </div>
        <div className={`display-6 fw-bold text-${color}`}>{value}</div>
    </Card>
);

export default AdminDashboard;
