import React from 'react';
import Logo from '../assets/logo.png'; // Assure-toi que le chemin du logo est correct

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Récupère l'année actuelle

    return (
        <footer className="text-gray-600 bg-gray-100 body-font" style={{ backgroundColor: 'rgb(6, 11, 34)' }}>
            <div className="container mx-auto py-10 px-5 text-center">
                <div className="flex justify-center">
                    <img 
                        src={Logo} 
                        alt="Logo" 
                        className="h-32 w-auto" 
                    />
                </div>

                <p className="text-gray-400 text-sm mb-5">
                    © {currentYear} Lumina Reality. All rights reserved.
                </p>

                <div className="flex justify-center space-x-4 text-[rgb(223,198,103)] text-sm">
                    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                    <a href="/terms-of-use" className="hover:underline">Terms of Use</a>
                    <a href="/legal-notice" className="hover:underline">Legal Notice</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
