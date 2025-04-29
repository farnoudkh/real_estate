import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaHeart, FaHome, FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Logo from "../assets/logo.png";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const handleLogout = () => logout();

    return (
        <header className="bg-[rgb(3,6,25)] text-gray-200 shadow-2xl sticky top-0 z-30">
            <div className="container mx-auto flex items-center justify-between p-4 md:p-5">
                {/* Logo */}
                <Link to="/home" className="flex items-center">
                    <img src={Logo} alt="Logo" className="h-32 md:h-32 lg:h-32 w-auto" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/home" className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        About
                    </Link>
                    <Link to="/contactus" className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        Contact
                    </Link>
                </nav>

                {/* User Account / Login */}
                <div className="hidden md:block relative">
                    {user ? (
                        <button 
                            onClick={toggleDropdown} 
                            className="flex items-center space-x-2 bg-[rgb(223,198,103)] px-4 py-2 rounded-full text-[rgb(6,11,34)] font-semibold hover:bg-yellow-500 transition-all duration-300 ease-in-out"
                        >
                            <FaUserCircle className="text-xl" />
                            <span>My account</span>
                        </button>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-[rgb(223,198,103)] px-4 py-2 rounded-full text-[rgb(6,11,34)] font-semibold hover:bg-yellow-500 transition-all duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                    )}

                    {/* Dropdown Menu */}
                    {user && isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200">
                            <Link to="/account" className="flex items-center px-4 py-3 hover:bg-gray-100">
                                <MdDashboard className="mr-2 text-lg" /> Settings
                            </Link>
                            {user.role === "realtor" ? (
                                <Link to="/properties" className="flex items-center px-4 py-3 hover:bg-gray-100">
                                    <FaHome className="mr-2 text-lg" /> My properties
                                </Link>
                            ) : (
                                <Link to="/favorites" className="flex items-center px-4 py-3 hover:bg-gray-100">
                                    <FaHeart className="mr-2 text-lg" /> Favorites
                                </Link>
                            )}
                            <hr />
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100"
                            >
                                <FaSignOutAlt className="mr-2 text-lg" /> Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={toggleMobileMenu} 
                    className="md:hidden text-[rgb(223,198,103)] text-3xl"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden bg-[rgb(6,11,34)] text-gray-200 absolute w-full transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "h-auto py-4" : "h-0 py-0"}`}>
                <nav className="flex flex-col items-center space-y-4">
                    <Link to="/home" onClick={toggleMobileMenu} className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        Home
                    </Link>
                    <Link to="/services" onClick={toggleMobileMenu} className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        Services
                    </Link>
                    <Link to="/about" onClick={toggleMobileMenu} className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        About
                    </Link>
                    <Link to="/contactus" onClick={toggleMobileMenu} className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        Contact
                    </Link>

                    {/* User Account / Login for Mobile */}
                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={toggleDropdown} 
                                className="flex items-center space-x-2 bg-[rgb(223,198,103)] px-4 py-2 rounded-full text-[rgb(6,11,34)] font-semibold hover:bg-yellow-500 transition-all duration-300 ease-in-out"
                            >
                                <FaUserCircle className="text-xl" />
                                <span>My account</span>
                            </button>

                            {/* Dropdown in Mobile */}
                            {isDropdownOpen && (
                                <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                    <Link to="/account" onClick={toggleMobileMenu} className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <MdDashboard className="mr-2 text-lg" /> Settings
                                    </Link>
                                    {user.role === "realtor" ? (
                                        <Link to="/properties" onClick={toggleMobileMenu} className="flex items-center px-4 py-3 hover:bg-gray-100">
                                            <FaHome className="mr-2 text-lg" /> My properties
                                        </Link>
                                    ) : (
                                        <Link to="/favorites" onClick={toggleMobileMenu} className="flex items-center px-4 py-3 hover:bg-gray-100">
                                            <FaHeart className="mr-2 text-lg" /> Favorites
                                        </Link>
                                    )}
                                    <hr />
                                    <button 
                                        onClick={() => { handleLogout(); toggleMobileMenu(); }} 
                                        className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100"
                                    >
                                        <FaSignOutAlt className="mr-2 text-lg" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link 
                            to="/login" 
                            onClick={toggleMobileMenu} 
                            className="bg-[rgb(223,198,103)] px-4 py-2 rounded-full text-[rgb(6,11,34)] font-semibold hover:bg-yellow-500 transition-all duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
