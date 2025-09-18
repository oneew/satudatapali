import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../shared/components/header/header';
import Footer from '../../shared/components/footer/footer';
import bgImage from '../../shared/images/bg3.jpg';
import { Database, Search, Building, Users, BookCheck, HeartPulse, Leaf, Truck, Landmark, Wallet, Construction } from 'lucide-react';

const datasetGroups = [
  { name: 'Pendidikan', icon: BookCheck, theme: 'pendidikan' },
  { name: 'Kesehatan', icon: HeartPulse, theme: 'kesehatan' },
  { name: 'Pemerintahan', icon: Landmark, theme: 'pemerintahan' },
  { name: 'Lingkungan Hidup', icon: Leaf, theme: 'lingkungan' },
  { name: 'Transportasi', icon: Truck, theme: 'transportasi' },
  { name: 'Sosial', icon: Users, theme: 'sosial' },
  { name: 'Ekonomi', icon: Wallet, theme: 'ekonomi' },
  { name: 'Infrastruktur', icon: Construction, theme: 'infrastruktur' },
];

function Home() {
    const [stats, setStats] = useState({ datasets: 0, opd: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/v1/files');
                const verifiedFiles = response.data.filter(file => file.verifikasi === 'Sudah Verifikasi');
                const uniqueOpd = [...new Set(verifiedFiles.map(file => file.metaData.produsen))];
                setStats({
                    datasets: verifiedFiles.length,
                    opd: uniqueOpd.length,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/opendata?search=${searchTerm}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow">
                <section className="relative bg-cover bg-center text-white" style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className="absolute inset-0 bg-green-900 bg-opacity-70"></div>
                    <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Portal Resmi Satu Data Kabupaten PALI
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                            Temukan data sektoral yang akurat, mutakhir, dan terintegrasi untuk mendukung perencanaan pembangunan.
                        </p>
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Apa yang ini kamu cari ?"
                                    className="w-full py-4 pl-6 pr-16 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-300"
                                />
                                <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <div className="p-2.5 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors">
                                        <Search size={24} />
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                 <section className="relative -mt-16 z-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <StatCard icon={Database} value={stats.datasets} label="Dataset" />
                            <StatCard icon={Building} value={stats.opd} label="Instansi" />
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Jelajahi Berdasarkan Topik</h2>
                        <p className="text-gray-600 mt-2 mb-12">Temukan data yang relevan dengan kebutuhan Anda melalui kategori berikut.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {datasetGroups.map(group => (
                                <Link key={group.name} to={`/opendata?group=${group.theme}`} className="group">
                                    <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                        <group.icon className="h-12 w-12 mx-auto text-green-600" />
                                        <h3 className="mt-4 font-semibold text-gray-700 group-hover:text-green-800">{group.name}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

const StatCard = ({ icon: Icon, value, label }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
        <div className="bg-green-100 p-4 rounded-lg">
            <Icon className="h-8 w-8 text-green-600" />
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className="text-gray-500">{label}</p>
        </div>
    </div>
);

export default Home;