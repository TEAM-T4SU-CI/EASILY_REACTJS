import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { path: '/', label: 'Mon Profil' },
    { path: '/edit-profile', label: 'Modifier le Profil' },
    { path: '/wallet', label: 'Porte-Monnaie' },
    { path: '/order-history', label: 'Historique des Commandes' },
    { path: '/help', label: 'Aide' },
    { path: '/delete-account', label: 'Supprimer le Compte' }
  ];

  return (
    <div className="relative">
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 flex justify-between items-center p-4">
        <span className="text-white font-semibold">Menu</span>
        <button 
          onClick={toggleMenu}
          className="text-white hover:bg-gray-700 p-2 rounded-lg transition-colors"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside className={`
        fixed md:static
        top-0 left-0
        h-full w-64
        bg-gray-800 text-white
        transition-transform duration-300 ease-in-out
        md:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isMobile ? 'pt-16' : 'pt-6'}
        z-40
      `}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav>
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Navigation;