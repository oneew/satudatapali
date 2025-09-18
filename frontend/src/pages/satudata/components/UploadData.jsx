// frontend/src/pages/satudata/components/UploadData.jsx (Revised)
import React, { useState } from 'react';
import axios from 'axios';
import { X, UploadCloud, FileUp } from 'lucide-react';
import listPerangkatDaerah from './pilihan form upload data/ListPerangkatDaerah';
import listTemaDataset from './pilihan form upload data/ListTemaDataset';

function UploadData({ show, handleClose }) {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    temadataset: '',
    produsen: '',
    deskripsi: '',
    frekuensi: '',
    dimensidataset: '',
    cakupandata: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Silakan pilih file untuk diunggah.');
      return;
    }

    const data = new FormData();
    data.append('file', file);
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('/v1/files/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
      // Reset form on success
      setFile(null);
      setFormData({ name: '', temadataset: '', produsen: '', deskripsi: '', frekuensi: '', dimensidataset: '', cakupandata: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal mengunggah file.');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center"><FileUp className="mr-2"/> Unggah Data Baru</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          {message && <p className="mb-4 p-3 text-sm text-center rounded-md bg-blue-50 text-blue-700">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nama Data */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Data</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              {/* Produsen Data */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Produsen Data (OPD)</label>
                <select name="produsen" value={formData.produsen} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Pilih OPD</option>
                  {listPerangkatDaerah.map(opd => <option key={opd} value={opd}>{opd}</option>)}
                </select>
              </div>
              {/* Tema Dataset */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Tema Dataset</label>
                <select name="temadataset" value={formData.temadataset} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Pilih Tema</option>
                  {listTemaDataset.map(tema => <option key={tema} value={tema}>{tema}</option>)}
                </select>
              </div>
              {/* Frekuensi Pembaruan */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Frekuensi Pembaruan</label>
                <input type="text" name="frekuensi" value={formData.frekuensi} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
              </div>
            </div>
            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea name="deskripsi" value={formData.deskripsi} onChange={handleInputChange} rows="3" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pilih File</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Pilih sebuah file</span>
                      <input id="file-upload" name="file" type="file" onChange={handleFileChange} className="sr-only" required />
                    </label>
                    <p className="pl-1">atau tarik dan lepas di sini</p>
                  </div>
                  {file ? <p className="text-sm text-gray-500">{file.name}</p> : <p className="text-xs text-gray-500">PDF, DOCX, XLSX, dll.</p>}
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Unggah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadData;