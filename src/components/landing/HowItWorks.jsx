import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const steps = [
    {
        title: "Pick Location",
        desc: "Enter your starting point for your round-trip journey.",
        icon: "bi-pin-map-fill"
    },
    {
        title: "Select Dates",
        desc: "Choose your travel window and plan the destinations.",
        icon: "bi-calendar-event"
    },
    {
        title: "Choose Vehicle",
        desc: "Pick from Hatchback to Tempo Traveller based on your group.",
        icon: "bi-car-front-fill"
    },
    {
        title: "Pay Advance",
        desc: "Secure your booking with as little as 25% payment.",
        icon: "bi-credit-card-2-front"
    },
    {
        title: "Enjoy Trip",
        desc: "Start with OTP and odometer verification with your driver.",
        icon: "bi-map-fill"
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="section-padding">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-800 text-uppercase mb-3">Simple <span className="text-accent">Steps</span></h2>
                    <p className="lead text-muted">From booking to the road in minutes.</p>
                </div>
                <div className="position-relative">
                    <div className="d-none d-lg-block position-absolute top-50 start-0 w-100 border-top border-z" style={{ zIndex: 0 }}></div>
                    <Row className="g-4 position-relative">
                        {steps.map((step, idx) => (
                            <Col lg key={idx}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                >
                                    <Card className="text-center bg-transparent border-0 h-100">
                                        <div className="mx-auto rounded-circle bg-dark d-flex align-items-center justify-content-center border border-z shadow-glow mb-4" 
                                             style={{ width: '80px', height: '80px', zIndex: 1 }}>
                                            <i className={`bi ${step.icon} fs-2 text-accent`}></i>
                                        </div>
                                        <h5 className="fw-bold mb-3">{step.title}</h5>
                                        <p className="text-muted small px-3">{step.desc}</p>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default HowItWorks;
