import React, { useState } from 'react';

const EditProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profil mis à jour avec succès !');
  };

  return (
    <section className="edit-profile-page">
      <h2>Modifier le Profil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <label>Email :</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </section>
  );
};

export default EditProfile;
