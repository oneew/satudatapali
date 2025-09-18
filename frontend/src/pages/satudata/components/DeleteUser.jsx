// frontend/src/pages/satudata/components/DeleteUser.jsx (Revised)

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { Trash2, X, Users, ShieldAlert, UserX } from 'lucide-react';

function DeleteUser({ show, handleClose }) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const { user: currentUser } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/v1/users');
      // Filter agar admin yang sedang login tidak bisa menghapus dirinya sendiri
      setUsers(response.data.filter(u => u.username !== currentUser));
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Gagal memuat daftar pengguna.');
    }
  };

  useEffect(() => {
    if (show) {
      fetchUsers();
    }
  }, [show, currentUser]);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini secara permanen?')) {
      try {
        const response = await axios.delete(`/v1/users/delete/${id}`);
        setMessage(response.data.message);
        fetchUsers(); // Refresh the user list
      } catch (error) {
        setMessage(error.response?.data?.message || 'Gagal menghapus pengguna.');
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center"><Users className="mr-2"/> Manajemen Pengguna</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {message && <p className="mb-4 p-3 text-sm text-center rounded-md bg-blue-50 text-blue-700">{message}</p>}
          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map(user => (
                  <li key={user._id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="text-md font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.username} - <span className="font-semibold capitalize">{user.role}</span></p>
                    </div>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                      title="Hapus Pengguna"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))
              ) : (
                <div className="text-center py-8">
                    <UserX className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak Ada Pengguna Lain</h3>
                    <p className="mt-1 text-sm text-gray-500">Hanya akun Anda yang terdaftar saat ini.</p>
                </div>
              )}
            </ul>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
            <div className="flex">
              <div className="py-1"><ShieldAlert size={20} className="mr-3" /></div>
              <div>
                <p className="font-bold">Perhatian!</p>
                <p className="text-sm">Menghapus pengguna adalah tindakan permanen dan tidak dapat dibatalkan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;