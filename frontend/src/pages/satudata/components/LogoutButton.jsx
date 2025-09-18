// frontend/src/pages/satudata/components/LogoutButton.jsx (Revised)

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { LogOut } from 'lucide-react'; // Menggunakan ikon dari Lucide

function LogoutButton({ isSidebarOpen }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-700 hover:text-white rounded-md transition-colors"
    >
      <LogOut className="h-6 w-6" />
      {isSidebarOpen && <span className="ml-4">Keluar</span>}
    </button>
  );
}

export default LogoutButton;