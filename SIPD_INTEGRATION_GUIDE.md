# SIPD E-Walidata Integration Guide

This document provides detailed information about the integration with SIPD (Sistem Informasi Pemerintahan Daerah) E-Walidata service.

## Overview

The Satu Data Portal integrates with SIPD E-Walidata to synchronize datasets with the national data repository. This integration allows for:
- Pushing datasets to SIPD (push_dssd)
- Disabling datasets in SIPD (push_disable_dssd)
- Fetching datasets from SIPD (get_dssd)
- Fetching final datasets from SIPD (get_dssd_final)
- Fetching reference data from SIPD (get_ref_dssd)

## Configuration

### Environment Variables

The following environment variables need to be configured in the backend [.env](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/.env) file:

```env
SIPD_API_URL=https://sipd.go.id/ewalidata/serv
SIPD_API_KEY=f382e18190ff14aa1d2771f489f4fb93
```

> Note: The API key shown above is an example. Replace it with the actual API key provided by SIPD.

### Base URL

The base URL for all SIPD API endpoints is:
```
https://sipd.go.id/ewalidata/serv
```

## API Endpoints

### Push Dataset (push_dssd)

Send a dataset to SIPD E-Walidata.

**Endpoint:**
```
POST /push_dssd?key={API_KEY}
```

**Request Body:**
```json
{
  "id_dataset": "unique-dataset-id",
  "nama_dataset": "Dataset Name",
  "tema_dataset": "Dataset Theme",
  "produsen_data": "Data Producer",
  "cakupan_data": "Data Coverage",
  "frekuensi_data": "Data Frequency",
  "dimensi_data": "Data Dimension",
  "nama_file": "filename.xlsx",
  "tipe_file": "xlsx",
  "publik": "Ya",
  "status_verifikasi": "Sudah Verifikasi",
  "tanggal_dibuat": "2023-01-01T00:00:00.000Z",
  "tanggal_diubah": "2023-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Dataset successfully pushed to SIPD",
  "data": {
    "id_dataset": "unique-dataset-id"
  }
}
```

### Disable Dataset (push_disable_dssd)

Send a request to disable a dataset in SIPD E-Walidata.

**Endpoint:**
```
POST /push_disable_dssd?key={API_KEY}
```

**Request Body:**
```json
{
  "id_dataset": "unique-dataset-id",
  "alasan": "Reason for disabling the dataset"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Dataset disable request successfully sent to SIPD",
  "data": {
    "id_dataset": "unique-dataset-id"
  }
}
```

### Fetch Datasets (get_dssd)

Fetch datasets from SIPD E-Walidata.

**Endpoint:**
```
GET /get_dssd?key={API_KEY}&kodepemda={KODE_PEMDA}
```

**Query Parameters:**
- `kodepemda` (string, required): Kode pemda (e.g., "1612")

