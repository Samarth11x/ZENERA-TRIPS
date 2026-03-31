import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab, Table, ListGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { MOCK_BOOKINGS, VEHICLE_PRICING } from '../../data/mockData';
import AppNavbar from '../../components/common/AppNavbar';
import { Link } from 'react-router-dom';

const DriverDashboard = () => {
    return (
        <div className="app-shell bg-black min-vh-100">
            <AppNavbar />
            <main className="section-padding pt-5 mt-5">
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <h2 className="display-5 fw-bold text-white">Driver <span className="text-accent">Hub</span></h2>
                        <div className="text-end">
                            <Badge bg="accent" text="dark" className="px-3 py-2 fw-bold">Online</Badge>
                            <div className="small text-muted mt-1">Vehicle: Premium Sedan</div>
                        </div>
                    </div>

                    <Tabs defaultActiveKey="available" id="driver-tabs" className="mb-4 custom-tabs border-0">
                        <Tab eventKey="available" title="Available Trips (Matching Vehicle)">
                            <div className="pt-4">
                                <Row className="g-4">
                                    <Col lg={8}>
                                        {/* Sample Available Trip */}
                                        <DriverTripCard 
                                            id="ZT-202"
                                            route="Bangalore → Ooty"
                                            dates="Apr 15 - 18"
                                            duration="4 Days"
                                            payout="₹12,400"
                                            status="New"
                                        />
                                        <DriverTripCard 
                                            id="ZT-205"
                                            route="Bangalore → Coorg"
                                            dates="Apr 20 - 22"
                                            duration="3 Days"
                                            payout="₹8,600"
                                            status="Available"
                                        />
                                    </Col>
                                    <Col lg={4}>
                                        <Card className="card-glass p-4 border-0 mb-4 bg-dark">
                                            <h5 className="text-white mb-4"><i className="bi bi-info-circle me-2 text-accent"></i>Visibility Rules</h5>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className="bg-transparent border-z py-2 px-0 text-muted small"><i className="bi bi-check-lg text-accent me-2"></i>Visible 72h before trip start</ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent border-z py-2 px-0 text-muted small"><i className="bi bi-check-lg text-accent me-2"></i>Remains visible at 48h</ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent border-z py-2 px-0 text-muted small"><i className="bi bi-fire text-danger me-2"></i>High Priority last 24 hours</ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent border-z py-2 px-0 text-muted small"><i className="bi bi-bell-fill text-warning me-2"></i>Notifications only in last 24h</ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Tab>
                        <Tab eventKey="accepted" title="My Accepted Trips">
                            <div className="pt-4">
                               <DriverTripCard 
                                    id="ZT-101"
                                    route="Bangalore → Mysore"
                                    dates="Apr 10 - 13"
                                    duration="3 Days"
                                    payout="₹9,200"
                                    status="Accepted"
                                    isActive={true}
                                />
                            </div>
                        </Tab>
                        <Tab eventKey="earnings" title="My Earnings">
                            <div className="pt-4">
                                <Row className="g-4 mb-4">
                                    <Col md={4}><StatCard label="Total Earnings" value="₹1,24,500" icon="bi-wallet2" /></Col>
                                    <Col md={4}><StatCard label="Platform Fee Paid" value="₹18,400" icon="bi-percent" /></Col>
                                    <Col md={4}><StatCard label="Trips Completed" value="42" icon="bi-check-all" /></Col>
                                </Row>
                                <div className="card-glass p-0 border-0 overflow-hidden">
                                    <Table responsive hover variant="dark" className="bg-transparent mb-0">
                                        <thead className="bg-charcoal border-bottom border-z">
                                            <tr>
                                                <th className="py-3 px-4 border-0">ID</th>
                                                <th className="py-3 px-4 border-0">Route</th>
                                                <th className="py-3 px-4 border-0">Dates</th>
                                                <th className="py-3 px-4 border-0">Base Payout</th>
                                                <th className="py-3 px-4 border-0">Allowance</th>
                                                <th className="py-3 px-4 border-0">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-bottom border-z">
                                                <td className="py-3 px-4 border-0">ZT-089</td>
                                                <td className="py-3 px-4 border-0">Bangalore → Coorg</td>
                                                <td className="py-3 px-4 border-0">Mar 12 - 15</td>
                                                <td className="py-3 px-4 border-0">₹22,100</td>
                                                <td className="py-3 px-4 border-0">₹2,400</td>
                                                <td className="py-3 px-4 border-0 fw-bold text-accent">₹24,500</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
            </main>
        </div>
    );
};

const DriverTripCard = ({ id, route, dates, duration, payout, status, isActive }) => (
    <Card className={`card-glass border-0 p-4 mb-4 ${isActive ? 'border-accent shadow-glow' : ''}`}>
        <Row className="align-items-center">
            <Col md={5}>
                <div className="small text-muted mb-1 d-flex align-items-center gap-2">
                    <span className="fw-bold text-accent">{id}</span>
                    <Badge bg={status === 'New' ? 'danger' : 'secondary'} size="sm">{status}</Badge>
                </div>
                <h4 className="fw-bold text-white mb-2">{route}</h4>
                <div className="small text-muted">Round-trip starting {dates}</div>
            </Col>
            <Col md={3}>
                <div className="text-white fw-bold mb-1"><i className="bi bi-clock me-2 text-accent"></i>{duration}</div>
                <div className="small text-muted">Verified Customer OTP</div>
            </Col>
            <Col md={2} className="text-center">
                <div className="text-accent fw-bold fs-5">{payout}</div>
                <div className="small text-muted">Est. Payout</div>
            </Col>
            <Col md={2} className="text-end">
                {isActive ? (
                    <Button variant="primary" size="sm" className="w-100 shadow-glow py-2">
                        Execute Trip
                    </Button>
                ) : (
                   <Button variant="outline-accent" size="sm" className="w-100 py-2">
                        Accept Trip
                    </Button>
                )}
            </Col>
        </Row>
    </Card>
);

const StatCard = ({ label, value, icon }) => (
    <Card className="card-glass border-0 p-3 text-center h-100 bg-dark">
        <div className="text-accent fs-3 mb-2"><i className={`bi ${icon}`}></i></div>
        <div className="text-muted small mb-1">{label}</div>
        <div className="text-white fw-bold fs-4">{value}</div>
    </Card>
);

export default DriverDashboard;
