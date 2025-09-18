// frontend/src/pages/open data/Detail.jsx (Revised and ready to copy)

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// Perbaikan path impor ada di 2 baris berikut:
import Header from "../../shared/components/header/header";
import Footer from "../../shared/components/footer/footer";
import { Download, Eye, ArrowLeft, Calendar, User, FileText, Tag, Layers } from "lucide-react";

function Detail() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`/v1/files/${id}`);
        setFile(response.data);
      } catch (err) {
        setError("Gagal memuat detail data. Mungkin data tidak ditemukan.");
        console.error("Error fetching file details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Memuat data...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/opendata" className="flex items-center text-blue-600 hover:text-blue-800 font-semibold">
            <ArrowLeft size={18} className="mr-2" />
            Kembali ke Daftar Dataset
          </Link>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          {/* Judul dan Tombol Aksi */}
          <div className="flex flex-col md:flex-row justify-between md:items-start border-b pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{file.name}</h1>
              <p className="text-gray-500 mt-2">Dibuat pada: {new Date(file.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href={`/v1/download/${file._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Unduh
              </a>
              <a
                href={file.filePath.replace('public', '')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Eye size={16} className="mr-2" />
                Lihat
              </a>
            </div>
          </div>

          {/* Detail Metadata */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Metadata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-start">
                <User size={20} className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-600">Produsen Data</h3>
                  <p className="text-gray-800">{file.metaData.produsen}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Layers size={20} className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-600">Tema Dataset</h3>
                  <p className="text-gray-800">{file.temadataset}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Tag size={20} className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-600">Dimensi Dataset</h3>
                  <p className="text-gray-800">{file.metaData.dimensidataset}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar size={20} className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-600">Frekuensi Pembaruan</h3>
                  <p className="text-gray-800">{file.metaData.frekuensi}</p>
                </div>
              </div>
              <div className="flex items-start col-span-1 md:col-span-2">
                <FileText size={20} className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-600">Deskripsi</h3>
                  <p className="text-gray-800">{file.metaData.deskripsi}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Detail;