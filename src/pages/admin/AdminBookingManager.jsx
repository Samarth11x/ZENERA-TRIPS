import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Badge, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { useUI } from '../../context/UIContext';
import GlassCard from '../../components/common/GlassCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { TRIP_STATUS } from '../../utils/constants';

const AdminBookingManager = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useUI();

    useEffect(() => {
        refreshBookings();
    }, []);

    const refreshBookings = () => {
        // Mock: Since we don't have a real DB/API, we use the bookingService
        const data = bookingService.getAvailableForDrivers(); // This only gets SEARCHING in the service currently.
        // We actually want ALL bookings. I'll update the service slightly or just use the DB key here.
        const allBookings = JSON.parse(localStorage.getItem('zenera_bookings_db') || '[]');
        setBookings(allBookings.reverse());
        setLoading(false);
    };

    const handleCancel = async (bookingId) => {
        try {
            await bookingService.updateBookingStatus(bookingId, TRIP_STATUS.CANCELLED);
            showToast(`Booking ${bookingId} cancelled manually.`);
            refreshBookings();
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    if (loading) return <LoadingState message="Fetching all platform activity..." fullPage />;

    return (
        <div className="app-shell bg-black min-vh-100 py-4 pb-5">
            <Container>
                <header className="mb-5 d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="text-white fw-800 mb-1">Master Operations <span className="text-accent">Table</span></h3>
                        <p className="text-muted small">Global view of all booking activity across the platform.</p>
                    </div>
                    <Button variant="outline-light" onClick={refreshBookings} className="border-z py-2 px-4 shadow-sm"><i className="bi bi-arrow-clockwise me-2"></i>Refresh</Button>
                </header>

                <GlassCard className="p-0 border-0 overflow-hidden shadow-glow">
                     <div className="table-responsive">
                         <Table className="table-dark table-hover mb-0 align-middle">
                             <thead className="bg-charcoal text-accent x-small fw-bold border-bottom border-z">
                                 <tr>
                                     <th className="px-4 py-3 border-0">BOOKING ID</th>
                                     <th className="py-3 border-0">CUSTOMER</th>
                                     <th className="py-3 border-0">DRIVER</th>
                                     <th className="py-3 border-0">ROUTE</th>
                                     <th className="py-3 border-0 text-center">STATUS</th>
                                     <th className="py-3 border-0 text-end">FARE</th>
                                     <th className="px-4 py-3 border-0 text-end">ACTIONS</th>
                                 </tr>
                             </thead>
                             <tbody className="small">
                                 {bookings.length > 0 ? (
                                     bookings.map((bk) => (
                                         <tr key={bk.id} className="border-bottom border-z">
                                             <td className="px-4 text-white fw-bold">{bk.id}</td>
                                             <td className="text-muted">{bk.userName || 'Samarth'}</td>
                                             <td className="text-muted">{bk.driver?.name || <span className="x-small italic opacity-50">Searching...</span>}</td>
                                             <td className="text-white">
                                                 <div className="fw-bold">{bk.pickupLocation}</div>
                                                 <div className="x-small text-muted">{bk.majorDestinations?.join(', ')}</div>
                                             </td>
                                             <td className="text-center"><StatusBadge status={bk.status} /></td>
                                             <td className="text-end text-accent fw-bold">₹{bk.pricingEstimate?.total?.toLocaleString()}</td>
                                             <td className="px-4 text-end">
                                                 {bk.status !== TRIP_STATUS.CANCELLED && bk.status !== TRIP_STATUS.TRIP_COMPLETED && (
                                                     <Button variant="outline-danger" size="sm" className="border-z x-small px-3 shadow-none" onClick={() => handleCancel(bk.id)}>Force Cancel</Button>
                                                 )}
                                             </td>
                                         </tr>
                                     ))
                                 ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted fst-italic">No bookings found in platform database.</td>
                                    </tr>
                                 )}
                             </tbody>
                         </Table>
                     </div>
                </GlassCard>
            </Container>
        </div>
    );
};

export default AdminBookingManager;
