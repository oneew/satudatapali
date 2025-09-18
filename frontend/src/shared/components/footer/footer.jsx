import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import paliLogo from '/pali.png'; // Menggunakan logo PALI

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img src={paliLogo} alt="Satu Data PALI" className="h-16 w-18 mr-4" />
              <div>
                <h2 className="text-xl font-bold text-white">Portal Satu Data</h2>
                <p className="text-gray-400">Kabupaten Penukal Abab Lematang Ilir</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Diselenggarakan oleh Dinas Komunikasi dan Informatika (Diskominfo-Staper) Kabupaten PALI sebagai platform resmi data terpadu untuk mendukung kebijakan berbasis data.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h3>
            <address className="not-italic text-gray-400 space-y-3">
              <p className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-green-400" />
                <span>Jl. Merdeka, Talang Ubi, Kabupaten PALI, Sumatera Selatan</span>
              </p>
              <p className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0 text-green-400" />
                <span>(0713) 390-123 (Contoh)</span>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0 text-green-400" />
                <span>diskominfo@palikab.go.id</span>
              </p>
            </address>
          </div>
        </div>
      </div>
      <div className="bg-gray-900">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500 text-sm">
          &copy; {currentYear} Dinas Komunikasi dan Informatika Kabupaten PALI.
        </div>
      </div>
    </footer>
  );
}

export default Footer;