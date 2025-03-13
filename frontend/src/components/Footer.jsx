import React from 'react';
import Logo from '../assets/logo.png';

const Footer = () => {
  return (

    <footer className="mt-10 text-gray-600 bg-gray-100 body-font" style={{ backgroundColor: 'rgb(6, 11, 34)' }}>
        <div className="container mx-auto py-10 px-5 text-center">
            <div className="flex justify-center">
                <img 
                    src={Logo} 
                    alt="Logo" 
                    className="h-32 w-auto" 
                />
            </div>

            <p className="text-gray-400 text-sm mb-5">
                © 2024 Lumina Reality. Tous droits réservés.
            </p>

            <div className="flex justify-center space-x-4 text-[rgb(223,198,103)] text-sm">
                <a href="/privacy-policy" className="hover:underline">Politique de confidentialité</a>
                <a href="/terms-of-use" className="hover:underline">Termes d'utilisation</a>
                <a href="/legal-notice" className="hover:underline">Mentions légales</a>
            </div>
        </div>
    </footer>

  );
};

export default Footer;
