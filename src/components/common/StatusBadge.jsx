import React from 'react';
import { Badge } from 'react-bootstrap';
import { TRIP_STATUS, KYC_STATUS } from '../../utils/constants';

const StatusBadge = ({ status, type = 'trip' }) => {
    let bg = 'dark';
    let text = 'white';
    let label = status;

    if (type === 'trip') {
        switch (status) {
            case TRIP_STATUS.SEARCHING: bg = 'warning'; text = 'dark'; label = 'Searching...'; break;
            case TRIP_STATUS.DRIVER_ASSIGNED: bg = 'info'; text = 'dark'; label = 'Driver Assigned'; break;
            case TRIP_STATUS.DRIVER_ARRIVING: bg = 'info'; text = 'dark'; label = 'Driver Arriving'; break;
            case TRIP_STATUS.OTP_READY: bg = 'accent'; text = 'dark'; label = 'Ready for OTP'; break;
            case TRIP_STATUS.TRIP_STARTED: bg = 'success'; text = 'white'; label = 'On Trip'; break;
            case TRIP_STATUS.TRIP_COMPLETED: bg = 'light'; text = 'dark'; label = 'Completed'; break;
            case TRIP_STATUS.CANCELLED: bg = 'danger'; text = 'white'; label = 'Cancelled'; break;
            default: bg = 'secondary';
        }
    } else if (type === 'kyc') {
        switch (status) {
            case KYC_STATUS.PENDING: bg = 'warning'; text = 'dark'; label = 'Pending'; break;
            case KYC_STATUS.VERIFYING: bg = 'info'; text = 'dark'; label = 'Verifying'; break;
            case KYC_STATUS.APPROVED: bg = 'success'; text = 'white'; label = 'Approved'; break;
            case KYC_STATUS.REJECTED: bg = 'danger'; text = 'white'; label = 'Rejected'; break;
            default: bg = 'secondary';
        }
    }

    return (
        <Badge 
            bg={bg} 
            text={text} 
            className="px-3 py-2 text-uppercase fw-800 rounded-pill"
            style={bg === 'accent' ? { backgroundColor: 'var(--z-accent-orange)', color: '#000' } : {}}
        >
            {label}
        </Badge>
    );
};

export default StatusBadge;
