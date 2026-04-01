import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { kycService } from '../../services/kycService';
import GlassCard from '../../components/common/GlassCard';
import { KYC_STATUS } from '../../utils/constants';

const DriverKycPage = () => {
    const { user } = useAuth();
    const { showToast } = useUI();
    const navigate = useNavigate();
    
    const [kycData, setKycData] = useState({
        licenceNumber: '',
        vehicleRegNumber: '',
        vehicleType: 'sedan',
        dateOfBirth: '',
        licenceUrl: 'https://images.unsplash.com/photo-1594902905222-446261607022?q=80&w=200&auto=format&fit=crop',
        rcUrl: 'https://images.unsplash.com/photo-1594902905222-446261607022?q=80&w=200&auto=format&fit=crop'
    });
    const [loading, setLoading] = useState(false);
    const [existingKyc, setExistingKyc] = useState(null);

    useEffect(() => {
        if (user) {
            const status = kycService.getKycStatus(user.uid);
            setExistingKyc(status);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await kycService.uploadKyc(user.uid, kycData);
            showToast('Documents uploaded for verification!');
            setExistingKyc({ status: KYC_STATUS.PENDING });
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    if (existingKyc?.status === KYC_STATUS.PENDING || existingKyc?.status === KYC_STATUS.VERIFYING) {
        return (
            <div className="app-shell bg-black min-vh-100 py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6}>
                            <GlassCard className="text-center py-5">
                                <i className="bi bi-shield-lock fs-1 text-warning mb-4"></i>
                                <h2 className="text-white fw-800">Verification In Progress</h2>
                                <p className="text-muted mb-5 px-md-5">Our admin team is currently reviewing your documents. This usually takes 2-4 hours.</p>
                                <div className="px-5 mb-4">
                                     <ProgressBar animated now={65} variant="warning" style={{ height: '6px' }} className="bg-dark" />
                                </div>
                                <Button variant="outline-light" onClick={() => navigate('/driver/home')} className="border-z px-5">Back to Dashboard</Button>
                            </GlassCard>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    if (existingKyc?.status === KYC_STATUS.APPROVED) {
        return (
             <div className="app-shell bg-black min-vh-100 py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6}>
                            <GlassCard className="text-center py-5">
                                <i className="bi bi-check-circle-fill fs-1 text-success mb-4"></i>
                                <h2 className="text-white fw-800">KYC Approved</h2>
                                <p className="text-muted mb-5">Your documents are verified. You can now start accepting rides.</p>
                                <Button variant="primary" onClick={() => navigate('/driver/home')} className="px-5">Go to Dashboard</Button>
                            </GlassCard>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <div className="app-shell bg-black min-vh-100 py-5">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="display-6 fw-800 text-uppercase mb-2">Driver <span className="text-accent">Verification</span></h2>
                    <p className="text-muted small">Upload your documents to join the premium network.</p>
                </div>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <GlassCard className="p-4 p-md-5 border-z shadow-glow">
                            <Form onSubmit={handleSubmit} className="d-grid gap-4">
                                <Row className="g-4">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="text-accent small fw-bold">LICENCE NUMBER</Form.Label>
                                            <Form.Control type="text" required placeholder="E.g. DL-12345678" value={kycData.licenceNumber} onChange={e => setKycData({...kycData, licenceNumber: e.target.value})} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="text-accent small fw-bold">VEHICLE REG NUMBER</Form.Label>
                                            <Form.Control type="text" required placeholder="E.g. KA-01-MJ-1234" value={kycData.vehicleRegNumber} onChange={e => setKycData({...kycData, vehicleRegNumber: e.target.value})} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="text-accent small fw-bold">VEHICLE TYPE</Form.Label>
                                            <Form.Select value={kycData.vehicleType} onChange={e => setKycData({...kycData, vehicleType: e.target.value})} className="bg-dark border-z text-white">
                                                <option value="sedan">Luxury Sedan</option>
                                                <option value="suv">Premium SUV</option>
                                                <option value="tempo">Traveler/Tempo</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="text-accent small fw-bold">DATE OF BIRTH</Form.Label>
                                            <Form.Control type="date" required value={kycData.dateOfBirth} onChange={e => setKycData({...kycData, dateOfBirth: e.target.value})} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="p-4 bg-charcoal border-z rounded-4 mt-2">
                                     <h6 className="text-white mb-3 fw-bold">Document Photos (Mock Upload)</h6>
                                     <Row className="g-3">
                                         <Col xs={6}>
                                             <div className="border border-z border-dashed p-3 rounded-3 text-center cursor-pointer hover-accent">
                                                  <i className="bi bi-camera fs-4 text-muted"></i>
                                                  <div className="small text-muted mt-1">Driving Licence</div>
                                             </div>
                                         </Col>
                                         <Col xs={6}>
                                            <div className="border border-z border-dashed p-3 rounded-3 text-center cursor-pointer hover-accent">
                                                  <i className="bi bi-camera fs-4 text-muted"></i>
                                                  <div className="small text-muted mt-1">RC / Insurance</div>
                                             </div>
                                         </Col>
                                     </Row>
                                </div>

                                <Button variant="primary" type="submit" size="lg" className="py-3 mt-3 shadow-glow" disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Submit Documents'}
                                </Button>
                            </Form>
                        </GlassCard>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DriverKycPage;
