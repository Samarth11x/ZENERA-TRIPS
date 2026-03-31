# ZENERA - Tour-Based Vehicle Rental Platform

## Overview
ZENERA is a premium round-trip vehicle rental system designed for multi-day tourism. It connects customers with drivers who own their own vehicles, providing a seamless booking and trip management experience.

## System Logic Summary

### Booking Flow
- **Type**: Round-trip only (Starts and ends at the same location).
- **Flexibility**: ±2 day buffer for delays.
- **Advance Payment**: 25%, 50%, or 100%. Minimum 25% to confirm.
- **Lead Time**: 24+ hours for guaranteed assignment; within 24 hours is "Waiting for driver".

### Pricing Model
- **Calculation**: Based on vehicle type per km + driver daily allowance.
- **Minimum KM**: 250–300 km/day billing floor.
- **Platform Commission**: ₹1–₹2 per km.
- **Driver Allowance**: Fixed per day based on vehicle type (e.g., Sedan ₹400, SUV ₹500).

### Driver Operations
- **Visibility**: 72 hours before trip start.
- **Assignment**: Self-selection based on vehicle type match.
- **Verification**: OTP-based start/end with odometer photo uploads.
- **Notification**: Final 24 hours push.

### AI Capabilities
- Cost estimation, vehicle suggestions, itinerary planning, and support.
- Pricing engine with min-km and per-km calculation rules.
