import ExternalIntegrationService from './services/externalIntegrationService.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Set __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testSipdConnection() {
  console.log('Testing SIPD API connection...');
  
  const integrationService = new ExternalIntegrationService();
  
  console.log('SIPD API URL:', integrationService.sipdApiUrl);
  console.log('SIPD API Key:', integrationService.sipdApiKey ? 'Loaded' : 'Not loaded');
  
  try {
    console.log('Fetching final data from SIPD with kodepemda 1612...');
    const result = await integrationService.fetchFinalFromSipd('1612');
    
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testSipdConnection();