import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Importer le fichier CSS

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Délai de 3 secondes avant de rediriger vers la page d'accueil
    const timer = setTimeout(() => {
      navigate('/connx'); // Redirection vers la page d'accueil ("/home")
    }, 3000);

    // Nettoyage du timer pour éviter une fuite de mémoire
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="body-load">
      <main className="loading">
        <span className="letter">E</span>
        <span className="letter">a</span>
        <span className="letter">s</span>
        <span className="letter">i</span>
        <span className="letter">l</span>
        <span className="letter">y</span>
      </main>
    </div>
  );
}

export default LoadingPage;

