import React from 'react';

const OrderHistory = () => {
  const orders = [
    { id: 1, date: '2024-12-20', total: 25.99, status: 'Livrée' },
    { id: 2, date: '2024-12-18', total: 15.49, status: 'Annulée' },
  ];

  return (
    <section className="order-history-page">
      <h2>Historique des Commandes</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p>Commande #{order.id}</p>
              <p>Date : {order.date}</p>
              <p>Montant Total : {order.total}€</p>
              <p>Statut : {order.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune commande passée.</p>
      )}
    </section>
  );
};

export default OrderHistory;
