import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookingClick = () => {
    if (user) {
      navigate('/user/book');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="hero-section position-relative overflow-hidden" style={{ minHeight: '95vh', paddingTop: '100px' }}>
      {/* Background Graphic */}
      <div className="hero-bg-graphic position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: -1 }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(135deg, rgba(11,11,13,0.95), rgba(19,19,22,0.92))',
          zIndex: 1
        }}></div>
        <img 
          src="assets/hero.png" 
          alt="Luxury SUV" 
          className="w-100 h-100 object-fit-cover"
          style={{ filter: 'grayscale(50%) contrast(1.2)' }}
        />
      </div>

      <Container className="h-100 d-flex align-items-center">
        <Row className="w-100 align-items-center">
          <Col lg={8} className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="d-flex align-items-center mb-4">
                  <img src={logo} alt="ZENERA" height="60" className="me-3" />
                  <Badge bg="transparent" className="border border-z text-accent px-3 py-2 fs-6">
                    <i className="bi bi-star-fill me-2"></i> Premium Round-Trip Experience
                  </Badge>
              </div>
              <h1 className="fw-800 text-uppercase mb-4 mt-2">
                Luxury Road Trips, <br />
                <span className="text-accent">Smarter</span> Booking
              </h1>
              <p className="lead fs-5 text-gray mb-4 mb-md-5 max-w-600">
                Book round-trip tourism vehicles with trusted drivers, flexible planning, and smooth travel support. Your journey, your way.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                <Button onClick={handleBookingClick} variant="primary" size="lg" className="px-4 py-3 shadow-glow">
                  <i className="bi bi-play-circle me-2"></i> Start Booking
                </Button>
                <Button href="#vehicles" variant="outline-light" size="lg" className="px-4 py-3 border-z">
                  Explore Vehicles
                </Button>
              </div>

              {/* Stats badges */}
              <Row className="mt-5 g-4">
                <Col md={4}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-check-circle-fill text-accent fs-3 me-3"></i>
                        <div>
                            <div className="fw-bold fs-5">Verified Drivers</div>
                            <div className="text-muted small">Driver-owned quality</div>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-shield-lock-fill text-accent fs-3 me-3"></i>
                        <div>
                            <div className="fw-bold fs-5">Secure OTP</div>
                            <div className="text-muted small">Verified start & end</div>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill text-accent fs-3 me-3"></i>
                        <div>
                            <div className="fw-bold fs-5">Round Trip</div>
                            <div className="text-muted small">Seamless return journey</div>
                        </div>
                    </div>
                </Col>
              </Row>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
