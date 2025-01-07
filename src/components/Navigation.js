import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  CreditCard, 
  Mail, 
  HelpCircle, 
  History, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedItems, setExpandedItems] = useState({});
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  const toggleSubmenu = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const navItems = [
    {
      key: 'profile',
      icon: <User size={20} />,
      label: 'Profil',
      path: '/profil'
    },
    {
      key: 'settings',
      icon: <Settings size={20} />,
      label: 'Paramètres',
      path: '/edit-profile'
    },
    {
      key: 'wallet',
      icon: <CreditCard size={20} />,
      label: 'Portefeuille',
      path: '/wallet'
    },
    {
      key: 'activities',
      label: 'Activités',
      icon: <Mail size={20} />,
      children: [
        { key: 'history', label: 'Historique', path: '/order-history', icon: <History size={20} /> },
        { key: 'help', label: 'Aide', path: '/help', icon: <HelpCircle size={20} /> }
      ]
    },
    {
      key: 'account',
      label: 'Compte',
      icon: <Settings size={20} />,
      children: [
        { key: 'logout', label: 'Déconnexion', path: '/logout', icon: <LogOut size={20} /> }
      ]
    }
  ];

  const NavLink = ({ item, depth = 0 }) => {
    const isActive = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.key];
    
    return (
      <li>
        {item.path ? (
          <Link
            to={item.path}
            className={`
              flex items-center py-2 px-4 rounded-lg transition-colors
              ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}
              ${depth > 0 ? 'ml-6' : ''}
            `}
            onClick={() => isMobile && setIsOpen(false)}
          >
            {item.icon && <span className="mr-3">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
          </Link>
        ) : (
          <button
            onClick={() => toggleSubmenu(item.key)}
            className={`
              w-full flex items-center py-2 px-4 rounded-lg transition-colors
              hover:bg-gray-700 text-left
            `}
          >
            {item.icon && <span className="mr-3">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            <ChevronDown
              size={16}
              className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
        
        {hasChildren && isExpanded && (
          <ul className="mt-1 space-y-1">
            {item.children.map(child => (
              <NavLink key={child.key} item={child} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="relative h-full">
      {/* Bouton menu mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-800 flex items-center justify-between px-4 z-50">
        <span className="text-white font-semibold">Menu</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-200 hover:bg-gray-700 rounded-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-gray-800 text-gray-100
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isMobile ? 'pt-16' : ''}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Dashboard</h2>
          </div>
          
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {navItems.map(item => (
                <NavLink key={item.key} item={item} />
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay pour mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Navigation;