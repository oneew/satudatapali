// backend/routes/sipdRoute.js
import express from 'express';
import { getSIPDData } from '../controller/sipdController.js';
import auth from '../connection/auth.js'; // Middleware autentikasi

const router = express.Router();

// Endpoint untuk mengambil data dari SIPD, hanya bisa diakses oleh user yang sudah login
router.get('/data', auth, getSIPDData);

export default router;