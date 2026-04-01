import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import GlassCard from '../../components/common/GlassCard';
import { ROLES } from '../../utils/constants';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: ROLES.USER
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const { showToast } = useUI();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signup(formData);
            showToast('Account created successfully!');
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-shell bg-black min-vh-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5} xl={4}>
                         <div className="text-center mb-5">
                             <h1 className="brand-logo fs-1 mb-0 fw-800">ZENERA<span className="text-accent">TRIPS</span></h1>
                             <p className="text-muted small text-uppercase tracking-widest mt-2">New Account Setup</p>
                        </div>

                        <GlassCard className="p-4 p-md-5 border-z shadow-glow">
                            <h2 className="text-white fw-800 mb-4 h4">Create Membership</h2>
                            
                            {error && <Alert variant="danger" className="py-2 small bg-transparent border-danger text-danger border-1">{error}</Alert>}

                            <Form onSubmit={handleSubmit} className="d-grid gap-4">
                                <Form.Group>
                                    <Form.Label className="text-accent small fw-bold">FULL NAME</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required 
                                        placeholder="E.g. Samarth"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="text-accent small fw-bold">EMAIL ADDRESS</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        required 
                                        placeholder="E.g. sam@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="text-accent small fw-bold">PASSWORD</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        required 
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="text-accent small fw-bold">MEMBERSHIP CATEGORY</Form.Label>
                                    <div className="d-flex gap-2">
                                        <Button 
                                            variant={formData.role === ROLES.USER ? 'accent' : 'outline-light'}
                                            size="sm"
                                            className="flex-grow-1 border-z py-2"
                                            onClick={() => setFormData({...formData, role: ROLES.USER})}
                                            type="button"
                                            style={formData.role === ROLES.USER ? { backgroundColor: 'var(--z-accent-orange)', color: '#000' } : {}}
                                        >
                                            <i className="bi bi-person-fill me-2"></i>USER
                                        </Button>
                                        <Button 
                                            variant={formData.role === ROLES.DRIVER ? 'accent' : 'outline-light'}
                                            size="sm"
                                            className="flex-grow-1 border-z py-2"
                                            onClick={() => setFormData({...formData, role: ROLES.DRIVER})}
                                            type="button"
                                            style={formData.role === ROLES.DRIVER ? { backgroundColor: 'var(--z-accent-orange)', color: '#000' } : {}}
                                        >
                                            <i className="bi bi-car-front-fill me-2"></i>DRIVER
                                        </Button>
                                    </div>
                                </Form.Group>

                                <Button variant="primary" type="submit" size="lg" disabled={loading} className="py-3 mt-2">
                                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Secure Account Creation'}
                                </Button>
                            </Form>
                            
                            <div className="text-center mt-5">
                                <p className="text-muted small mb-0">Already have an account?</p>
                                <Link to="/login" className="text-accent fw-bold text-decoration-none">Sign In</Link>
                            </div>
                        </GlassCard>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterPage;
