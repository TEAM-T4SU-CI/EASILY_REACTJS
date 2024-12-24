import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ProfileContent from '../components/ProfileContent';
import Wallet from './Wallet';
import OrderHistory from './OrderHistory';
import Help from './Help';
import EditProfile from './EditProfile';
import DeleteAccount from './DeleteAccount';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<ProfileContent />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/help" element={<Help />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
