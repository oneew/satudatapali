import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import App from './App.jsx';
import './index.css';

// 1. Definisikan tema kustom
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f2f2',
      100: '#b3d9d9',
      200: '#80bfbf',
      300: '#4da6a6',
      400: '#1a8c8c',
      500: '#007373', // Warna utama (mirip biru-hijau di referensi)
      600: '#005c5c',
      700: '#004545',
      800: '#002e2e',
      900: '#001717',
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Terapkan tema ke ChakraProvider */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);