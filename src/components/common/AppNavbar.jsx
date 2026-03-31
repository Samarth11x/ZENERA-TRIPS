import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas, Badge } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import logo from '../../assets/logo.png';

const AppNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const { user, isAuthenticated, logout, role } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, path, hash) => {
        if (e) e.preventDefault();
        setShowOffcanvas(false); 

        if (location.pathname === path) {
            if (hash) {
                const element = document.getElementById(hash.replace('#', ''));
                if (element) {
                    const offset = 80; // Navbar height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            navigate(path + (hash || ''));
            if (hash) {
                setTimeout(() => {
                    const element = document.getElementById(hash.replace('#', ''));
                    if (element) {
                        const offset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                }, 400); // More robust delay
            }
        }
    };

    const isHome = location.pathname === '/';

    return (
        <Navbar 
            expand="lg" 
            fixed="top" 
            className={`py-3 transition-smooth ${scrolled || !isHome ? 'bg-dark border-bottom border-z' : 'bg-transparent'}`}
        >
            <Container>
                <Navbar.Brand onClick={(e) => handleNavClick(e, '/')} className="d-flex align-items-center gap-2 pointer-cursor">
                    <img src={logo} alt="ZENERA" height="40" className="d-inline-block align-top" />
                    <motion.span 
                        animate={{ 
                            textShadow: scrolled ? "0 0 10px var(--accent)" : "0 0 0px transparent" 
                        }}
                        className="brand-logo fs-3 fw-800 text-white cursor-pointer d-none d-sm-inline"
                    >
                        ZENERA <span className="text-accent">TRIPS</span>
                    </motion.span>
                </Navbar.Brand>
                
                <Navbar.Toggle 
                    aria-controls="offcanvasNavbar" 
                    className="border-0 shadow-none text-white"
                    onClick={() => setShowOffcanvas(true)}
                >
                    <i className="bi bi-list fs-1"></i>
                </Navbar.Toggle>

                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    show={showOffcanvas}
                    onHide={() => setShowOffcanvas(false)}
                    className="bg-dark text-white border-start border-z"
                >
                    <Offcanvas.Header closeButton closeVariant="white">
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            ZENERA <span className="text-accent">TRIPS</span>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-center flex-grow-1 pe-3">
                            <Nav.Link onClick={(e) => handleNavClick(e, '/')} className="mx-lg-3">Home</Nav.Link>
                            <Nav.Link onClick={(e) => handleNavClick(e, '/', '#how-it-works')} className="mx-lg-3">How it Works</Nav.Link>
                            <Nav.Link onClick={(e) => handleNavClick(e, '/', '#fleet')} className="mx-lg-3">Vehicles</Nav.Link>
                            <Nav.Link as={Link} to="/planner" className="mx-lg-3 text-accent fw-bold" onClick={() => setShowOffcanvas(false)}>AI Planner</Nav.Link>
                        </Nav>
                        <div className="d-flex flex-column flex-lg-row gap-3 mt-3 mt-lg-0">
                            {isAuthenticated ? (
                                <>
                                    <div className="d-flex align-items-center gap-2 me-lg-2">
                                        <Badge bg="dark" className="border border-z text-accent x-small py-1 px-2 letter-spacing-wide">
                                            {role?.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <Button 
                                        as={Link} 
                                        to={`/${role}`} 
                                        variant="outline-accent" 
                                        className="border-z shadow-glow d-flex align-items-center gap-2"
                                        onClick={() => setShowOffcanvas(false)}
                                    >
                                        <i className="bi bi-grid-fill"></i>
                                        <span>Dashboard</span>
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        className="border-z"
                                        onClick={() => { logout(); setShowOffcanvas(false); navigate('/'); }}
                                    >
                                        <i className="bi bi-box-arrow-right"></i>
                                    </Button>
                                </>
                            ) : (
                                <Button as={Link} to="/login" variant="primary" className="shadow-glow px-4" onClick={() => setShowOffcanvas(false)}>
                                    Join ZENERA
                                </Button>
                            )}
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
