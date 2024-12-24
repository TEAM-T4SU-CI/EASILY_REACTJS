import React from 'react';

const DefaultProfilePicture = ({ image }) => (
  <img
    className="profile-picture"
    src={image || 'https://via.placeholder.com/150'}
    alt="Photo de Profil"
  />
);

export default DefaultProfilePicture;
