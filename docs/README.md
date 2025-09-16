# Satu Data Portal Documentation

This directory contains comprehensive documentation for the Satu Data Portal, with a focus on the SIPD E-Walidata integration.

## Documentation Files

### Integration Guides
- [INTEGRATION_GUIDE.md](../INTEGRATION_GUIDE.md) - General integration guide for SPLP and SIPD
- [SIPD_INTEGRATION_GUIDE.md](../SIPD_INTEGRATION_GUIDE.md) - Detailed guide for SIPD E-Walidata integration
- [USAGE_INTEGRATION.md](../USAGE_INTEGRATION.md) - Instructions for using the integration features

### API Documentation
- [API_REFERENCE.md](API_REFERENCE.md) - Complete API reference for all endpoints
- [SIPD_API_ENDPOINTS.md](../SIPD_API_ENDPOINTS.md) - Quick reference for SIPD API endpoints

### Implementation Summary
- [INTEGRATION_SUMMARY.md](../INTEGRATION_SUMMARY.md) - Summary of implemented integration features

## Testing

To test the SIPD integration, run:
```bash
npm run test-sipd
```

This will execute the [test-sipd-api.js](../test-sipd-api.js) script which demonstrates how to use the integration service.

## Directory Structure

```
docs/
├── API_REFERENCE.md          # Complete API reference
├── package.json              # Documentation package configuration
└── README.md                 # This file

../SIPD_INTEGRATION_GUIDE.md   # Detailed SIPD integration guide
../SIPD_API_ENDPOINTS.md       # Quick reference for SIPD endpoints
../INTEGRATION_GUIDE.md        # General integration guide
../INTEGRATION_SUMMARY.md      # Implementation summary
../USAGE_INTEGRATION.md        # Usage instructions
../test-sipd-api.js            # Test script for SIPD integration
```

## Related Files

The documentation references implementation files in:
- [backend/services/](../backend/services/) - Integration service implementation
- [backend/controller/](../backend/controller/) - Integration controller implementation
- [backend/routes/](../backend/routes/) - Integration route definitions
- [backend/utils/](../backend/utils/) - Data transformation utilities

## Environment Configuration

The integration requires proper environment configuration in [backend/.env](../backend/.env):
```env
SIPD_API_URL=https://sipd.go.id/ewalidata/serv
SIPD_API_KEY=your-api-key-here
```