// frontend/src/pages/satudata/components/EditFile.jsx (Final Revised Version)
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { X, Save, ShieldAlert } from 'lucide-react';

function EditFile({ show, handleClose, fileData }) {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { role } = useContext(AuthContext);

  useEffect(() => {
    if (fileData) {
      setFormData({
        name: fileData.name || '',
        verifikasi: fileData.verifikasi || 'Belum Verifikasi',
        // Tambahkan field lain jika ada yang bisa diedit
      });
    }
  }, [fileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      // API untuk mengedit data
      await axios.put(`/v1/files/edit/${fileData._id}`, { name: formData.name });

      // API terpisah untuk verifikasi/penolakan jika role adalah admin/operator
      if (role === 'admin' || role === 'operator') {
        if (formData.verifikasi === 'Sudah Verifikasi') {
          await axios.post(`/v1/files/verify/${fileData._id}`);
        } else if (formData.verifikasi === 'Ditolak') {
          await axios.post(`/v1/files/reject/${fileData._id}`);
        }
      }
      
      setMessage('Data berhasil diperbarui!');
      setTimeout(() => {
        handleClose();
      }, 1500); // Tutup modal setelah 1.5 detik

    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui data.');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Edit Data Aset</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {message && <p className="p-3 text-sm text-center rounded-md bg-green-50 text-green-700">{message}</p>}
            {error && <p className="p-3 text-sm text-center rounded-md bg-red-50 text-red-700">{error}</p>}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Data</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {(role === 'admin' || role === 'operator') && (
              <div>
                <label htmlFor="verifikasi" className="block text-sm font-medium text-gray-700">Status Verifikasi</label>
                <select
                  id="verifikasi"
                  name="verifikasi"
                  value={formData.verifikasi}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Belum Verifikasi</option>
                  <option>Sudah Verifikasi</option>
                  <option>Ditolak</option>
                </select>
              </div>
            )}
            
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
              <div className="flex">
                <div className="py-1"><ShieldAlert size={20} className="mr-3" /></div>
                <div>
                  <p className="font-bold">Info</p>
                  <p className="text-sm">Saat ini hanya nama data dan status verifikasi yang dapat diubah.</p>
                </div>
              </div>
            </div>

          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-end">
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save size={16} className="mr-2" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFile;