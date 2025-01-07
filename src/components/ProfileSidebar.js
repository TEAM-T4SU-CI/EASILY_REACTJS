import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const ProfileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { to: "/profil", label: "Mon Profil" },
    { to: "/edit-profile", label: "Modifier le Profil" },
    { to: "/wallet", label: "Porte-Monnaie" },
    { to: "/order-history", label: "Historique des Commandes" },
    { to: "/help", label: "Aide" },
    { to: "/delete-account", label: "Supprimer le Compte" },
    { to: "/home", label: "home"}
  ];

  return (
    <>
      {/* Bouton hamburger pour mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay sombre pour mobile lorsque le menu est ouvert */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-gray-800 text-white
          fixed top-0 left-0 z-40
          h-full w-64
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          
          /* Responsive styles */
          w-3/4 sm:w-64
          lg:relative lg:block
        `}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Mon Profil</h2>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default ProfileSidebar;