import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import Logo from '../assets/logo.png';

export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    const isActive = (pathname) => {
        return pathname === path;
    };

    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false); 
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen); 
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="text-gray-600 body-font" style={{ backgroundColor: 'rgb(6, 11, 34)' }}>
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Link
                        to="/home"
                    >
                        <img 
                            src={Logo} 
                            alt="Logo" 
                            className="h-32 w-auto" 
                        />
                    </Link>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link 
                        to="/home" 
                        className={`mr-5 hover:text-white ${isActive('/home') ? 'text-white' : 'text-[rgb(223,198,103)]'}`}
                    >
                        Accueil
                    </Link>
                    <Link 
                        to="/about" 
                        className={`mr-5 hover:text-white ${isActive('/about') ? 'text-white' : 'text-[rgb(223,198,103)]'}`}
                    >
                        A propos
                    </Link>
                    <Link 
                        to="/contactus" 
                        className={`mr-5 hover:text-white ${isActive('/contactus') ? 'text-white' : 'text-[rgb(223,198,103)]'}`}
                    >
                        Contactez-nous
                    </Link>

                    {user ? (
                        <div className="relative z-50">
                            <button 
                                onClick={toggleDropdown} 
                                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Mon compte
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg">
                                    <Link to="/account" className="block px-6 py-3 text-gray-800 hover:bg-gray-100">Paramètres du compte</Link>
                                    {user.role === 'realtor' ? (
                                        <Link to="/properties" className="block px-6 py-3 text-gray-800 hover:bg-gray-100">Mes biens</Link>
                                    ) : (
                                        <Link to="/favorites" className="block px-6 py-3 text-gray-800 hover:bg-gray-100">Mes favoris</Link>
                                    )}
                                    <hr />
                                    <button 
                                        onClick={handleLogout} 
                                        className="block w-full px-6 py-2 text-left text-gray-800 hover:bg-gray-100"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link 
                            to="/login" 
                            className={`mr-5 hover:text-white ${isActive('/login') ? 'text-white' : 'text-[rgb(223,198,103)]'}`}
                        >
                            Connexion
                        </Link>
                    )}
                </nav>
            </div>
        </header>

    );
}
