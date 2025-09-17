import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Set __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testSipdDirect() {
  console.log('Testing SIPD API connection directly...');
  
  // Get environment variables
  const sipdApiUrl = process.env.SIPD_API_URL || 'https://sipd.go.id/ewalidata/serv';
  const sipdApiKey = process.env.SIPD_API_KEY || 'f382e18190ff14aa1d2771f489f4fb93';
  const kodepemda = '1612';
  
  console.log('SIPD API URL:', sipdApiUrl);
  console.log('SIPD API Key:', sipdApiKey ? 'Loaded' : 'Not loaded');
  console.log('Kodepemda:', kodepemda);
  
  const url = `${sipdApiUrl}/get_dssd_final?key=${sipdApiKey}&kodepemda=${encodeURIComponent(kodepemda)}`;
  console.log('Full URL:', url);
  
  try {
    console.log('Making request to SIPD API...');
    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Satu-Data-Pali-Test/1.0'
      }
    });
    
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data (first 1000 chars):', JSON.stringify(response.data, null, 2).substring(0, 1000));
  } catch (error) {
    console.error('Error connecting to SIPD API:');
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
}

testSipdDirect();