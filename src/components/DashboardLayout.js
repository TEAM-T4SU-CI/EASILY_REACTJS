import React from 'react';
import Navigation from './Navigation';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barre de navigation */}
      <Navigation />

      {/* Contenu principal */}
      <main className="flex-grow p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
