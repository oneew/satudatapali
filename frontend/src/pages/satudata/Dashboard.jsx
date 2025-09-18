// frontend/src/pages/satudata/Dashboard.jsx (Modern Clean UI)
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useDashboardData from '../../hooks/useDashboardData';
import {
  Upload, UserPlus, Users, FileCheck2, FileX2, FileClock,
  Database, DatabaseZap
} from 'lucide-react';

import LogoutButton from './components/LogoutButton';
import QuickAccessCard from './components/QuickAccessCard';
import UploadData from './components/UploadData';
import RegisterUser from './components/RegisterUser';
import DeleteUser from './components/DeleteUser';
import AssetsTable from './components/AssetsTable';
import SIPDIntegration from './components/SIPDIntegration';

function Dashboard() {
  const { user, role } = useContext(AuthContext);
  const { stats, loading } = useDashboardData();
  const [activeModal, setActiveModal] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const safeStats = stats || { totalFiles: 0, verified: 0, rejected: 0, pending: 0 };

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const getSidebarMenu = () => {
    const baseMenu = [
      { name: 'Upload Data', icon: Upload, modal: 'upload', roles: ['operator', 'admin'] }
    ];
    const adminMenu = [
      { name: 'Registrasi User', icon: UserPlus, modal: 'register', roles: ['admin'] },
      { name: 'Manajemen User', icon: Users, modal: 'deleteUser', roles: ['admin'] }
    ];
    return role === 'admin' ? [...baseMenu, ...adminMenu] : baseMenu;
  };

  const sidebarMenu = getSidebarMenu();

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        <div className="flex items-center justify-center h-20 border-b">
          <DatabaseZap className="h-8 w-8 text-blue-500" />
          {isSidebarOpen && <span className="ml-3 text-xl font-bold text-gray-800">Satu Data</span>}
        </div>
        <nav className="flex-grow px-3 py-6 space-y-2">
          {sidebarMenu.map((item) => (
            <button
              key={item.name}
              onClick={() => openModal(item.modal)}
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
            >
              <item.icon className="h-6 w-6" />
              {isSidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t">
          <LogoutButton isSidebarOpen={isSidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                         d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="flex items-center space-x-3">
            <span className="hidden sm:block font-medium text-gray-700">Selamat datang, {user}!</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow">
              {user?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <QuickAccessCard title="Total Data" value={loading ? '...' : safeStats.totalFiles} icon={Database} color="blue" />
            <QuickAccessCard title="Sudah Verifikasi" value={loading ? '...' : safeStats.verified} icon={FileCheck2} color="green" />
            <QuickAccessCard title="Ditolak" value={loading ? '...' : safeStats.rejected} icon={FileX2} color="red" />
            <QuickAccessCard title="Belum Verifikasi" value={loading ? '...' : safeStats.pending} icon={FileClock} color="yellow" />
          </div>

          {/* Integrasi SIPD (Admin Only) */}
          {role === 'admin' && (
            <div className="mb-12">
              <SIPDIntegration />
            </div>
          )}

          {/* Data Aset Table */}
          <div className="bg-white rounded-2xl shadow p-6">
            <AssetsTable />
          </div>
        </main>
      </div>

      {/* Modals */}
      {activeModal === 'upload' && <UploadData show={true} handleClose={closeModal} />}
      {activeModal === 'register' && <RegisterUser show={true} handleClose={closeModal} />}
      {activeModal === 'deleteUser' && <DeleteUser show={true} handleClose={closeModal} />}
    </div>
  );
}

export default Dashboard;
