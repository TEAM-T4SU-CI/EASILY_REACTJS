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
  ChevronDown,
} from 'lucide-react';

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSubmenu = (key) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const navItems = [
    {
      key: 'profile',
      icon: <User size={20} />,
      label: 'Profil',
      path: '/profil',
    },
    {
      key: 'settings',
      icon: <Settings size={20} />,
      label: 'Paramètres',
      path: '/edit-profile',
    },
    {
      key: 'wallet',
      icon: <CreditCard size={20} />,
      label: 'Portefeuille',
      path: '/wallet',
    },
    {
      key: 'activities',
      label: 'Activités',
      icon: <Mail size={20} />,
      children: [
        { key: 'history', label: 'Historique', path: '/order-history', icon: <History size={20} /> },
        { key: 'help', label: 'Aide', path: '/help', icon: <HelpCircle size={20} /> },
      ],
    },
    {
      key: 'account',
      label: 'Compte',
      icon: <Settings size={20} />,
      children: [
        { key: 'logout', label: 'Déconnexion', path: '/logout', icon: <LogOut size={20} /> },
      ],
    },
  ];

  const NavLink = ({ item, isMobileMenu = false }) => {
    const isActive = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.key];

    const baseClasses = `
      flex items-center gap-2 px-4 py-2 rounded-lg
      transition-all duration-300 ease-in-out
      font-medium text-sm
      ${isActive 
        ? 'bg-blue-50 text-blue-600 shadow-sm' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
      ${isMobileMenu ? 'w-full' : ''}
    `;

    const iconClasses = `
      transition-colors duration-300
      ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600'}
    `;

    if (hasChildren) {
      return (
        <div className="relative group">
          <button
            onClick={() => toggleSubmenu(item.key)}
            className={`${baseClasses} justify-between group`}
          >
            <span className="flex items-center gap-2">
              <span className={iconClasses}>{item.icon}</span>
              {item.label}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${iconClasses}`}
            />
          </button>
          {isExpanded && (
            <div className={`
              ${isMobileMenu 
                ? 'pl-4 mt-1 space-y-1' 
                : 'absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50 border border-gray-100'}
              transform origin-top transition-all duration-200 ease-out
            `}>
              {item.children.map((child) => (
                <Link
                  key={child.key}
                  to={child.path}
                  className={`${baseClasses} ${location.pathname === child.path ? 'bg-blue-50 text-blue-600' : ''} group`}
                >
                  <span className={iconClasses}>{child.icon}</span>
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link to={item.path} className={`${baseClasses} group`}>
        <span className={iconClasses}>{item.icon}</span>
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white text-black shadow-sm border-b border-gray-100 z-40 backdrop-blur-sm bg-white/90">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                Logo
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink key={item.key} item={item} />
              ))}
            </div>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <NavLink key={item.key} item={item} isMobileMenu={true} />
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
};

export default Navigation;