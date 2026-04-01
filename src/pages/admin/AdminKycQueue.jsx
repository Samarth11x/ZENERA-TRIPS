import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge, Modal, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { kycService } from '../../services/kycService';
import { useUI } from '../../context/UIContext';
import GlassCard from '../../components/common/GlassCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { KYC_STATUS } from '../../utils/constants';

const AdminKycQueue = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useUI();
    const navigate = useNavigate();

    useEffect(() => {
        refreshQueue();
    }, []);

    const refreshQueue = () => {
        const data = kycService.getPendingSubmissions();
        setSubmissions(data);
        setLoading(false);
    };

    const handleApprove = async (submissionId, driverId) => {
        try {
            await kycService.approveKyc(submissionId, driverId);
            showToast(`Driver ${driverId} has been approved!`);
            refreshQueue();
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    if (loading) return <LoadingState message="Fetching verification queue..." fullPage />;

    return (
        <div className="app-shell bg-black min-vh-100 py-4 pb-5">
            <Container>
                <header className="mb-5 d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="text-white fw-800 mb-1">Partner <span className="text-accent">Verification</span></h3>
                        <p className="text-muted small">Review and approve driver identity documents.</p>
                    </div>
                </header>

                <Row className="g-4">
                    {submissions.length > 0 ? (
                        submissions.map((sub) => (
                            <Col key={sub.id} lg={6}>
                                <GlassCard className="p-4 border-z h-100">
                                     <div className="d-flex justify-content-between align-items-start mb-4">
                                         <div>
                                             <div className="text-accent small fw-bold text-uppercase mb-1">Driver Details</div>
                                             <div className="text-white fw-bold fs-5">{sub.driverName || `Driver ${sub.driverId}`}</div>
                                             <div className="text-muted x-small">ID: {sub.driverId} • Submitted {new Date(sub.submittedAt).toLocaleDateString()}</div>
                                         </div>
                                         <StatusBadge status={sub.status} type="kyc" />
                                     </div>

                                     <Row className="g-3 mb-4">
                                         <Col xs={6}>
                                             <div className="text-muted x-small uppercase fw-bold mb-1">Licence Number</div>
                                             <div className="text-white small fw-bold">{sub.licenceNumber || 'LIC-1234567'}</div>
                                         </Col>
                                         <Col xs={6}>
                                             <div className="text-muted x-small uppercase fw-bold mb-1">Vehicle Plate</div>
                                             <div className="text-white small fw-bold">{sub.vehicleRegNumber || 'KA-XX-XXXX'}</div>
                                         </Col>
                                     </Row>

                                     <div className="bg-charcoal p-3 rounded-4 border-z mb-4">
                                         <h6 className="text-white x-small fw-800 uppercase mb-3">Uploaded Evidence</h6>
                                         <Row className="g-2">
                                             <Col xs={6}>
                                                 <div className="rounded-3 overflow-hidden border border-z" style={{ height: '80px' }}>
                                                     <Image src={sub.licenceUrl} fluid className="w-100 h-100 object-fit-cover opacity-75" />
                                                 </div>
                                                 <span className="x-small text-muted mt-1 d-block text-center italic">Licence Front</span>
                                             </Col>
                                             <Col xs={6}>
                                                <div className="rounded-3 overflow-hidden border border-z" style={{ height: '80px' }}>
                                                     <Image src={sub.rcUrl} fluid className="w-100 h-100 object-fit-cover opacity-75" />
                                                 </div>
                                                 <span className="x-small text-muted mt-1 d-block text-center italic">RC/Insurance</span>
                                             </Col>
                                         </Row>
                                     </div>

                                     <div className="d-flex gap-2">
                                         <Button variant="primary" className="flex-grow-1 py-3 fw-bold shadow-glow" onClick={() => handleApprove(sub.id, sub.driverId)}>
                                             Approve Partner
                                         </Button>
                                         <Button variant="outline-danger" className="border-z px-4" title="Reject">
                                             <i className="bi bi-x-lg"></i>
                                         </Button>
                                     </div>
                                </GlassCard>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12}>
                             <div className="text-center py-5 opacity-50 h-50 d-flex flex-column align-items-center justify-content-center">
                                 <i className="bi bi-check-all display-3 mb-3 d-block text-success"></i>
                                 <h5>Queue is empty</h5>
                                 <p className="small">All driver verification requests have been processed.</p>
                                 <Button variant="outline-light" size="sm" onClick={() => navigate('/admin/dashboard')} className="border-z px-4 mt-3">Back to Ops</Button>
                             </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default AdminKycQueue;
