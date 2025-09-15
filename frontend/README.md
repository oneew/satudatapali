# Satu Data Portal

This is the frontend for the Satu Data Portal, a comprehensive data management system that integrates with SPLP Satu Data Indonesia and SIPD e-walidata.

## Features

- User authentication and role-based access control
- File upload and management
- Data verification workflow
- Integration with external systems:
  - SPLP Satu Data Indonesia
  - SIPD e-walidata

## Tech Stack

- React with Vite
- Chakra UI for styling
- React Router for navigation
- Axios for API calls

## Integration Features

This portal includes comprehensive integration capabilities with SPLP Satu Data Indonesia and SIPD e-walidata:

- Synchronize individual files with external systems
- Bulk synchronization of all verified files
- Data transformation between local and external formats
- Real-time synchronization status tracking

For detailed information about the integration features, see:
- [INTEGRATION_GUIDE.md](../INTEGRATION_GUIDE.md)
- [USAGE_INTEGRATION.md](../USAGE_INTEGRATION.md)
- [INTEGRATION_SUMMARY.md](../INTEGRATION_SUMMARY.md)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).