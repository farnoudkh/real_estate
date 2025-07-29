import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignOutAlt, FaHeart, FaHome, FaBars, FaTimes, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Logo from "../assets/logo.png";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const desktopButtonRef = useRef(null);
    const desktopDropdownRef = useRef(null);
    const mobileButtonRef = useRef(null);
    const mobileDropdownRef = useRef(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideDesktop =
                (desktopButtonRef.current && desktopButtonRef.current.contains(event.target)) ||
                (desktopDropdownRef.current && desktopDropdownRef.current.contains(event.target));

            const isClickInsideMobile =
                (mobileButtonRef.current && mobileButtonRef.current.contains(event.target)) ||
                (mobileDropdownRef.current && mobileDropdownRef.current.contains(event.target));

            if (isDropdownOpen && !isClickInsideDesktop && !isClickInsideMobile) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isDropdownOpen]);

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
                            ref={desktopButtonRef}
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 bg-[rgb(223,198,103)] px-4 py-2 rounded-full text-[rgb(6,11,34)] font-semibold hover:bg-yellow-500 transition-all duration-300 ease-in-out"
                        >
                            <FaUserCircle className="text-xl" />
                            <span>My account</span>
                            {isDropdownOpen ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[rgb(223,198,103)] px-4 py-2 rounded-full text-[rgb(6,11,34)] font-semibold hover:bg-yellow-500 transition-all duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                    )}

                    {/* Dropdown Menu - Desktop */}
                    {user && isDropdownOpen && (
                        <div
                            ref={desktopDropdownRef}
                            className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden
                                        transform origin-top-right transition-all duration-200 ease-out scale-100 opacity-100
                                        animate-fade-in-up z-[9999]"
                        >
                            <Link to="/account" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-150">
                                <MdDashboard className="mr-3 text-lg text-gray-600" /> Settings
                            </Link>
                            {user.role === "realtor" ? (
                                <Link to="/properties" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-150">
                                    <FaHome className="mr-3 text-lg text-gray-600" /> My properties
                                </Link>
                            ) : (
                                <Link to="/favorites" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-150">
                                    <FaHeart className="mr-3 text-lg text-gray-600" /> Favorites
                                </Link>
                            )}
                            <div className="border-t border-gray-200 my-1"></div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 text-left hover:bg-red-50 hover:text-red-600 transition-colors duration-150 relative z-50"
                            >
                                <FaSignOutAlt className="mr-3 text-lg text-gray-600 group-hover:text-red-600" /> Logout
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
                    <Link to="/home" onClick={() => { toggleMobileMenu(); setIsDropdownOpen(false); }} className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        Home
                    </Link>
                    <Link to="/services" onClick={() => { toggleMobileMenu(); setIsDropdownOpen(false); }} className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        Services
                    </Link>
                    <Link to="/about" onClick={() => { toggleMobileMenu(); setIsDropdownOpen(false); }} className="text-gray-300 font-semibold hover:text-[rgb(223,198,103)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        Contact
                    </Link>

                    {/* User Account / Login for Mobile */}
                    {user ? (
                        <div className="relative w-full text-center">
                            <button
                                ref={mobileButtonRef}
                                onClick={toggleDropdown}
                                className="flex items-center justify-center space-x-2 bg-[rgb(223,198,103)] px-4 py-2 rounded-full text-[rgb(6,11,34)] font-semibold hover:bg-yellow-500 transition-all duration-300 ease-in-out mx-auto"
                            >
                                <FaUserCircle className="text-xl" />
                                <span>My account</span>
                                {isDropdownOpen ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
                            </button>

                            {/* Dropdown in Mobile */}
                            {isDropdownOpen && (
                                <div
                                    ref={mobileDropdownRef}
                                    className="mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden
                                                transform origin-top transition-all duration-200 ease-out scale-100 opacity-100
                                                animate-fade-in-up mx-auto"
                                >
                                    <Link to="/account" onClick={() => { toggleMobileMenu(); setIsDropdownOpen(false); }} className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-150">
                                        <MdDashboard className="mr-3 text-lg text-gray-600" /> Settings
                                    </Link>
                                    {user.role === "realtor" ? (
                                        <Link to="/properties" onClick={() => { toggleMobileMenu(); setIsDropdownOpen(false); }} className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-150">
                                            <FaHome className="mr-3 text-lg text-gray-600" /> My properties
                                        </Link>
                                    ) : (
                                        <Link to="/favorites" onClick={() => { toggleMobileMenu(); setIsDropdownOpen(false); }} className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-150">
                                            <FaHeart className="mr-3 text-lg text-gray-600" /> Favorites
                                        </Link>
                                    )}
                                    <div className="border-t border-gray-200 my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-3 text-left hover:bg-red-50 hover:text-red-600 transition-colors duration-150 relative z-50"
                                    >
                                        <FaSignOutAlt className="mr-3 text-lg text-gray-600 group-hover:text-red-600" /> Logout
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