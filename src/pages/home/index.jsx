import React from 'react';
import '../../index';

import DashboardLayout from '../../components/DashboardLayout';
import IMga from '../../assets/1212.jpg'

const HomePage = () => (
  <DashboardLayout>
    <div className="space-y-8">
      {/* Bannière d'accueil */}
      <header className="bg-blue-600 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold leading-tight">Bienvenue chez EasyResto</h1>
        <p className="mt-2 text-lg md:text-xl">Une expérience culinaire exceptionnelle vous attend</p>
        <button className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-400 transition-colors">Voir le Menu</button>
      </header>

      {/* Section des services */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <img  alt="Menu" className="w-16 h-16 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold mt-4 text-center">Explorez notre Menu</h3>
            <p className="mt-2 text-center">Dégustez une variété de plats frais, préparés avec soin par nos chefs expérimentés.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <img  alt="Réservation" className="w-16 h-16 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold mt-4 text-center">Réservez une Table</h3>
            <p className="mt-2 text-center">Profitez d'une réservation facile en ligne et assurez-vous d'avoir une table à votre arrivée.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <img  alt="Commande" className="w-16 h-16 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold mt-4 text-center">Commandez en Ligne</h3>
            <p className="mt-2 text-center">Commandez vos plats préférés et faites-les livrer directement chez vous.</p>
          </div>
        </div>
      </section>

      {/* Section à propos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">À Propos de Nous</h2>
        <p className="text-lg">
          Chez <strong>EasyResto</strong>, nous croyons que chaque repas est une expérience unique. Nos chefs talentueux
          préparent des plats inspirés de la cuisine locale et internationale, tout en veillant à utiliser les meilleurs
          ingrédients pour satisfaire vos papilles.
        </p>
      </section>
    </div>
  </DashboardLayout>
);

export default HomePage;
