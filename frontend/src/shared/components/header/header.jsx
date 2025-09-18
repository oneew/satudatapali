// frontend/src/shared/components/header/header.jsx (Revised)
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import sdiLogo from '/SDINDO.png';
import paliLogo from '/pali.png';
import { Menu, X } from 'lucide-react'; 

const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Dataset', path: '/opendata' },
    { name: 'Metadata', path: '/Metadata' },
    { name: 'Info Grafis', path: '/Grafis' },
    { name: 'Diseminasi', path: '/Diseminasi' },
];

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-3">
                            <img src={sdiLogo} alt="Satu Data Indonesia" className="h-12 w-auto" />
                            <img src={paliLogo} alt="Logo PALI" className="h-12 w-auto" />
                            <div className="hidden sm:block">
                                <span className="block text-base font-bold text-gray-800 leading-tight">Satu Data</span>
                                <span className="block text-xs font-bold text-gray-500 leading-tight">PALI</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigasi Desktop */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-base font-medium transition-colors duration-200 pb-1 border-b-2 ${
                                        isActive ? 'text-green-600 border-green-600' : 'text-gray-600 hover:text-green-600 border-transparent'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Tombol Login dan Menu Mobile */}
                    <div className="flex items-center">
                        <Link
                            to="/login"
                            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                        >
                            Login
                        </Link>
                        <div className="lg:hidden ml-4">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-green-600">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            {isOpen && (
                <nav className="lg:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md text-base font-medium ${
                                        isActive ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-left px-3 py-3 rounded-md text-base font-medium bg-green-600 text-white text-center"
                        >
                            Login
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;