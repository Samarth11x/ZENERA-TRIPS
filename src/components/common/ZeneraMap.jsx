import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/map.css';
import { TRIP_STATUS } from '../../utils/constants';

// Fix Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const createCustomIcon = (color) => L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px ${color};"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

const carIcon = L.divIcon({
    className: 'z-car-marker',
    html: `<div style="background-color: #ff6b00; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; transform: rotate(45deg); border: 2px solid #fff; box-shadow: 0 0 15px #ff6b00;">
            <i class="bi bi-cursor-fill text-white" style="transform: rotate(-45deg); font-size: 14px;"></i>
          </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// Mock coordinates for cities
const CITY_COORDS = {
    "Mumbai, Maharashtra": [19.0760, 72.8777],
    "Pune, Maharashtra": [18.5204, 73.8567],
    "Bangalore, Karnataka": [12.9716, 77.5946],
    "Delhi": [28.6139, 77.2090],
    "Chennai, Tamil Nadu": [13.0827, 80.2707],
    "Mysore, Karnataka": [12.2958, 76.6394],
    "Hyderabad, Telangana": [17.3850, 78.4867],
    "Goa": [15.2993, 74.1240]
};

const getCoords = (name) => {
    return CITY_COORDS[name] || [12.9716, 77.5946]; // Default to Bangalore
};

// Component to handle map view fitting
const FitBounds = ({ pickupCoords, destCoords }) => {
    const map = useMap();
    useEffect(() => {
        if (pickupCoords && destCoords) {
            const bounds = L.latLngBounds([pickupCoords, destCoords]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [pickupCoords, destCoords, map]);
    return null;
};

const ZeneraMap = ({ trip }) => {
    const pickupCoords = useMemo(() => getCoords(trip?.pickup), [trip?.pickup]);
    const destCoords = useMemo(() => getCoords(trip?.destination), [trip?.destination]);
    const [driverPos, setDriverPos] = useState(pickupCoords);

    // Simulated driver movement
    useEffect(() => {
        if (!trip || trip.status === TRIP_STATUS.SEARCHING) return;

        let interval;
        if (trip.status === TRIP_STATUS.ARRIVING || trip.status === TRIP_STATUS.ASSIGNED) {
            // Simulate driver moving towards pickup
            let step = 0;
            const start = [pickupCoords[0] + 0.02, pickupCoords[1] + 0.02];
            interval = setInterval(() => {
                step += 0.05;
                if (step >= 1) {
                    setDriverPos(pickupCoords);
                    clearInterval(interval);
                } else {
                    const lat = start[0] + (pickupCoords[0] - start[0]) * step;
                    const lng = start[1] + (pickupCoords[1] - start[1]) * step;
                    setDriverPos([lat, lng]);
                }
            }, 1000);
        } else if (trip.status === TRIP_STATUS.STARTED) {
            // Simulate movement towards destination
            let step = 0;
            interval = setInterval(() => {
                step += 0.01;
                if (step >= 1) {
                    setDriverPos(destCoords);
                    clearInterval(interval);
                } else {
                    const lat = pickupCoords[0] + (destCoords[0] - pickupCoords[0]) * step;
                    const lng = pickupCoords[1] + (destCoords[1] - pickupCoords[1]) * step;
                    setDriverPos([lat, lng]);
                }
            }, 2000);
        }

        return () => clearInterval(interval);
    }, [trip?.status, pickupCoords, destCoords]);

    return (
        <div className="zenera-map-container" style={{ height: '300px' }}>
            <MapContainer 
                center={pickupCoords} 
                zoom={13} 
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                
                <Marker position={pickupCoords} icon={createCustomIcon('#ff6b00')} />
                <Marker position={destCoords} icon={createCustomIcon('#ffffff')} />
                
                {trip?.status !== TRIP_STATUS.SEARCHING && (
                    <>
                        <Marker position={driverPos} icon={carIcon} />
                        <Polyline 
                            positions={[pickupCoords, destCoords]} 
                            pathOptions={{ color: '#ff6b00', weight: 3, dashArray: '5, 10', opacity: 0.5 }} 
                        />
                    </>
                )}

                <FitBounds pickupCoords={pickupCoords} destCoords={destCoords} />
            </MapContainer>

            {/* Status Overlay */}
            <div className="position-absolute bottom-0 start-0 m-3 z-index-1000">
                <div className="glass-morphism p-2 px-3 rounded-pill border-z text-white x-small fw-bold">
                    <i className="bi bi-broadcast text-accent me-2"></i>
                    REAL-TIME TRACKING ACTIVE
                </div>
            </div>
        </div>
    );
};

export default ZeneraMap;
