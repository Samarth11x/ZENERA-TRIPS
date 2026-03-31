import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const features = [
    {
        title: "Round-Trip Focused",
        description: "Specialized in tourism trips that start and end at your home location for maximum convenience.",
        icon: "bi-arrow-left-right"
    },
    {
        title: "Verified OTP Start/End",
        description: "Secure trip verification using standard OTP handshake between customer and driver.",
        icon: "bi-shield-check"
    },
    {
        title: "Driver-Owned Vehicles",
        description: "The platform connects you directly with independent drivers who take pride in their vehicles.",
        icon: "bi-people"
    },
    {
        title: "Smart AI Planner",
        description: "Our intelligent travel assistant helps estimate costs and suggests the best routes.",
        icon: "bi-stars"
    },
    {
        title: "Transparent Pricing",
        description: "No hidden charges. Clear per-km rates, min-km rules, and daily allowances.",
        icon: "bi-cash-coin"
    },
    {
        title: "Flexible Destinations",
        description: "Edit your detailed destination list anytime until the trip begins.",
        icon: "bi-map"
    }
];

const FeatureSection = () => {
    return (
        <section id="features" className="section-padding bg-charcoal">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-800 text-uppercase mb-3">Why Choose <span className="text-accent">ZENERA</span></h2>
                    <p className="lead text-muted">Premium features designed for the modern tourist.</p>
                </div>
                <Row className="g-4">
                    {features.map((feature, idx) => (
                        <Col md={6} lg={4} key={idx}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="card-glass h-100 p-4 border-0">
                                    <div className="bg-dark rounded-3 d-inline-flex p-3 mb-4 border border-z shadow-glow">
                                        <i className={`bi ${feature.icon} fs-2 text-accent`}></i>
                                    </div>
                                    <h4 className="fw-bold mb-3">{feature.title}</h4>
                                    <p className="text-muted mb-0">{feature.description}</p>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default FeatureSection;
