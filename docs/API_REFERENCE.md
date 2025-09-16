# API Reference for Satu Data Portal

This document provides detailed information about all available API endpoints in the Satu Data Portal, with a focus on the SIPD e-walidata integration.

## Base URL

```
http://localhost:5001/v1
```

> Note: The port may vary based on your environment configuration.

## Authentication

All API endpoints require authentication using JWT tokens. Include the token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

## Integration Endpoints

All integration endpoints are available under the `/integration` route.

### Synchronize a File

Synchronize a specific file with external systems (SPLP and/or SIPD).

```
POST /integration/sync/:fileId
```

**Path Parameters:**
- `fileId` (string, required): The ID of the file to synchronize

**Request Body:**
```json
{
  "targets": ["splp", "sipd"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "File successfully synchronized with external systems",
  "results": [
    {
      "system": "sipd",
      "success": true,
      "data": { /* API response data */ },
      "message": "Data successfully sent to SIPD e-walidata"
    }
  ]
}
```

### Synchronize All Files

Synchronize all verified files with external systems.

```
POST /integration/sync-all
```

**Request Body:**
```json
{
  "targets": ["splp", "sipd"],
  "limit": 100
}
```

**Response:**
```json
{
  "success": true,
  "message": "Synchronized 5 files with external systems",
  "results": [
    {
      "fileId": "60f7b3b3f3b3f3b3f3b3f3b3",
      "fileName": "Dataset Example",
      "results": [
        {
          "system": "sipd",
          "success": true,
          "data": { /* API response data */ },
          "message": "Data successfully sent to SIPD e-walidata"
        }
      ]
    }
  ]
}
```

### Get Synchronization Status

Get the synchronization status for a specific file.

```
GET /integration/status/:fileId
```

**Path Parameters:**
- `fileId` (string, required): The ID of the file

**Response:**
```json
{
  "success": true,
  "message": "Sync status retrieved successfully",
  "data": {
    "fileId": "60f7b3b3f3b3f3b3f3b3f3b3",
    "fileName": "Dataset Example",
    "lastSync": "2023-01-01T00:00:00.000Z",
    "splpSynced": false,
    "sipdSynced": true,
    "verificationStatus": "Sudah Verifikasi"
  }
}
```

### Fetch Data from External System

Fetch data from a specific external system.

```
GET /integration/fetch/:system/:datasetId
```

**Path Parameters:**
- `system` (string, required): Either "splp" or "sipd"
- `datasetId` (string, required): The ID of the dataset to fetch

**Query Parameters (for SIPD):**
- `kodepemda` (string, optional): Kode pemda (default: "1612")

**Response:**
```json
{
  "success": true,
  "message": "Data successfully fetched from SIPD",
  "data": [
    {
      "id_dataset": "dataset-123",
      "nama_dataset": "Example Dataset",
      "tema_dataset": "Economy",
      "produsen_data": "Ministry of Finance",
      "cakupan_data": "National",
      "frekuensi_data": "Annual",
      "dimensi_data": "Time Series",
      "nama_file": "example.xlsx",
      "tipe_file": "xlsx",
      "publik": "Ya",
      "status_verifikasi": "Sudah Verifikasi",
      "tanggal_dibuat": "2023-01-01T00:00:00.000Z",
      "tanggal_diubah": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

## SIPD-Specific Endpoints

### Fetch Final Data from SIPD

Fetch final data from SIPD e-walidata.

```
GET /integration/sipd/final
```

**Query Parameters:**
- `kodepemda` (string, optional): Kode pemda (default: "1612")

**Response:**
```json
{
  "success": true,
  "message": "Final data successfully fetched from SIPD e-walidata",
  "data": [
    // Array of final datasets
  ]
}
```

### Fetch Reference Data from SIPD

Fetch reference data from SIPD e-walidata.

```
GET /integration/sipd/reference
```

**Query Parameters:**
- `kodepemda` (string, optional): Kode pemda (default: "1612")

**Response:**
```json
{
  "success": true,
  "message": "Reference data successfully fetched from SIPD e-walidata",
  "data": {
    // Reference data structure
  }
}
```

### Send Disable Request to SIPD

Send a disable request to SIPD e-walidata.

```
POST /integration/sipd/disable
```

**Request Body:**
```json
{
  "disableData": {
    "id_dataset": "dataset-123",
    "alasan": "Data no longer relevant"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Disable request successfully sent to SIPD e-walidata",
  "data": {
    // API response data
  }
}
```

## Data Models

### File Schema

The file schema represents the data structure used in the local database:

```javascript
{
  _id: String,
  name: String,
  temadataset: String,
  metaData: {
    produsen: String,
    cakupandata: String,
    frekuensi: String,
    dimensidataset: String,
    createdAt: Date,
    updatedAt: Date
  },
  filename: String,
  fileType: String,
  isPublic: Boolean,
  StatusVerifikasi: String // "Belum Verifikasi", "Sudah Verifikasi", "Ditolak"
}
```

### SIPD Data Format

The format used when sending data to SIPD e-walidata:

```javascript
{
  id_dataset: String,
  nama_dataset: String,
  tema_dataset: String,
  produsen_data: String,
  cakupan_data: String,
  frekuensi_data: String,
  dimensi_data: String,
  nama_file: String,
  tipe_file: String,
  publik: String, // "Ya" or "Tidak"
  status_verifikasi: String, // "Belum Verifikasi", "Sudah Verifikasi", "Ditolak"
  tanggal_dibuat: Date,
  tanggal_diubah: Date
}
```

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Invalid request parameters",
  "error": "Detailed error message"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Access denied"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Detailed error message"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse. If you exceed the rate limit, you will receive a 429 Too Many Requests response.

## Examples

### Synchronizing a File with SIPD

```bash
curl -X POST http://localhost:5001/v1/integration/sync/60f7b3b3f3b3f3b3f3b3f3b3 \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"targets": ["sipd"]}'
```

### Fetching Data from SIPD

```bash
curl -X GET "http://localhost:5001/v1/integration/fetch/sipd/dataset-123?kodepemda=1612" \
  -H "Authorization: Bearer your-jwt-token"
```

### Sending a Disable Request to SIPD

```bash
curl -X POST http://localhost:5001/v1/integration/sipd/disable \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"disableData": {"id_dataset": "dataset-123", "alasan": "Data no longer relevant"}}'
```