# Integration Services

This directory contains services for integrating with external systems:

## External Integration Service

The [externalIntegrationService.js](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/externalIntegrationService.js) file provides functionality for integrating with:
- SPLP Satu Data Indonesia
- SIPD e-walidata

### Features

1. **Data Transformation**: Converts local data format to external system formats
2. **Data Validation**: Validates data according to external system requirements
3. **API Communication**: Handles communication with external APIs
4. **Error Handling**: Comprehensive error handling for all integration operations
5. **Synchronization**: Supports both single file and bulk synchronization

### Usage

```javascript
import ExternalIntegrationService from './externalIntegrationService.js';

const integrationService = new ExternalIntegrationService();

// Synchronize a file with external systems
const results = await integrationService.synchronizeFile(fileData, ['splp', 'sipd']);
```

## Data Transformer Utilities

The [dataTransformer.js](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/utils/dataTransformer.js) file contains utility functions for:
- Validating data according to external system standards
- Transforming data between formats
- Normalizing text and dates

## API Routes

Integration endpoints are available at `/v1/integration`:
- `POST /sync/:id` - Synchronize a specific file
- `POST /sync-all` - Synchronize all verified files
- `GET /status/:id` - Get synchronization status
- `GET /fetch/:system/:datasetId` - Fetch data from external system

## Configuration

The service is configured through environment variables:
- `SPLP_API_URL`
- `SIPD_API_URL`
- `EXTERNAL_API_KEY`

See [.env](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/.env) for details.