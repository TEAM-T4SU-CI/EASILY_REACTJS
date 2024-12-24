import React from 'react';

const Wallet = () => {
  const balance = 50; // Exemple de solde

  return (
    <section className="wallet-page">
      <h2>Porte-Monnaie</h2>
      <p>Votre solde actuel : <strong>{balance}€</strong></p>
      <button>Recharger mon solde</button>
    </section>
  );
};

export default Wallet;