**Response:**
```json
{
  "status": "success",
  "message": "Datasets successfully fetched from SIPD",
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

### Fetch Final Datasets (get_dssd_final)

Fetch final datasets from SIPD E-Walidata.

**Endpoint:**
```
GET /get_dssd_final?key={API_KEY}&kodepemda={KODE_PEMDA}
```

**Query Parameters:**
- `kodepemda` (string, required): Kode pemda (e.g., "1612")

**Response:**
```json
{
  "status": "success",
  "message": "Final datasets successfully fetched from SIPD",
  "data": [
    // Array of final datasets
  ]
}
```

### Fetch Reference Data (get_ref_dssd)

Fetch reference data from SIPD E-Walidata.

**Endpoint:**
```
GET /get_ref_dssd?key={API_KEY}&kodepemda={KODE_PEMDA}
```

**Query Parameters:**
- `kodepemda` (string, required): Kode pemda (e.g., "1612")

**Response:**
```json
{
  "status": "success",
  "message": "Reference data successfully fetched from SIPD",
  "data": {
    // Reference data structure
  }
}
```

## Data Validation

Before sending data to SIPD, the system validates the data according to SIPD requirements:

### Required Fields
- `nama_dataset` (Dataset Name)
- `tema_dataset` (Dataset Theme)
- `produsen_data` (Data Producer)
- `cakupan_data` (Data Coverage)
- `frekuensi_data` (Data Frequency)
- `dimensi_data` (Data Dimension)
- `nama_file` (File Name)
- `tipe_file` (File Type)

### Valid File Types
- pdf
- doc
- docx
- xls
- xlsx

### Valid Public Status
- Ya (Yes)
- Tidak (No)

### Valid Verification Statuses
- Belum Verifikasi (Not Verified)
- Sudah Verifikasi (Verified)
- Ditolak (Rejected)

## Implementation Details

### External Integration Service

The integration is implemented in the [externalIntegrationService.js](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/externalIntegrationService.js) file, which provides methods for:

1. **Preparing SIPD Data**: Converting local data format to SIPD format
2. **Sending Data to SIPD**: Using the push_dssd endpoint
3. **Sending Disable Requests**: Using the push_disable_dssd endpoint
4. **Fetching Data from SIPD**: Using the get_dssd endpoint
5. **Fetching Final Data**: Using the get_dssd_final endpoint
6. **Fetching Reference Data**: Using the get_ref_dssd endpoint

### Data Transformation

The system automatically transforms data between the local format and SIPD format:

| Local Field | SIPD Field |
|-------------|------------|
| `_id` | `id_dataset` |
| `name` | `nama_dataset` |
| `temadataset` | `tema_dataset` |
| `metaData.produsen` | `produsen_data` |
| `metaData.cakupandata` | `cakupan_data` |
| `metaData.frekuensi` | `frekuensi_data` |
| `metaData.dimensidataset` | `dimensi_data` |
| `filename` | `nama_file` |
| `fileType` | `tipe_file` |
| `isPublic` | `publik` ("Ya"/"Tidak") |
| `StatusVerifikasi` | `status_verifikasi` |

### Integration Controller

The [integrationController.js](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/controller/integrationController.js) file provides Express.js routes for:

1. **Synchronizing individual files** with SIPD
2. **Synchronizing all verified files** with SIPD
3. **Fetching data** from SIPD
4. **Fetching final data** from SIPD
5. **Fetching reference data** from SIPD
6. **Sending disable requests** to SIPD

## Usage Examples

### Synchronizing a Single File with SIPD

Using the API:
```bash
curl -X POST http://localhost:5001/v1/integration/sync/60f7b3b3f3b3f3b3f3b3f3b3 \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"targets": ["sipd"]}'
```

### Fetching Data from SIPD

Using the API:
```bash
curl -X GET "http://localhost:5001/v1/integration/sipd/final?kodepemda=1612" \
  -H "Authorization: Bearer your-jwt-token"
```

### Sending a Disable Request

Using the API:
```bash
curl -X POST http://localhost:5001/v1/integration/sipd/disable \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"disableData": {"id_dataset": "dataset-123", "alasan": "Data no longer relevant"}}'
```

## Error Handling

The integration service handles various types of errors:

1. **Network Errors**: Connection timeouts, DNS failures
2. **Authentication Errors**: Invalid API key
3. **Data Validation Errors**: Missing required fields, invalid values
4. **API Errors**: Rate limiting, server errors

All errors are logged and appropriate responses are returned to the client.

## Security Considerations

1. **API Key Protection**: The API key is stored in environment variables and not exposed in the code
2. **HTTPS**: All communication with SIPD uses HTTPS
3. **Authentication**: All API endpoints require JWT authentication
4. **Data Validation**: Input data is validated before sending to SIPD

## Testing

The integration service includes unit tests in [integrationService.test.js](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/test/integrationService.test.js) that cover:

1. Data preparation for SIPD
2. Data validation for SIPD
3. Error handling for invalid data

To run the tests:
```bash
npm test
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**: Verify that the SIPD_API_KEY is correct
2. **Invalid Data**: Check that all required fields are present and valid
3. **Network Errors**: Ensure that the SIPD API is accessible
4. **Rate Limiting**: If sending many requests, add delays between them

### Debugging

To enable detailed logging, set the DEBUG environment variable:
```env
DEBUG=integration:*
```

### Logs

Check the console output for detailed error messages and debugging information.

## Future Enhancements

Planned improvements for the SIPD integration:

1. **Automatic Synchronization Scheduling**: Schedule regular synchronization with SIPD
2. **Enhanced Error Recovery**: Automatically retry failed requests
3. **Detailed Synchronization Logs**: Store detailed logs of all synchronization activities
4. **Conflict Resolution**: Handle data discrepancies between local and SIPD data
5. **Batch Operations**: Support batch operations for better performance