import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import GlassCard from '../../components/common/GlassCard';
import { ROLES } from '../../utils/constants';

const AuthPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useUI();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await login(credentials.email, credentials.password);
            showToast(`Welcome back, ${user.name}!`);
            
            // Redirect based on role
            switch (user.role) {
                case ROLES.ADMIN: navigate('/admin/dashboard'); break;
                case ROLES.DRIVER: navigate('/driver/home'); break;
                default: navigate('/user/home');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed');
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
                             <p className="text-muted small text-uppercase tracking-widest mt-2">Premium Member Login</p>
                        </div>

                        <GlassCard className="p-4 p-md-5 border-z shadow-glow">
                            <h2 className="text-white fw-800 mb-4 h4">Account Sign-In</h2>
                            
                            {error && <Alert variant="danger" className="py-2 small bg-transparent border-danger text-danger border-1">{error}</Alert>}

                            <Form onSubmit={handleSubmit} className="d-grid gap-4">
                                <Form.Group>
                                    <Form.Label className="text-accent small fw-bold">EMAIL ADDRESS</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        required 
                                        placeholder="Enter your email"
                                        value={credentials.email}
                                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="text-accent small fw-bold">PASSWORD</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        required 
                                        placeholder="••••••••"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" size="lg" disabled={loading} className="py-3 mt-2">
                                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Secure Sign In'}
                                </Button>
                            </Form>
                            
                            <div className="text-center mt-5">
                                <p className="text-muted small mb-0">Don't have an account?</p>
                                <Link to="/register" className="text-accent fw-bold text-decoration-none">Create Membership</Link>
                            </div>
                        </GlassCard>

                        <div className="text-center mt-4 opacity-50">
                            <Link to="/admin-login" className="text-muted small text-decoration-none border-bottom border-muted">Admin Command Center</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AuthPage;
