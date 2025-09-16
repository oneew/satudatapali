# SIPD E-Walidata API Endpoints Summary

This document provides a quick reference for all SIPD E-Walidata API endpoints used in the Satu Data Portal integration.

## Base URL
```
https://sipd.go.id/ewalidata/serv
```

## Authentication
All endpoints require an API key passed as a query parameter:
```
?key={SIPD_API_KEY}
```

## Endpoint Summary

| Endpoint | Method | Description | Requires Body | Query Parameters |
|----------|--------|-------------|---------------|------------------|
| [/push_dssd](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/externalIntegrationService.js#L102-L120) | POST | Send dataset to SIPD | Yes | `key` |
| [/push_disable_dssd](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/externalIntegrationService.js#L129-L147) | POST | Disable dataset in SIPD | Yes | `key` |
| [/get_dssd](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/externalIntegrationService.js#L156-L179) | GET | Fetch datasets from SIPD | No | `key`, `kodepemda` |
| [/get_dssd_final](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/externalIntegrationService.js#L188-L211) | GET | Fetch final datasets from SIPD | No | `key`, `kodepemda` |
| [/get_ref_dssd](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/externalIntegrationService.js#L220-L239) | GET | Fetch reference data from SIPD | No | `key`, `kodepemda` |

## Detailed Endpoint Information

### 1. Push Dataset (`/push_dssd`)

**Purpose**: Send a dataset to SIPD E-Walidata

**Method**: POST

**URL**: 
```
https://sipd.go.id/ewalidata/serv/push_dssd?key={SIPD_API_KEY}
```

**Request Body**:
```json
{
  "id_dataset": "string",
  "nama_dataset": "string",
  "tema_dataset": "string",
  "produsen_data": "string",
  "cakupan_data": "string",
  "frekuensi_data": "string",
  "dimensi_data": "string",
  "nama_file": "string",
  "tipe_file": "string",
  "publik": "Ya|Tidak",
  "status_verifikasi": "Belum Verifikasi|Sudah Verifikasi|Ditolak",
  "tanggal_dibuat": "ISO8601 date",
  "tanggal_diubah": "ISO8601 date"
}
```

**Response**:
```json
{
  "status": "success|error",
  "message": "string",
  "data": {
    "id_dataset": "string"
  }
}
```

### 2. Disable Dataset (`/push_disable_dssd`)

**Purpose**: Send a request to disable a dataset in SIPD E-Walidata

**Method**: POST

**URL**: 
```
https://sipd.go.id/ewalidata/serv/push_disable_dssd?key={SIPD_API_KEY}
```

**Request Body**:
```json
{
  "id_dataset": "string",
  "alasan": "string"
}
```

**Response**:
```json
{
  "status": "success|error",
  "message": "string",
  "data": {
    "id_dataset": "string"
  }
}
```

### 3. Fetch Datasets (`/get_dssd`)

**Purpose**: Fetch datasets from SIPD E-Walidata

**Method**: GET

**URL**: 
```
https://sipd.go.id/ewalidata/serv/get_dssd?key={SIPD_API_KEY}&kodepemda={KODE_PEMDA}
```

**Query Parameters**:
- `kodepemda` (required): Kode pemda (e.g., "1612")

**Response**:
```json
{
  "status": "success|error",
  "message": "string",
  "data": [
    {
      "id_dataset": "string",
      "nama_dataset": "string",
      "tema_dataset": "string",
      "produsen_data": "string",
      "cakupan_data": "string",
      "frekuensi_data": "string",
      "dimensi_data": "string",
      "nama_file": "string",
      "tipe_file": "string",
      "publik": "Ya|Tidak",
      "status_verifikasi": "Belum Verifikasi|Sudah Verifikasi|Ditolak",
      "tanggal_dibuat": "ISO8601 date",
      "tanggal_diubah": "ISO8601 date"
    }
  ]
}
```

### 4. Fetch Final Datasets (`/get_dssd_final`)

**Purpose**: Fetch final datasets from SIPD E-Walidata

**Method**: GET

**URL**: 
```
https://sipd.go.id/ewalidata/serv/get_dssd_final?key={SIPD_API_KEY}&kodepemda={KODE_PEMDA}
```

**Query Parameters**:
- `kodepemda` (required): Kode pemda (e.g., "1612")

**Response**:
```json
{
  "status": "success|error",
  "message": "string",
  "data": [
    // Array of dataset objects (same structure as get_dssd)
  ]
}
```

### 5. Fetch Reference Data (`/get_ref_dssd`)

**Purpose**: Fetch reference data from SIPD E-Walidata

**Method**: GET

**URL**: 
```
https://sipd.go.id/ewalidata/serv/get_ref_dssd?key={SIPD_API_KEY}&kodepemda={KODE_PEMDA}
```

**Query Parameters**:
- `kodepemda` (required): Kode pemda (e.g., "1612")

**Response**:
```json
{
  "status": "success|error",
  "message": "string",
  "data": {
    // Reference data structure
  }
}
```

## Data Validation Rules

### Required Fields for Push Operations
- `id_dataset`
- `nama_dataset`
- `tema_dataset`
- `produsen_data`
- `cakupan_data`
- `frekuensi_data`
- `dimensi_data`
- `nama_file`
- `tipe_file`
- `publik`
- `status_verifikasi`
- `tanggal_dibuat`
- `tanggal_diubah`

### Valid File Types
- pdf
- doc
- docx
- xls
- xlsx

### Valid Public Status Values
- Ya
- Tidak

### Valid Verification Status Values
- Belum Verifikasi
- Sudah Verifikasi
- Ditolak

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request**:
```json
{
  "status": "error",
  "message": "Invalid request parameters",
  "error": "Detailed error message"
}
```

**401 Unauthorized**:
```json
{
  "status": "error",
  "message": "Invalid API key"
}
```

**403 Forbidden**:
```json
{
  "status": "error",
  "message": "Access denied"
}
```

**500 Internal Server Error**:
```json
{
  "status": "error",
  "message": "Internal server error",
  "error": "Detailed error message"
}
```

## Rate Limiting

SIPD E-Walidata API implements rate limiting. If you exceed the rate limit, you will receive a 429 Too Many Requests response.

## Implementation in Satu Data Portal

The Satu Data Portal implements these endpoints through:

1. **External Integration Service** ([externalIntegrationService.js](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/externalIntegrationService.js)):
   - Methods for calling each SIPD endpoint
   - Data transformation between local and SIPD formats
   - Error handling

2. **Integration Controller** ([integrationController.js](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/controller/integrationController.js)):
   - Express.js routes that expose the functionality
   - Request/response handling
   - Authentication middleware

3. **Integration Routes** ([integrationRoute.js](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/routes/integrationRoute.js)):
   - Route definitions for the integration endpoints
   - Authentication middleware applied to all routes

## Usage Examples

### Push Dataset
```javascript
const integrationService = new ExternalIntegrationService();
const result = await integrationService.sendToSipd(formattedData);
```

### Fetch Datasets
```javascript
const integrationService = new ExternalIntegrationService();
const result = await integrationService.fetchFromSipd('1612');
```

### Fetch Final Datasets
```javascript
const integrationService = new ExternalIntegrationService();
const result = await integrationService.fetchFinalFromSipd('1612');
```

### Fetch Reference Data
```javascript
const integrationService = new ExternalIntegrationService();
const result = await integrationService.fetchReferenceFromSipd('1612');
```

### Disable Dataset
```javascript
const integrationService = new ExternalIntegrationService();
const result = await integrationService.sendDisableToSipd(disableData);
```