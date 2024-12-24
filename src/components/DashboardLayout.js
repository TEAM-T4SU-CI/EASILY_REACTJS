import React from 'react';
import Navigation from './Navigation';

const DashboardLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <Navigation />
    <main className="flex-grow p-6 bg-gray-100">{children}</main>
  </div>
);

export default DashboardLayout;
