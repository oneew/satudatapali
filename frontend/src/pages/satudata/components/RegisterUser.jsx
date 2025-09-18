// frontend/src/pages/satudata/components/RegisterUser.jsx (Revised)
import React, { useState } from 'react';
import axios from 'axios';
import { X, UserPlus } from 'lucide-react';

function RegisterUser({ show, handleClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    role: 'operator', // Default role
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post('/v1/users/register', formData);
      setMessage(response.data.message || 'Pengguna berhasil diregistrasi.');
      setFormData({ username: '', password: '', email: '', name: '', role: 'operator' }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal meregistrasi pengguna.');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center"><UserPlus className="mr-2"/> Registrasi Pengguna Baru</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
        </div>
        <div className="p-6">
          {message && <p className="mb-4 p-3 text-sm text-center rounded-md bg-green-50 text-green-700">{message}</p>}
          {error && <p className="mb-4 p-3 text-sm text-center rounded-md bg-red-50 text-red-700">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Peran (Role)</label>
              <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="operator">Operator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Registrasi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;