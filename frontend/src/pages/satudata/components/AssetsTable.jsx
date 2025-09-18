// frontend/src/pages/satudata/components/AssetsTable.jsx (Revised)

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import EditFile from './EditFile';
import { Trash2, Edit, CheckCircle, XCircle, Clock, Search } from 'lucide-react';

function AssetsTable() {
  const [data, setData] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { role } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const response = await axios.get('/v1/dashboard/files');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus file ini?')) {
      try {
        await axios.delete(`/v1/files/delete/${id}`);
        fetchData(); // Refresh data after delete
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('Gagal menghapus file.');
      }
    }
  };

  const handleEdit = (file) => {
    setEditingFile(file);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingFile(null);
    fetchData(); // Refresh data after edit
  };
  
  const getStatusChip = (status) => {
    switch (status) {
      case 'Sudah Verifikasi':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={14} className="mr-1"/> Terverifikasi</span>;
      case 'Ditolak':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle size={14} className="mr-1"/> Ditolak</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock size={14} className="mr-1"/> Pending</span>;
    }
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.metaData.produsen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Aset Data</h2>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}/>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produsen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.metaData.produsen}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusChip(item.verifikasi)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                      <Edit size={16} /> Edit
                    </button>
                    {role === 'admin' && (
                      <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900 flex items-center gap-1">
                        <Trash2 size={16} /> Hapus
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && <p className="text-center py-4 text-gray-500">Data tidak ditemukan.</p>}
      </div>
      {showEditModal && <EditFile show={showEditModal} handleClose={handleCloseModal} fileData={editingFile} />}
    </div>
  );
}

export default AssetsTable;