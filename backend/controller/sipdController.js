// backend/controller/sipdController.js
import axios from 'axios';

export const getSIPDData = async (req, res) => {
  try {
    // Ambil parameter dari query URL, default ke nilai yang sudah ada jika tidak disediakan
    const kodepemda = req.query.kodepemda || '1612';
    const tahun = req.query.tahun || new Date().getFullYear(); // Default ke tahun ini

    const apiUrl = `${process.env.SIPD_API_URL}/get_dssd_final?kodepemda=${kodepemda}&tahun=${tahun}`;
    
    const response = await axios.get(apiUrl, {
      headers: {
        // Gunakan Bearer Token untuk autentikasi
        'Authorization': `Bearer ${process.env.SIPD_BEARER_TOKEN}`
      }
    });

    // Kirim data yang berhasil didapat sebagai respons
    res.status(200).json(response.data);

  } catch (error) {
    // Tangani error jika terjadi
    console.error('Error fetching data from SIPD:', error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Gagal mengambil data dari server SIPD.';
    res.status(status).json({ message });
  }
};