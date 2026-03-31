import React from 'react';
import { Container, Row, Col, Card, Badge, Table } from 'react-bootstrap';
import { motion } from 'framer-motion';
import AppNavbar from '../../components/common/AppNavbar';

const TripStatusPage = () => {
    return (
        <div className="app-shell bg-black min-vh-100">
            <AppNavbar />
            <main className="section-padding pt-5 mt-5">
                <Container>
                    <div className="mb-5">
                        <div className="text-accent small fw-bold mb-1">BOOKING ID: ZT-101</div>
                        <h2 className="display-5 fw-bold text-white">Trip <span className="text-accent">Live Status</span></h2>
                    </div>

                    <Row className="g-4">
                        <Col lg={8}>
                            <Card className="card-glass p-0 border-0 overflow-hidden mb-4 shadow-glow">
                                <div className="bg-charcoal p-3 border-bottom border-z d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 text-white fw-bold">Journey Timeline</h5>
                                    <Badge bg="success" className="p-2">Trip Started</Badge>
                                </div>
                                <div className="p-4 p-md-5">
                                    <div className="trip-timeline">
                                        <TimelineItem 
                                            icon="bi-calendar-check" 
                                            title="Booking Confirmed" 
                                            time="April 08, 11:30 AM" 
                                            desc="Advance payment verified. Driver assignment pending."
                                            isCompleted={true}
                                        />
                                        <TimelineItem 
                                            icon="bi-person-check" 
                                            title="Driver Assigned" 
                                            time="April 09, 02:15 PM" 
                                            desc="Driver: Anil Kumar | Vehicle: KA-01-MG-1234 (Premium Sedan)"
                                            isCompleted={true}
                                        />
                                        <TimelineItem 
                                            icon="bi-play-circle" 
                                            title="Trip Started" 
                                            time="April 10, 08:30 AM" 
                                            desc="OTP 1245 verified. Start Odometer: 12,450 km."
                                            isCurrent={true}
                                        />
                                        <TimelineItem 
                                            icon="bi-flag" 
                                            title="Trip Completion" 
                                            time="April 13, Estimated 6:00 PM" 
                                            desc="Pending: OTP verification and final odometer photo."
                                        />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="card-glass p-4 border-0 mb-4 bg-dark">
                                <h5 className="text-white mb-4">Trip Info</h5>
                                <div className="mb-4">
                                    <div className="text-accent small mb-1 fw-bold">PICKUP</div>
                                    <div className="text-white fw-bold">Electronic City, Bangalore</div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-accent small mb-1 fw-bold">DESTINATIONS</div>
                                    <div className="text-white">Mysore, Coorg, Ooty</div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-accent small mb-1 fw-bold">ETA</div>
                                    <div className="text-white fw-bold">3 Hours 25 Mins</div>
                                </div>
                                <hr className="border-z" />
                                <div className="text-center">
                                    <div className="small text-muted mb-2">Driver Contact</div>
                                    <Button variant="primary" className="w-100 shadow-glow"><i className="bi bi-telephone-fill me-2"></i>Call Driver</Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
};

const TimelineItem = ({ icon, title, time, desc, isCompleted, isCurrent }) => (
    <div className="d-flex gap-4 mb-5 position-relative">
        <div className="timeline-connector" style={{ 
            position: 'absolute', 
            top: '40px', left: '19px', 
            width: '2px', height: 'calc(100% + 20px)', 
            background: isCompleted ? 'var(--z-accent-orange)' : 'var(--z-border)', 
            zIndex: 0 
        }}></div>
        <div className={`rounded-circle border-3 d-flex align-items-center justify-content-center shadow-sm z-index-1 ${isCompleted ? 'bg-accent border-accent text-dark' : isCurrent ? 'bg-dark border-accent text-accent shadow-glow' : 'bg-dark border-z text-muted'}`} 
             style={{ width: '40px', height: '40px', zIndex: 1, minWidth: '40px' }}>
            <i className={`bi ${icon} fs-5`}></i>
        </div>
        <div>
            <h6 className={`fw-bold mb-1 ${isCurrent || isCompleted ? 'text-white' : 'text-muted'}`}>{title}</h6>
            <div className="small text-accent mb-2">{time}</div>
            <p className="small text-muted mb-0">{desc}</p>
        </div>
    </div>
);

export default TripStatusPage;
