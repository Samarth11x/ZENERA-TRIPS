import React from 'react';
import HeroSection from '../../components/landing/HeroSection';
import FeatureSection from '../../components/landing/FeatureSection';
import HowItWorks from '../../components/landing/HowItWorks';
import FleetSection from '../../components/landing/FleetSection';
import { Container, Button, Row, Col, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="app-shell bg-black">

      
      <main>
        <HeroSection />

        {/* Quick Booking Strip */}
        <section className="bg-charcoal py-4 border-top border-bottom border-z">
            <Container>
                <div className="card-glass p-3 p-lg-4 shadow-glow">
                    <Row className="align-items-center g-3">
                        <Col lg={3}>
                            <h5 className="mb-0 fw-bold">Plan Your Next Trip</h5>
                        </Col>
                        <Col lg={7}>
                            <Row className="g-3">
                                <Col md={4}>
                                    <div className="bg-dark p-2 border border-z rounded">
                                        <label className="text-accent small d-block mb-1">Pickup Location</label>
                                        <div className="text-white text-truncate">Enter city...</div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="bg-dark p-2 border border-z rounded">
                                        <label className="text-accent small d-block mb-1">Start Date</label>
                                        <div className="text-white">Choose date...</div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="bg-dark p-2 border border-z rounded">
                                        <label className="text-accent small d-block mb-1">End Date</label>
                                        <div className="text-white">Choose date...</div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={2}>
                            <Button as={Link} to="/book" variant="primary" className="w-100 py-3">
                                Plan My Trip
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>

        <HowItWorks />
        <FeatureSection />
        <FleetSection />

        {/* FAQ Section */}
        <section className="section-padding bg-charcoal border-top border-z">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div className="text-center mb-5">
                            <h2 className="display-4 fw-800 text-uppercase mb-3">FAQ<span className="text-accent">S</span></h2>
                            <p className="lead text-muted">Common questions about ZENERA rentals.</p>
                        </div>
                        <div className="accordion accordion-flush bg-transparent" id="faqAccordion">
                            <FAQItem 
                                id="1"
                                question="Is this round-trip only?" 
                                answer="Yes, ZENERA specialized in round-trip tourism rentals where the trip ends at the same pickup location as the start."
                            />
                            <FAQItem 
                                id="2"
                                question="How much advance is needed?" 
                                answer="You can confirm your booking with a minimum of 25% advance. We also offer 50% and 100% upfront options if you prefer to finalize early."
                            />
                            <FAQItem 
                                id="3"
                                question="Can I edit my destination list?" 
                                answer="Yes, you can edit your detailed list of destinations as many times as you like until the trip actually begins."
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        {/* Final CTA */}
        <section className="py-5 bg-dark">
            <Container>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="card-glass p-5 text-center shadow-glow border-z"
                    style={{ background: 'linear-gradient(45deg, #131316, #1B1B1F)' }}
                >
                    <h2 className="display-5 fw-bold mb-4">Ready to start your premium road trip?</h2>
                    <Button as={Link} to="/book" variant="primary" size="lg" className="px-5 py-3">
                        Book Your Trip Now
                    </Button>
                </motion.div>
            </Container>
        </section>
      </main>

      <footer className="py-5 bg-black border-top border-z text-muted">
        <Container>
            <Row className="g-4">
                <Col lg={4}>
                    <div className="brand-logo fs-3 fw-bold text-white mb-3">ZENERA <span className="text-accent">TRIPS</span></div>
                    <p>Premium round-trip vehicle rentals for tourism. Quality drivers, verified odometers, and smooth experiences.</p>
                </Col>
                <Col lg={2}>
                    <h6 className="text-white fw-bold mb-4">Company</h6>
                    <Nav className="flex-column gap-2">
                        <Nav.Link href="#" className="p-0 text-muted">About Us</Nav.Link>
                        <Nav.Link href="#" className="p-0 text-muted">How it Works</Nav.Link>
                        <Nav.Link href="#" className="p-0 text-muted">Safety</Nav.Link>
                    </Nav>
                </Col>
                <Col lg={2}>
                    <h6 className="text-white fw-bold mb-4">Services</h6>
                    <Nav className="flex-column gap-2">
                        <Nav.Link href="#" className="p-0 text-muted">Fleet</Nav.Link>
                        <Nav.Link href="#" className="p-0 text-muted">AI Planner</Nav.Link>
                        <Nav.Link href="#" className="p-0 text-muted">Driver Partners</Nav.Link>
                    </Nav>
                </Col>
                <Col lg={4}>
                    <h6 className="text-white fw-bold mb-4">Install App</h6>
                    <p className="small">Get our installable PWA for Android & iOS directly from your browser.</p>
                    <div className="d-flex gap-2">
                        <Button variant="outline-light" size="sm" className="border-z">
                             <i className="bi bi-apple me-2"></i>iOS PWA
                        </Button>
                        <Button variant="outline-light" size="sm" className="border-z">
                              <i className="bi bi-google-play me-2"></i>Android PWA
                        </Button>
                    </div>
                </Col>
            </Row>
            <hr className="my-5 border-z" />
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <span>&copy; 2026 ZENERA TRIPS. All rights reserved.</span>
                <div className="d-flex gap-4 fs-5 text-accent">
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter-x"></i>
                    <i className="bi bi-instagram"></i>
                    <i className="bi bi-linkedin"></i>
                </div>
            </div>
        </Container>
      </footer>
    </div>
  );
};

const FAQItem = ({ id, question, answer }) => (
    <div className="accordion-item bg-transparent border-z mb-3 rounded-4 overflow-hidden border">
        <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-transparent text-white fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${id}`}>
                {question}
            </button>
        </h2>
        <div id={`faq${id}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body text-muted">
                {answer}
            </div>
        </div>
    </div>
);

export default LandingPage;
