import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import { useNavigate, Link } from 'react-router-dom';

const AuthPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(ROLES.USER);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const handleAuth = (e) => {
        e.preventDefault();
        login(activeTab);
        navigate(`/${activeTab}`);
    };

    return (
        <div className="auth-page min-vh-100 d-flex align-items-center py-5 position-relative overflow-hidden bg-black">
            {/* Ambient Background */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-dark opacity-75"></div>
            <div className="position-absolute top-0 end-0 bg-accent rounded-circle blur-100 opacity-10" style={{ width: '400px', height: '400px' }}></div>
            <div className="position-absolute bottom-0 start-0 bg-accent rounded-circle blur-100 opacity-10" style={{ width: '300px', height: '300px' }}></div>
            
            <Container className="position-relative z-index-10">
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <motion.div 
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="card-glass border-z p-4 p-md-5 shadow-glow rounded-4"
                        >
                            <motion.div variants={item} className="text-center mb-5">
                                <h2 className="brand-logo fs-2 fw-800 text-white mb-2">ZENERA <span className="text-accent">TRIPS</span></h2>
                                <p className="text-muted small">Experience Premium Travel Excellence</p>
                            </motion.div>

                            <motion.div variants={item} className="mb-4">
                                <Tabs
                                    activeKey={activeTab}
                                    onSelect={(k) => setActiveTab(k)}
                                    className="custom-tabs border-0 justify-content-center mb-4"
                                >
                                    <Tab eventKey={ROLES.USER} title="PASSENGER" />
                                    <Tab eventKey={ROLES.DRIVER} title="DRIVER" />
                                </Tabs>
                            </motion.div>

                            <Form onSubmit={handleAuth}>
                                <motion.div variants={item} className="mb-3">
                                    <Form.Label className="text-accent small fw-bold mb-2">MOBILE NUMBER</Form.Label>
                                    <Form.Control 
                                        type="tel" 
                                        placeholder="+91 XXXX XXX XXX" 
                                        className="bg-dark text-white border-z py-3 px-3 shadow-none focus-accent" 
                                        required 
                                    />
                                </motion.div>

                                <motion.div variants={item} className="mb-4">
                                    <Form.Label className="text-accent small fw-bold mb-2">PASSWORD / OTP</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="bg-dark text-white border-z py-3 px-3 shadow-none focus-accent" 
                                        required 
                                    />
                                </motion.div>

                                <motion.div variants={item} className="d-grid gap-3">
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="py-3 shadow-glow transition-smooth fw-bold"
                                    >
                                        CONTINUE AS {activeTab.toUpperCase()}
                                    </Button>
                                    
                                    <div className="text-center mt-3">
                                        <span className="text-muted small">New Around Here? </span>
                                        <Link to="/register" className="text-accent small fw-bold text-decoration-none hover-underline">Create Account</Link>
                                    </div>
                                </motion.div>
                            </Form>

                            <motion.div variants={item} className="mt-5 pt-4 border-top border-z text-center">
                                <Link to="/admin" className="text-muted x-small text-decoration-none hover-accent transition-smooth">
                                    <i className="bi bi-shield-lock-fill me-2"></i>ADMIN ACCESS
                                </Link>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AuthPage;
