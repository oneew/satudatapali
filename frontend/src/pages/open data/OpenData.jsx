import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../shared/components/header/header';
import Footer from '../../shared/components/footer/footer';
import { Database, Building, Info, Search } from 'lucide-react';
import listPerangkatDaerah from '../satudata/components/pilihan form upload data/ListPerangkatDaerah';

function OpenData() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedOPD, setSelectedOPD] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(searchParams.get('group') || '');

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/v1/files');
                const verifiedFiles = response.data.filter(file => file.verifikasi === 'Sudah Verifikasi');
                setFiles(verifiedFiles);
            } catch (error) {
                console.error("Error fetching files:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, []);

    const filteredFiles = files.filter(file => {
        const searchMatch = searchTerm === '' || 
            file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            file.metaData.produsen.toLowerCase().includes(searchTerm.toLowerCase());

        const opdMatch = selectedOPD === '' || file.metaData.produsen === selectedOPD;

        const groupMatch = selectedGroup === '' || file.temadataset.toLowerCase().includes(selectedGroup.toLowerCase());

        return searchMatch && opdMatch && groupMatch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Pencarian Dataset</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari berdasarkan nama dataset atau OPD..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                        </div>
                        <select
                            id="opd"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={selectedOPD}
                            onChange={(e) => setSelectedOPD(e.target.value)}
                        >
                            <option value="">Filter Berdasarkan OPD</option>
                            {listPerangkatDaerah.map(opd => (
                                <option key={opd} value={opd}>{opd}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <p className="text-gray-600 mb-4">Menampilkan <strong>{filteredFiles.length}</strong> dari <strong>{files.length}</strong> dataset yang tersedia.</p>
                    {loading ? (
                        <p>Memuat data...</p>
                    ) : filteredFiles.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFiles.map((file) => (
                                <div key={file._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300">
                                    <Link to={`/opendata/${file._id}`} className="block group">
                                        <div className="flex flex-col sm:flex-row sm:items-start">
                                            <div className="bg-green-100 p-3 rounded-lg mr-4 mb-3 sm:mb-0">
                                                <Database className="h-6 w-6 text-green-600"/>
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-700">{file.name}</h2>
                                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                                    <Building size={14} className="mr-2"/> {file.metaData.produsen}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{file.metaData.deskripsi}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-md">
                            <Info className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Data Tidak Ditemukan</h3>
                            <p className="mt-1 text-sm text-gray-500">Silakan coba kata kunci atau filter yang berbeda.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default OpenData;