# Satu Data Portal Backend

This is the backend for the Satu Data Portal, providing API services and integration capabilities with external systems.

## Features

- RESTful API for file management
- User authentication and authorization
- MongoDB integration for data storage
- Integration with external systems:
  - SPLP Satu Data Indonesia
  - SIPD e-walidata

## Tech Stack

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Axios for HTTP requests

## Integration Features

The backend includes comprehensive integration services for connecting with SPLP Satu Data Indonesia and SIPD e-walidata:

### External Integration Service

The [ExternalIntegrationService](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/externalIntegrationService.js) provides:
- Data transformation between local and external formats
- Data validation according to external system requirements
- API communication with external systems
- Error handling and logging

### Data Transformation

The [dataTransformer utilities](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/utils/dataTransformer.js) handle:
- Validation of data for SPLP and SIPD standards
- Transformation of external data to local format
- Text and date normalization

### API Endpoints

Integration endpoints are available under `/v1/integration`:
- `POST /sync/:id` - Synchronize a specific file
- `POST /sync-all` - Synchronize all verified files
- `GET /status/:id` - Get synchronization status for a file
- `GET /fetch/:system/:datasetId` - Fetch data from an external system

For detailed information about the integration features, see:
- [INTEGRATION_GUIDE.md](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/INTEGRATION_GUIDE.md)
- [INTEGRATION_SUMMARY.md](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/INTEGRATION_SUMMARY.md)
- [services/README.md](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/services/README.md)

## Project Structure

```
backend/
├── connection/          # Database and authentication connections
├── controller/          # Request handlers
├── middleware/          # Custom middleware
├── routes/              # API route definitions
├── schema/              # MongoDB schemas
├── services/            # Business logic and external services
├── utils/               # Utility functions
├── test/                # Test files
└── server.js            # Main server file
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
SPLP_API_URL=https://api.splp-satudata-indonesia.go.id/v1
SIPD_API_URL=https://api.sipd-ewalidata.go.id/v1
EXTERNAL_API_KEY=your_external_api_key
```

## Available Scripts

### `npm run dev`

Runs the server in development mode with nodemon for auto-reloading.

### `npm start`

Runs the server in production mode.

### `npm run build`

Installs dependencies and builds the frontend.