// Simple test script to verify integration service
import ExternalIntegrationService from './services/externalIntegrationService.js';

// Mock file data for testing
const mockFileData = {
    _id: 'test-file-id',
    name: 'Test Dataset',
    temadataset: 'Economy',
    metaData: {
        produsen: 'Ministry of Finance',
        cakupandata: 'National',
        frekuensi: 'Annual',
        dimensidataset: 'Time Series',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    filename: 'test-data.xlsx',
    fileType: 'xlsx',
    isPublic: true,
    StatusVerifikasi: 'Sudah Verifikasi',
};

async function testIntegrationService() {
    console.log('Testing ExternalIntegrationService...');
    
    try {
        const service = new ExternalIntegrationService();
        console.log('✓ Service instantiated successfully');
        
        // Test data preparation
        const splpData = service.prepareSplpData(mockFileData);
        console.log('✓ SPLP data prepared successfully');
        console.log('SPLP Data:', JSON.stringify(splpData, null, 2));
        
        const sipdData = service.prepareSipdData(mockFileData);
        console.log('✓ SIPD data prepared successfully');
        console.log('SIPD Data:', JSON.stringify(sipdData, null, 2));
        
        console.log('All tests passed!');
    } catch (error) {
        console.error('Test failed:', error.message);
        console.error('Stack trace:', error.stack);
    }
}

// Run the test
testIntegrationService();