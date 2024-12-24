import React from 'react';

const DeleteAccount = () => {
  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      alert('Compte supprimé avec succès.');
      // Ajouter la logique pour supprimer le compte
    }
  };

  return (
    <section className="delete-account-page">
      <h2>Supprimer le Compte</h2>
      <p>
        Attention : Cette action est irréversible. Toutes vos données seront supprimées.
      </p>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Supprimer mon compte
      </button>
    </section>
  );
};

export default DeleteAccount;
