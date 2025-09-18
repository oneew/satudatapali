// frontend/src/pages/satudata/components/QuickAccessCard.jsx (Revised)

import React from 'react';

// Terima 'icon' sebagai komponen, bukan string
function QuickAccessCard({ title, value, icon: Icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`p-3 rounded-full text-white ${colorClasses[color] || 'bg-gray-500'}`}>
        {/* Render komponen ikon di sini */}
        {Icon && <Icon size={24} />}
      </div>
    </div>
  );
}

export default QuickAccessCard;