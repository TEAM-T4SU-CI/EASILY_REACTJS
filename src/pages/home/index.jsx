import React from 'react';
import '../home/style.css'; // Fichier CSS pour styliser la page d'accueil

function HomePage() {
  return (
    <div className="homepage-container">
      {/* Bannière d'accueil */}
      <header className="banner">
        <h1 className="restaurant-name">Bienvenue chez EasyResto</h1>
        <p className="tagline">Une expérience culinaire exceptionnelle vous attend</p>
        <button className="cta-button">Voir le Menu</button>
      </header>

      {/* Section des services */}
      <section className="services-section">
        <h2>Nos Services</h2>
        <div className="services">
          <div className="service">
            <img src="images/menu-icon.png" alt="Menu" className="service-icon" />
            <h3>Explorez notre Menu</h3>
            <p>Dégustez une variété de plats frais, préparés avec soin par nos chefs expérimentés.</p>
          </div>
          <div className="service">
            <img src="images/reservation-icon.png" alt="Réservation" className="service-icon" />
            <h3>Réservez une Table</h3>
            <p>Profitez d'une réservation facile en ligne et assurez-vous d'avoir une table à votre arrivée.</p>
          </div>
          <div className="service">
            <img src="images/order-icon.png" alt="Commande" className="service-icon" />
            <h3>Commandez en Ligne</h3>
            <p>Commandez vos plats préférés et faites-les livrer directement chez vous.</p>
          </div>
        </div>
      </section>

      {/* Section à propos */}
      <section className="about-section">
        <h2>À Propos de Nous</h2>
        <p>
          Chez <strong>EasyResto</strong>, nous croyons que chaque repas est une expérience unique. Nos chefs talentueux
          préparent des plats inspirés de la cuisine locale et internationale, tout en veillant à utiliser les meilleurs
          ingrédients pour satisfaire vos papilles.
        </p>
      </section>

      {/* Pied de page */}
      <footer className="footer">
        <p>&copy; 2024 EasyResto. Tous droits réservés.</p>
        <div className="social-icons">
          <a href="#"><img src="images/facebook-icon.png" alt="Facebook" /></a>
          <a href="#"><img src="images/instagram-icon.png" alt="Instagram" /></a>
          <a href="#"><img src="images/twitter-icon.png" alt="Twitter" /></a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
