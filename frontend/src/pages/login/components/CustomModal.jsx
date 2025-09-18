// frontend/src/pages/login/components/CustomModal.jsx (Revised and Final)

import React from 'react';
import { ShieldAlert } from 'lucide-react';

function CustomModal({ message, onClose }) {
  // Mencegah klik di dalam modal ikut menutup modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Latar belakang gelap
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Konten Modal */}
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all animate-fade-in-up"
        onClick={handleModalContentClick}
      >
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <ShieldAlert className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Terjadi Kesalahan
          </h3>
          <div className="mt-2 text-md text-gray-600 px-2">
            {message}
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300 shadow-md hover:shadow-lg"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;