# SIPD Bearer Token Authentication Changes

## Overview
This document describes the changes made to update the SIPD E-Walidata integration to use Bearer token authentication instead of API key in query parameters.

## Changes Made

### 1. Environment Configuration
Updated `.env` file to use `SIPD_BEARER_TOKEN` instead of `SIPD_API_KEY`:
```env
SIPD_BEARER_TOKEN=your_bearer_token_here
```

### 2. External Integration Service
Updated `backend/services/externalIntegrationService.js`:

- Replaced `this.sipdApiKey` with `this.sipdBearerToken`
- Updated all SIPD API methods to use Bearer token in Authorization header:
  - `sendToSipd` (push_dssd)
  - `sendDisableToSipd` (push_disable_dssd)
  - `fetchFromSipd` (get_dssd)
  - `fetchFinalFromSipd` (get_dssd_final)
  - `fetchReferenceFromSipd` (get_ref_dssd)

### 3. API Endpoint Changes
All SIPD API endpoints now use Bearer token authentication in the Authorization header instead of API key in query parameters:

| Old URL | New URL |
|---------|---------|
| `https://sipd.go.id/ewalidata/serv/push_dssd?key=API_KEY` | `https://sipd.go.id/ewalidata/serv/push_dssd` |
| `https://sipd.go.id/ewalidata/serv/push_disable_dssd?key=API_KEY` | `https://sipd.go.id/ewalidata/serv/push_disable_dssd` |
| `https://sipd.go.id/ewalidata/serv/get_dssd?key=API_KEY&kodepemda=1612` | `https://sipd.go.id/ewalidata/serv/get_dssd?kodepemda=1612` |
| `https://sipd.go.id/ewalidata/serv/get_dssd_final?key=API_KEY&kodepemda=1612` | `https://sipd.go.id/ewalidata/serv/get_dssd_final?kodepemda=1612` |
| `https://sipd.go.id/ewalidata/serv/get_ref_dssd?key=API_KEY&kodepemda=1612` | `https://sipd.go.id/ewalidata/serv/get_ref_dssd?kodepemda=1612` |

### 4. Authentication Header
All requests to SIPD API now include:
```
Authorization: Bearer YOUR_BEARER_TOKEN
```

## Testing
A test script `backend/test-sipd-bearer.js` has been created to verify the authentication changes.

## Usage
1. Update your `.env` file with the correct Bearer token
2. Restart the backend server
3. The integration should now work with Bearer token authentication