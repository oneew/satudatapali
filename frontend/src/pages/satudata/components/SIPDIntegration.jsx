// frontend/src/pages/satudata/components/SIPDIntegration.jsx (Revised)
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { Download, Loader2, Info } from 'lucide-react'; // Ikon untuk loading dan info

function SIPDIntegration() {
  const [sipdData, setSipdData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  const fetchSIPDData = async () => {
    setLoading(true);
    setError('');
    setSipdData([]);
    try {
      const response = await axios.get('/v1/sipd/data', {
        headers: {
          Authorization: `Bearer ${token}`
        }
        // Jika perlu, Anda bisa menambahkan parameter tahun di sini
        // params: { tahun: 2024 }
      });

      // API SIPD tampaknya membungkus data dalam properti "data"
      if (response.data && Array.isArray(response.data.data)) {
        setSipdData(response.data.data);
      } else {
        // Fallback jika struktur tidak terduga
        setSipdData([]);
        setError('Format data dari SIPD tidak sesuai atau tidak ada data yang diterima.');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mengambil data dari server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Integrasi Data SIPD</h2>
          <p className="text-sm text-gray-500">Menarik daftar referensi indikator data dari SIPD E-Walidata.</p>
        </div>
        <button
          onClick={fetchSIPDData}
          disabled={loading}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengambil Data...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Tarik Data Indikator
            </>
          )}
        </button>
      </div>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
      
      {!loading && sipdData.length === 0 && !error && (
        <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
          <Info className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Belum Ada Data</h3>
          <p className="mt-1 text-sm text-gray-500">Klik tombol "Tarik Data Indikator" untuk memulai.</p>
        </div>
      )}

      {/* Tabel untuk menampilkan data */}
      {sipdData.length > 0 && (
        <div className="overflow-x-auto mt-4 border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uraian Indikator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satuan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidang Urusan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sipdData.map((item) => (
                <tr key={item.kodeindikator} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">{item.uraian_indikator || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.satuan || '-'}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{item.bidangurusan || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'AKTIF' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.status}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SIPDIntegration;