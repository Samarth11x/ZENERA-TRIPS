import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

const BottomNav = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const renderUserTabs = () => (
    <>
      <Nav.Link as={Link} to="/user/home" active={location.pathname === '/user/home'}>
        <i className={`bi bi-grid-fill fs-5 ${location.pathname === '/user/home' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/user/book" active={location.pathname === '/user/book'}>
        <i className={`bi bi-plus-circle-fill fs-4 ${location.pathname === '/user/book' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/user/history" active={location.pathname === '/user/history'}>
        <i className={`bi bi-clock-history fs-5 ${location.pathname === '/user/history' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/user/profile" active={location.pathname === '/user/profile'}>
        <i className={`bi bi-person-fill fs-5 ${location.pathname === '/user/profile' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
    </>
  );

  const renderDriverTabs = () => (
    <>
      <Nav.Link as={Link} to="/driver/home" active={location.pathname === '/driver/home'}>
        <i className={`bi bi-house-door-fill fs-5 ${location.pathname === '/driver/home' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/driver/requests" active={location.pathname === '/driver/requests'}>
        <i className={`bi bi-list-ul fs-5 ${location.pathname === '/driver/requests' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/driver/earnings" active={location.pathname === '/driver/earnings'}>
        <i className={`bi bi-wallet2 fs-5 ${location.pathname === '/driver/earnings' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/driver/profile" active={location.pathname === '/driver/profile'}>
        <i className={`bi bi-person-fill fs-5 ${location.pathname === '/driver/profile' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
    </>
  );

  const renderAdminTabs = () => (
    <>
      <Nav.Link as={Link} to="/admin/dashboard" active={location.pathname === '/admin/dashboard'}>
        <i className={`bi bi-speedometer2 fs-5 ${location.pathname === '/admin/dashboard' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/kyc" active={location.pathname === '/admin/kyc'}>
        <i className={`bi bi-shield-check fs-5 ${location.pathname === '/admin/kyc' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/bookings" active={location.pathname === '/admin/bookings'}>
        <i className={`bi bi-calendar3 fs-5 ${location.pathname === '/admin/bookings' ? 'text-accent' : 'text-muted'}`}></i>
      </Nav.Link>
    </>
  );

  return (
    <div className="fixed-bottom bg-black border-top border-z d-md-none" style={{ backdropFilter: 'blur(10px)', zIndex: 1030 }}>
      <Container className="px-1 px-sm-3">
        <Nav className="justify-content-between py-2 align-items-center flex-row">
            {user?.role === ROLES.USER && renderUserTabs()}
            {user?.role === ROLES.DRIVER && renderDriverTabs()}
            {user?.role === ROLES.ADMIN && renderAdminTabs()}
        </Nav>
      </Container>
    </div>
  );
};

export default BottomNav;
