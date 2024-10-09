import React, { useState } from 'react'; // Ajout de useState
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import '../auth_perso/style.css';
import apple from './apple.png';
import social from './social.png';

const PersonalInfoForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre le formulaire
    console.log('Prénoms:', firstName);
    console.log('Nom:', lastName);
    console.log('Email:', email);

    // Rediriger vers la page d'accueil après la soumission
    navigate('/home'); // Remplacez '/home' par le chemin de votre page d'accueil
  };

  return (
    <div className="container">
      <h1>Informations personnelles</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénoms"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Adresse email (facultatif)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Valider</button>
      </form>

      <div className="separator">ou</div>

      <div className="social-login">
        <button className="google-btn">
          <img src={social} alt="Google" />
          Continuer avec Google
        </button>
        <button className="apple-btn">
          <img src={apple} alt="Apple" />
          Continuer avec Apple
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
