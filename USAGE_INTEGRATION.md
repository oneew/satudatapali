# Using the Integration Features

This document explains how to use the integration features for SPLP Satu Data Indonesia and SIPD e-walidata.

## Prerequisites

1. Configure the environment variables in the backend [.env](file:///c%3A/Users/User/OneDrive/Desktop/satudatapali/backend/.env) file:
   ```
   SPLP_API_URL=https://api.splp-satudata-indonesia.go.id/v1
   SIPD_API_URL=https://api.sipd-ewalidata.go.id/v1
   EXTERNAL_API_KEY=your-api-key-here
   ```

2. Ensure you have valid API keys from both systems

## How to Use the Integration Features

### 1. Sync Individual Files

1. Navigate to the Dashboard
2. Find the file you want to synchronize in the table
3. Click the "Sync" button (circular arrow icon) in the "Integrasi" column
4. Select the target systems (SPLP, SIPD, or both)
5. Click "Sync This File"
6. Wait for the synchronization to complete
7. View the results in the modal

### 2. Sync All Files

1. Navigate to the Dashboard
2. Click the "Sync All Files" button at the top of the table
3. Select the target systems (SPLP, SIPD, or both)
4. Click "Sync All Files"
5. Wait for the synchronization to complete
6. View the results in a toast notification

## Role Requirements

Only users with the following roles can access integration features:
- Admin
- Operator

## Data Requirements

Files must be verified before they can be synchronized with external systems. Unverified files will be skipped during bulk synchronization.

## Error Handling

If synchronization fails:
1. Check the error message in the results
2. Verify that the API keys and URLs are correct
3. Ensure the external systems are accessible
4. Check that the data meets the requirements of the external systems

## Monitoring

You can monitor synchronization status through:
1. Toast notifications for bulk operations
2. Modal dialogs for individual file operations
3. Console logs for detailed debugging information

## Troubleshooting

Common issues and solutions:

1. **Authentication errors**: Verify that the API keys are correct and have the necessary permissions
2. **Network errors**: Check that the API URLs are correct and the systems are accessible
3. **Data validation errors**: Ensure that all required fields are filled and meet the external system requirements
4. **Rate limiting**: If synchronizing many files, consider adding delays between requests

## Future Enhancements

Planned improvements:
1. Automatic synchronization scheduling
2. Enhanced error recovery mechanisms
3. Detailed synchronization logs
4. Conflict resolution for data discrepancies