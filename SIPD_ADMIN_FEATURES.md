# SIPD Integration Admin Features

This document describes the new SIPD integration features available to administrators in the Satu Data Portal.

## Overview

Administrators now have access to enhanced SIPD integration capabilities through a dedicated panel in the dashboard. These features provide more comprehensive control over the integration with SIPD E-Walidata.

## New Components

### 1. SipdIntegrationPanel.jsx

A new component that provides a streamlined interface for SIPD integration operations:
- Bulk synchronization of all verified files with SIPD
- Data fetching operations (regular, final, and reference data)
- Dataset disable request functionality

### 2. Dashboard Integration

The SIPD integration panel is directly integrated into the admin dashboard through an accordion component, making it easily accessible without opening a modal.

## Features

### 1. Bulk Synchronization

Administrators can synchronize all verified files with SIPD E-Walidata with a single click:
- Syncs all files with "Sudah Verifikasi" status
- Shows progress during synchronization
- Displays detailed results after completion

### 2. Data Operations

Three types of data can be fetched from SIPD:
- **Regular Data**: Standard dataset information
- **Final Data**: Finalized dataset information
- **Reference Data**: Reference data from SIPD

All operations require a "Kode Pemda" which defaults to "1612" but can be changed.

### 3. Dataset Disable Requests

Administrators can send disable requests for datasets:
- Requires dataset ID and reason for disabling
- Sends request to SIPD E-Walidata API
- Provides feedback on request success/failure

## Usage

### Accessing the Features

1. Log in as an administrator
2. Navigate to the dashboard
3. Expand the "Panel Integrasi SIPD" accordion section
4. Use the tabs to access different features:
   - **Sinkronisasi**: Bulk file synchronization
   - **Operasi SIPD**: Data fetching operations
   - **Disable Dataset**: Send disable requests

### Bulk Synchronization

1. Click the "Sinkron Semua File dengan SIPD" button
2. Wait for the synchronization to complete
3. Review the results in the displayed alert

### Data Operations

1. Enter the appropriate "Kode Pemda"
2. Click one of the data fetch buttons:
   - "Data SIPD" for regular data
   - "Data Final" for finalized data
   - "Data Referensi" for reference data
3. View the fetched data in the results panel

### Disable Requests

1. Enter the dataset ID in the "ID Dataset" field
2. Provide a reason in the "Alasan Disable" field
3. Click "Kirim Permintaan Disable"
4. Review the success/failure message

## Technical Implementation

### Components

- **SipdIntegrationPanel.jsx**: Main component for SIPD operations
- **Dashboard.jsx**: Updated to include the SIPD panel for admin users

### API Calls

The component uses the existing backend integration endpoints:
- `POST /v1/integration/sync-all` for bulk synchronization
- `GET /v1/integration/sipd/final` for data fetching
- `GET /v1/integration/sipd/reference` for reference data
- `POST /v1/integration/sipd/disable` for disable requests

### State Management

The component manages several states:
- Synchronization progress and results
- Data fetching states
- Form data for disable requests
- User feedback through toast notifications

## Security

- All API calls include JWT authentication
- Only administrators can access these features
- Input validation for required fields

## Future Enhancements

Planned improvements:
1. Detailed logging of all integration operations
2. History of synchronization operations
3. Enhanced error handling and recovery
4. Scheduling for automatic synchronization