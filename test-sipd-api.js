/**
 * Test script for SIPD E-Walidata API integration
 * This script demonstrates how to use the integration service directly
 */

import ExternalIntegrationService from './backend/services/externalIntegrationService.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize the integration service
const integrationService = new ExternalIntegrationService();

// Sample data for testing
const sampleFileData = {
    _id: 'test-dataset-001',
    name: 'Test Dataset for SIPD Integration',
    temadataset: 'Economy',
    metaData: {
        produsen: 'Ministry of Finance',
        cakupandata: 'National',
        frekuensi: 'Annual',
        dimensidataset: 'Time Series',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
    },
    filename: 'test-data.xlsx',
    fileType: 'xlsx',
    isPublic: true,
    StatusVerifikasi: 'Sudah Verifikasi',
};

async function testSipdIntegration() {
    console.log('Testing SIPD E-Walidata API Integration...\n');
    
    try {
        // Test 1: Prepare SIPD data
        console.log('1. Preparing SIPD data...');
        const sipdData = integrationService.prepareSipdData(sampleFileData);
        console.log('✅ SIPD data prepared successfully');
        console.log('Sample SIPD data:', JSON.stringify(sipdData, null, 2));
        
        // Test 2: Validate SIPD data
        console.log('\n2. Validating SIPD data...');
        const validation = integrationService.validateSipdData(sipdData);
        if (validation.isValid) {
            console.log('✅ SIPD data validation passed');
        } else {
            console.log('❌ SIPD data validation failed:', validation.errors);
            return;
        }
        
        // Test 3: Send data to SIPD (this will actually make an API call)
        console.log('\n3. Sending data to SIPD (mock call - will fail without valid API key)...');
        try {
            const result = await integrationService.sendToSipd(sipdData);
            console.log('Result:', JSON.stringify(result, null, 2));
        } catch (error) {
            console.log('Expected error (without valid API key):', error.message);
        }
        
        // Test 4: Fetch reference data from SIPD
        console.log('\n4. Fetching reference data from SIPD (mock call - will fail without valid API key)...');
        try {
            const refResult = await integrationService.fetchReferenceFromSipd('1612');
            console.log('Reference data result:', JSON.stringify(refResult, null, 2));
        } catch (error) {
            console.log('Expected error (without valid API key):', error.message);
        }
        
        console.log('\n✅ SIPD integration tests completed');
        
    } catch (error) {
        console.error('❌ Error during SIPD integration tests:', error.message);
        console.error('Stack trace:', error.stack);
    }
}

// Run the tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    testSipdIntegration();
}

export { testSipdIntegration };