import './index.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPerson from './pages/auth_perso/index.jsx';
import AuthTeleph from './pages/auth_tele/auth.jsx';
import LoadingPage from './pages/loading/index.jsx';
import HomePage from './pages/home/index.jsx';
import AutoTeleph from './pages/auth_tele/auteleph.jsx';

import ProfileHeader from './components/ProfileHeader';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileContent from './components/ProfileContent';
import Wallet from './pages/Wallet';
import OrderHistory from './pages/OrderHistory';
import Help from './pages/Help';
import EditProfile from './pages/EditProfile';
import DeleteAccount from './pages/DeleteAccount';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/personelauth" element={<AuthPerson />} />
        <Route path="/connexi" element={<AuthTeleph />} />
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/connx" element={<AutoTeleph />} />

        {/* Protected routes */}
        <Route
          path="*"
          element={
            <div className="app-container">
              <ProfileHeader />
              <div className="main-layout">
                <ProfileSidebar />
                <Routes>
                  <Route path="/" element={<ProfileContent />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/delete-account" element={<DeleteAccount />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
