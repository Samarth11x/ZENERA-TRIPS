import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { kycService } from '../../services/kycService';
import { bookingService } from '../../services/bookingService';
import GlassCard from '../../components/common/GlassCard';
import StatusBadge from '../../components/common/StatusBadge';
import { KYC_STATUS } from '../../utils/constants';

const AdminDash = () => {
    const [pendingKyc, setPendingKyc] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [stats, setStats] = useState([
        { label: 'Active Trips', value: '4', color: 'text-success' },
        { label: 'Pending KYC', value: '0', color: 'text-warning' },
        { label: 'Total Revenue', value: '₹14.2L', color: 'text-accent' },
        { label: 'Online Drivers', value: '12', color: 'text-white' }
    ]);

    useEffect(() => {
        const kyc = kycService.getPendingSubmissions();
        setPendingKyc(kyc);
        
        const bookings = bookingService.getAvailableForDrivers();
        setRecentBookings(bookings.slice(0, 5));

        setStats(prev => {
            const updated = [...prev];
            updated[1].value = kyc.length;
            return updated;
        });
    }, []);

    return (
        <div className="admin-portal bg-black min-vh-100 pb-5">
            <Container className="pt-4">
                <header className="mb-5 d-flex justify-content-between align-items-end">
                    <div>
                        <h2 className="text-white fw-800 mb-1">Command Center</h2>
                        <p className="text-muted small mb-0">Platform Insight & Oversight</p>
                    </div>
                    <div className="d-flex gap-2">
                        <Button as={Link} to="/admin/pricing" variant="outline-light" className="border-z py-2 px-4 shadow-sm text-uppercase fw-bold small">Pricing Config</Button>
                        <Button as={Link} to="/admin/drivers" variant="primary" className="py-2 px-4 text-uppercase fw-bold shadow-glow">All Drivers</Button>
                    </div>
                </header>

                <Row className="g-3 mb-5">
                    {stats.map((stat, idx) => (
                        <Col key={idx} xs={6} md={3}>
                            <GlassCard className="text-center py-3 border-z shadow-glow">
                                <div className="text-muted x-small uppercase fw-bold mb-1 opacity-50 tracking-widest">{stat.label}</div>
                                <div className={`fs-3 fw-800 ${stat.color}`}>{stat.value}</div>
                            </GlassCard>
                        </Col>
                    ))}
                </Row>

                <Row className="g-4">
                    {/* KYC Approvals Panel */}
                    <Col lg={4}>
                         <div className="d-flex justify-content-between align-items-center mb-3">
                             <h6 className="text-accent fw-bold small mb-0 uppercase tracking-widest">KYC Pending Queue</h6>
                             <Badge bg="dark" className="border-z px-2 py-1">{pendingKyc.length}</Badge>
                         </div>
                         <div className="d-grid gap-3">
                             {pendingKyc.length > 0 ? (
                                 pendingKyc.map((kyc) => (
                                     <GlassCard key={kyc.id} className="p-3 border-z hover-accent">
                                         <div className="d-flex justify-content-between align-items-start mb-3">
                                             <div>
                                                 <div className="text-white fw-bold">{kyc.driverName || 'New Driver'}</div>
                                                 <div className="text-muted x-small">ID: {kyc.driverId}</div>
                                             </div>
                                             <StatusBadge status={kyc.status} type="kyc" />
                                         </div>
                                         <Button 
                                            as={Link} 
                                            to={`/admin/kyc`} 
                                            variant="outline-accent" 
                                            size="sm" 
                                            className="w-100 border-z py-2 transition-smooth"
                                            style={{ color: 'var(--z-accent-orange)' }}
                                         >
                                             Review Documents <i className="bi bi-chevron-right ms-2"></i>
                                         </Button>
                                     </GlassCard>
                                 ))
                             ) : (
                                 <div className="text-center py-5 border border-z border-dashed rounded-4 opacity-50 italic small">
                                     No new KYC submissions in queue.
                                 </div>
                             )}
                         </div>
                    </Col>

                    {/* Master Operations Table */}
                    <Col lg={8}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                             <h6 className="text-accent fw-bold small mb-0 uppercase tracking-widest">Recent Platform Requests</h6>
                             <Link to="/admin/bookings" className="text-muted x-small text-decoration-none border-bottom border-muted">View Master Ops &rarr;</Link>
                         </div>
                         <GlassCard className="p-0 border-0 overflow-hidden shadow-glow">
                             <div className="table-responsive">
                                 <Table className="table-dark table-hover mb-0 align-middle">
                                     <thead className="bg-charcoal text-accent x-small fw-bold border-bottom border-z">
                                         <tr>
                                             <th className="px-4 py-3 border-0">BOOKING ID</th>
                                             <th className="py-3 border-0">CUSTOMER</th>
                                             <th className="py-3 border-0">ROUTE</th>
                                             <th className="py-3 border-0">STATUS</th>
                                             <th className="px-4 py-3 border-0 text-end">FARE</th>
                                         </tr>
                                     </thead>
                                     <tbody className="small">
                                         {recentBookings.length > 0 ? (
                                             recentBookings.map((bk) => (
                                                 <tr key={bk.id} className="border-bottom border-z">
                                                     <td className="px-4 text-white fw-bold">{bk.id}</td>
                                                     <td className="text-muted">{bk.userName || 'Samarth'}</td>
                                                     <td className="text-white">{bk.pickupLocation} &rarr; {bk.majorDestinations?.[0]}</td>
                                                     <td><StatusBadge status={bk.status} /></td>
                                                     <td className="px-4 text-end text-accent fw-bold">₹{bk.pricingEstimate?.total?.toLocaleString()}</td>
                                                 </tr>
                                             ))
                                         ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5 text-muted fst-italic">No recent platform activity found.</td>
                                            </tr>
                                         )}
                                     </tbody>
                                 </Table>
                             </div>
                         </GlassCard>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDash;
