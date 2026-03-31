import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { VEHICLE_PRICING } from '../../data/mockData';

const FleetSection = () => {
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
    <section id="fleet" className="section-padding bg-black">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-800 text-uppercase mb-3">Our Premium <span className="text-accent">Fleet</span></h2>
          <p className="lead text-muted">A range of luxury vehicles maintained for your comfort and safety.</p>
        </div>

        <Row className="g-4">
          {Object.entries(VEHICLE_PRICING).map(([code, v], idx) => (
            <Col lg={3} md={6} key={code}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="card-glass h-100 border-z p-3 hover-accent shadow-glow">
                  <div className="position-relative mb-3 rounded-4 overflow-hidden" style={{ height: '180px' }}>
                    <img 
                      src={v.image} 
                      alt={v.name} 
                      className="w-100 h-100 object-fit-cover opacity-75 grayscale-hover transition-smooth" 
                    />
                    <div className="position-absolute top-0 end-0 p-2">
                       <Badge bg="accent" text="dark" className="fw-bold px-3 py-2">₹{v.ratePerKm}/km</Badge>
                    </div>
                  </div>
                  
                  <h4 className="fw-bold text-white mb-2">{v.name}</h4>
                  <div className="d-flex align-items-center gap-2 mb-4 text-muted small">
                    <i className={`bi ${v.icon} text-accent`}></i>
                    <span>Minimum {v.minKmPerDay} km / day</span>
                  </div>
                  
                  <Button onClick={handleBookingClick} variant="outline-light" className="w-100 border-z hover-accent transition-smooth">
                    Select This Vehicle
                  </Button>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FleetSection;
