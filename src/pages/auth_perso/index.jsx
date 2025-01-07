import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase-config';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import '../auth_perso/style.css';
import apple from './apple.png';
import social from './social.png';

const PersonalInfoForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Vérifier l'état de l'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fonction pour gérer l'inscription avec email et mot de passe
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Créer l'utilisateur avec Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ajouter les informations utilisateur dans Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        uid: user.uid,
        createdAt: new Date(),
      });

      console.log('Utilisateur créé et enregistré avec succès dans Firestore !');
      
      // La redirection sera gérée par useEffect grâce à onAuthStateChanged
    } catch (err) {
      console.error('Erreur de création de l\'utilisateur :', err.message);
      setError(
        err.code === 'auth/email-already-in-use' 
          ? 'Cette adresse email est déjà utilisée.' 
          : 'Une erreur est survenue lors de l\'inscription.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour gérer la connexion avec Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Vérifie si un document existe déjà pour cet utilisateur
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        firstName: user.displayName?.split(' ')[0] || 'Google User',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      }, { merge: true });

      console.log('Connecté avec Google et Firestore mis à jour.');
      // La redirection sera gérée par useEffect
    } catch (err) {
      console.error('Erreur de connexion avec Google :', err.message);
      setError('Une erreur est survenue lors de la connexion avec Google.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour mettre à jour les informations utilisateur
  const handleUpdate = async () => {
    if (!firstName.trim() && !lastName.trim()) {
      setError('Veuillez remplir au moins un champ à mettre à jour.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Aucun utilisateur connecté.');
      }

      const userRef = doc(db, 'users', user.uid);
      const updateData = {};
      if (firstName.trim()) updateData.firstName = firstName;
      if (lastName.trim()) updateData.lastName = lastName;

      await updateDoc(userRef, updateData);
      console.log('Profil mis à jour avec succès dans Firestore !');
      alert('Informations mises à jour avec succès.');
    } catch (err) {
      console.error('Erreur de mise à jour du profil :', err.message);
      setError('Une erreur est survenue lors de la mise à jour du profil.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Informations personnelles</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénoms"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          minLength="6"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Chargement...' : 'S\'inscrire'}
        </button>
      </form>

      <div className="separator">ou</div>

      <div className="social-login">
        <button 
          className="google-btn" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <img src={social} alt="Google" />
          {isLoading ? 'Chargement...' : 'Continuer avec Google'}
        </button>
        <button className="apple-btn" disabled={isLoading}>
          <img src={apple} alt="Apple" />
          Continuer avec Apple
        </button>
      </div>

      <div className="update-section">
        <h2>Mettre à jour les informations</h2>
        <button onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;