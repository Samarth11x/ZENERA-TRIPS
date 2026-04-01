import React from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

const AppNavbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case ROLES.ADMIN: return '/admin/dashboard';
      case ROLES.DRIVER: return '/driver/home';
      default: return '/user/home';
    }
  };

  return (
    <Navbar key="md" expand="md" className="bg-black border-bottom border-z py-3 sticky-top shadow-glow" variant="dark">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="brand-logo fs-3 fw-800 tracking-tighter">
          ZENERA<span className="text-accent">TRIPS</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" className="border-0 shadow-none p-0" />
        
        <Navbar.Offcanvas id="offcanvasNavbar-expand-md" placement="end" className="bg-black text-white border-start border-z">
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title className="fw-800 text-accent">MENU</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 gap-3">
              <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
              
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to={getDashboardLink()} active={location.pathname.includes('/home') || location.pathname.includes('/dashboard')}>Dashboard</Nav.Link>
                  {user.role === ROLES.USER && (
                    <Nav.Link as={Link} to="/user/book" active={location.pathname.includes('/book')}>Book Ride</Nav.Link>
                  )}
                  <Nav.Link onClick={logout} className="text-danger opacity-75">Sign Out</Nav.Link>
                  <div className="d-flex align-items-center ms-lg-3">
                    <div className="bg-accent text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-glow" style={{ width: '36px', height: '36px', fontSize: '14px' }}>
                        {user.name?.charAt(0) || 'A'}
                    </div>
                    <span className="ms-2 small text-muted d-md-none d-lg-block">{user?.role?.toUpperCase() || 'USER'}</span>
                  </div>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/planner">AI Planner</Nav.Link>
                  <Button as={Link} to="/login" variant="outline-light" className="ms-lg-3 border-z px-4 rounded-pill">Login</Button>
                  <Button as={Link} to="/register" variant="primary" className="px-4 rounded-pill">Sign Up</Button>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
