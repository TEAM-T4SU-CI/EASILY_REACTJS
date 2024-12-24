import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSidebar = () => (
  <aside className="profile-sidebar">
    <ul>
      <li><Link to="/">Mon Profil</Link></li>
      <li><Link to="/edit-profile">Modifier le Profil</Link></li>
      <li><Link to="/wallet">Porte-Monnaie</Link></li>
      <li><Link to="/order-history">Historique des Commandes</Link></li>
      <li><Link to="/help">Aide</Link></li>
      <li><Link to="/delete-account">Supprimer le Compte</Link></li>
    </ul>
  </aside>
);

export default ProfileSidebar;
