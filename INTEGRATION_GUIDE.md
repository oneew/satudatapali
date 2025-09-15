# Integration Guide for Satu Data Portal

This document explains how to set up and use the integrations with SPLP Satu Data Indonesia and SIPD e-walidata.

## Overview

The Satu Data Portal is designed to integrate with two external systems:
1. SPLP Satu Data Indonesia
2. SIPD e-walidata

These integrations allow for data synchronization between the local portal and the national systems.

## Configuration

### Environment Variables

The following environment variables need to be configured in the backend [.env](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/.env) file:

```env
# External API configurations
SPLP_API_URL=https://api.splp-satudata-indonesia.go.id/v1
SIPD_API_URL=https://sipd.go.id/ewalidata/serv
SIPD_API_KEY=f382e18190ff14aa1d2771f489f4fb93
```

Replace the URLs and API key with the actual values provided by the respective systems.

## API Endpoints

The integration APIs are available under the `/v1/integration` route:

### Synchronize a File
```
POST /v1/integration/sync/:fileId
```
Synchronizes a specific file with the selected external systems.

Request body:
```json
{
  "targets": ["splp", "sipd"] // Array of systems to sync with
}
```

### Synchronize All Files
```
POST /v1/integration/sync-all
```
Synchronizes all verified files with the selected external systems.

Request body:
```json
{
  "targets": ["splp", "sipd"], // Array of systems to sync with
  "limit": 100 // Maximum number of files to sync
}
```

### Get Sync Status
```
GET /v1/integration/status/:fileId
```
Retrieves the synchronization status for a specific file.

### Fetch Data from External System
```
GET /v1/integration/fetch/:system/:datasetId
```
Fetches data from a specific external system.

Parameters:
- `system`: Either "splp" or "sipd"
- `datasetId`: The ID of the dataset to fetch

### SIPD-Specific Endpoints

#### Fetch Regular Data
```
GET /v1/integration/fetch/sipd/:datasetId?kodepemda=1612
```
Fetches regular data from SIPD e-walidata for a specific kodepemda.

#### Fetch Final Data
```
GET /v1/integration/sipd/final?kodepemda=1612
```
Fetches final data from SIPD e-walidata for a specific kodepemda.

#### Fetch Reference Data
```
GET /v1/integration/sipd/reference?kodepemda=1612
```
Fetches reference data from SIPD e-walidata for a specific kodepemda.

#### Send Disable Request
```
POST /v1/integration/sipd/disable
```
Sends a disable request to SIPD e-walidata.

Request body:
```json
{
  "disableData": {
    // Data for disable request
  }
}
```

## Data Transformation

The system automatically transforms data between the local format and the formats required by the external systems:

### Local to SPLP Format
- `name` → `dataset_name`
- `temadataset` → `theme`
- `metaData.produsen` → `producer`
- And so on...

### Local to SIPD Format
- `name` → `nama_dataset`
- `temadataset` → `tema_dataset`
- `metaData.produsen` → `produsen_data`
- And so on...

## Frontend Integration

The frontend includes components and services to interact with the integration APIs:

1. `IntegrationControls.jsx` - UI component for controlling integrations
2. `integrationService.js` - Service for API calls

## Error Handling

The system includes comprehensive error handling for:
- Network failures
- Authentication errors
- Data validation errors
- API rate limiting

Errors are logged and appropriate feedback is provided to the user.

## Security

All API calls require authentication using JWT tokens. The external API key is stored securely in environment variables and not exposed to the frontend.

## Future Enhancements

Planned improvements:
1. Automatic synchronization scheduling
2. Enhanced error recovery mechanisms
3. Detailed synchronization logs
4. Conflict resolution for data discrepancies