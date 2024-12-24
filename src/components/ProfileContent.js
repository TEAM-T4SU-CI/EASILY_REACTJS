import React from 'react';
import DefaultProfilePicture from './DefaultProfilePicture';

const ProfileContent = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: null, // Remplacer par une URL pour une photo personnalisée
  };

  return (
    <section className="profile-content">
      <DefaultProfilePicture image={user.profilePicture} />
      <h2>{user.name}</h2>
      <p>Email : {user.email}</p>
    </section>
  );
};

export default ProfileContent;
