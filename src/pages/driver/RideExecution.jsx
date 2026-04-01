import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import { useUI } from '../../context/UIContext';
import GlassCard from '../../components/common/GlassCard';
import { TRIP_STATUS } from '../../utils/constants';

const RideExecution = () => {
    const { activeTrip, startTrip, endTrip } = useTrip();
    const { showToast } = useUI();
    const navigate = useNavigate();
    
    const [otp, setOtp] = useState('');
    const [odometer, setOdometer] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!activeTrip) {
            navigate('/driver/home');
        }
    }, [activeTrip, navigate]);

    if (!activeTrip) return null;

    const handleStartTrip = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await startTrip(activeTrip.id, otp, odometer);
            showToast("Trip started successfully!");
            setOtp('');
            setOdometer('');
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleEndTrip = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await endTrip(activeTrip.id, odometer);
            showToast("Trip completed! Final bill generated.");
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const renderAssigned = () => (
        <Col md={8} lg={6}>
            <GlassCard className="p-4 p-md-5 border-accent shadow-glow">
                <div className="text-center mb-5">
                    <i className="bi bi-shield-lock-fill fs-1 text-accent mb-3 d-block"></i>
                    <h3 className="text-white fw-800">Start Journey</h3>
                    <p className="text-muted small">Enter the 4-digit OTP provided by the customer to begin the trip.</p>
                </div>
                
                <Form onSubmit={handleStartTrip} className="d-grid gap-4">
                    <Form.Group>
                        <Form.Label className="text-accent small fw-bold">CUSTOMER OTP</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="text-center display-6 fw-800 tracking-widest py-3 border-z bg-dark"
                            maxLength={4}
                            placeholder="0000"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label className="text-accent small fw-bold">START ODOMETER (KM)</Form.Label>
                        <Form.Control 
                            type="number" 
                            className="bg-dark border-z py-3"
                            placeholder="Enter current reading"
                            value={odometer}
                            onChange={e => setOdometer(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" size="lg" className="py-3 shadow-glow mt-2" disabled={loading}>
                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Verify & Start Trip'}
                    </Button>
                </Form>
            </GlassCard>
        </Col>
    );

    const renderStarted = () => (
        <Col md={8} lg={6}>
            <GlassCard className="p-4 p-md-5 border-success shadow-glow">
                <div className="text-center mb-5">
                    <div className="spinner-grow text-success mb-3" style={{ width: '3rem', height: '3rem' }}></div>
                    <h3 className="text-white fw-800">Trip In Progress</h3>
                    <p className="text-success small fw-bold mb-0">NAVIGATING TO DESTINATIONS</p>
                </div>
                
                <div className="bg-charcoal p-4 rounded-4 border-z mb-5">
                    <div className="d-flex justify-content-between mb-2">
                         <span className="text-muted small">Start Odometer</span>
                         <span className="text-white fw-bold">{activeTrip.startOdometer} KM</span>
                    </div>
                    <div className="d-flex justify-content-between">
                         <span className="text-muted small">Started At</span>
                         <span className="text-white fw-bold">{new Date().toLocaleTimeString()}</span>
                    </div>
                </div>

                <Form onSubmit={handleEndTrip} className="d-grid gap-4">
                    <Form.Group>
                        <Form.Label className="text-accent small fw-bold">END ODOMETER (KM)</Form.Label>
                        <Form.Control 
                            type="number" 
                            className="bg-dark border-z py-3"
                            placeholder="Current reading at trip end"
                            value={odometer}
                            onChange={e => setOdometer(e.target.value)}
                            required
                        />
                        <Form.Text className="text-muted italic small mt-2 d-block">Check and confirm the final odometer reading with the customer.</Form.Text>
                    </Form.Group>

                    <Button variant="outline-danger" type="submit" size="lg" className="py-3 mt-2" disabled={loading}>
                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Complete Journey & Finalize Fare'}
                    </Button>
                </Form>
            </GlassCard>
        </Col>
    );

    const renderCompleted = () => (
        <Col md={8} lg={6}>
            <GlassCard className="p-4 p-md-5 border-z shadow-glow text-center">
                 <i className="bi bi-check-circle-fill display-3 text-success mb-4 d-block"></i>
                 <h2 className="text-white fw-800 mb-2">Trip Finalized</h2>
                 <p className="text-muted mb-5">Ride ID {activeTrip.id} has been recorded successfully.</p>
                 
                 <div className="bg-charcoal p-4 rounded-4 border-z mb-5 text-start">
                      <div className="d-flex justify-content-between mb-3 border-bottom border-z pb-2">
                           <span className="text-muted">Total Distance</span>
                           <span className="text-white fw-bold">{activeTrip.billing?.totalKm} KM</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                           <span className="text-muted">Booking Fare</span>
                           <span className="text-white fw-bold">₹{activeTrip.billing?.baseFare?.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                           <span className="text-muted">Allowance</span>
                           <span className="text-white fw-bold">₹{activeTrip.billing?.driverAllowance?.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-4 mt-2">
                           <span className="text-accent fw-bold h5">Total Collection</span>
                           <span className="text-accent fw-bold h4">₹{activeTrip.billing?.grandTotal?.toLocaleString()}</span>
                      </div>
                      <div className="bg-accent text-dark p-2 rounded text-center fw-800">
                           COLLECT FROM CASH: ₹{activeTrip.billing?.remainingToPay?.toLocaleString()}
                      </div>
                 </div>

                 <Button variant="primary" className="py-3 px-5 w-100 shadow-glow" onClick={() => navigate('/driver/home')}>
                    Return to Dashboard
                 </Button>
            </GlassCard>
        </Col>
    );

    return (
        <div className="app-shell bg-black min-vh-100 py-5">
            <Container>
                <Row className="justify-content-center">
                    {activeTrip.status === TRIP_STATUS.DRIVER_ASSIGNED && renderAssigned()}
                    {activeTrip.status === TRIP_STATUS.TRIP_STARTED && renderStarted()}
                    {activeTrip.status === TRIP_STATUS.TRIP_COMPLETED && renderCompleted()}
                </Row>
            </Container>
        </div>
    );
};

export default RideExecution;
