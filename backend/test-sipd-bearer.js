import ExternalIntegrationService from './services/externalIntegrationService.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Set __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testSipdBearer() {
  console.log('Testing SIPD API with Bearer Token Authentication...');
  
  const integrationService = new ExternalIntegrationService();
  
  console.log('SIPD API URL:', integrationService.sipdApiUrl);
  console.log('SIPD Bearer Token:', integrationService.sipdBearerToken ? 'Loaded' : 'Not loaded');
  
  // Test get_dssd
  try {
    console.log('\n--- Testing get_dssd ---');
    const result1 = await integrationService.fetchFromSipd('1612');
    console.log('get_dssd Result:', JSON.stringify(result1, null, 2));
  } catch (error) {
    console.error('get_dssd Error:', error);
  }
  
  // Test get_dssd_final
  try {
    console.log('\n--- Testing get_dssd_final ---');
    const result2 = await integrationService.fetchFinalFromSipd('1612');
    console.log('get_dssd_final Result:', JSON.stringify(result2, null, 2));
  } catch (error) {
    console.error('get_dssd_final Error:', error);
  }
  
  // Test get_ref_dssd
  try {
    console.log('\n--- Testing get_ref_dssd ---');
    const result3 = await integrationService.fetchReferenceFromSipd('1612');
    console.log('get_ref_dssd Result:', JSON.stringify(result3, null, 2));
  } catch (error) {
    console.error('get_ref_dssd Error:', error);
  }
}

testSipdBearer();