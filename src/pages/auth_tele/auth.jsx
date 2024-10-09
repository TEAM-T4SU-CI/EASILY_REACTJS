import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import '../auth_tele/style.css';

const ConfirmationPage = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate(); // Initialiser useNavigate

  // Fonction pour gérer le changement des entrées du code
  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus sur l'input suivant si l'utilisateur entre un chiffre
      if (value && index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  // Fonction pour gérer le clic sur les boutons du pavé numérique
  const handleNumpadClick = (number) => {
    const firstEmptyIndex = code.findIndex((digit) => digit === '');
    if (firstEmptyIndex !== -1) {
      handleInputChange(firstEmptyIndex, number);
    }
  };

  // Fonction pour gérer le renvoi du code
  const handleResendCode = () => {
    setCode(['', '', '', '']); // Réinitialiser le code
    setTimer(30); // Réinitialiser le timer
  };

  // Démarrer le timer pour le renvoi du code
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Fonction pour soumettre le code
  const handleSubmitCode = () => {
    const codeString = code.join('');
    // Logique pour valider le code ici
    console.log('Code saisi:', codeString); // Remplacez cela par votre logique de vérification

    // Si la validation est réussie, redirigez vers la page des informations personnelles
    navigate('/personelauth');
  };

  return (
    <body className="body-conf">
      <main className="container-conf">
        <article className="header-conf">
          <button className="back-button">
            <a href="../pages/conn.html">&lt;</a>
          </button>
          <h2>Confirmez votre numéro</h2>
        </article>

        <article className="form">
          <p>Entrez le code que nous vous avons envoyé</p>
          <section className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                type="number"
                maxLength="1"
                id={`code-input-${index}`}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onFocus={(e) => e.target.select()} // Sélectionne le champ lorsqu'il est cliqué
              />
            ))}
          </section>
          <p className="resend-timer">Renvoyez le code dans : {timer} secondes</p>
          <button className="continue-button" onClick={handleSubmitCode}>
            Continuer
          </button>
          {timer === 0 && (
            <button className="resend-button" onClick={handleResendCode}>
              Renvoyer le code
            </button>
          )}
        </article>

        <article className="numpad">
          <section className="row">
            <button onClick={() => handleNumpadClick('1')}>1</button>
            <button onClick={() => handleNumpadClick('2')}>2<br /><span>ABC</span></button>
            <button onClick={() => handleNumpadClick('3')}>3<br /><span>DEF</span></button>
          </section>
          <section className="row">
            <button onClick={() => handleNumpadClick('4')}>4<br /><span>GHI</span></button>
            <button onClick={() => handleNumpadClick('5')}>5<br /><span>JKL</span></button>
            <button onClick={() => handleNumpadClick('6')}>6<br /><span>MNO</span></button>
          </section>
          <section className="row">
            <button onClick={() => handleNumpadClick('7')}>7<br /><span>PQRS</span></button>
            <button onClick={() => handleNumpadClick('8')}>8<br /><span>TUV</span></button>
            <button onClick={() => handleNumpadClick('9')}>9<br /><span>WXYZ</span></button>
          </section>
          <section className="row">
            <button onClick={() => handleNumpadClick('*')}>*</button>
            <button onClick={() => handleNumpadClick('0')}>0</button>
            <button onClick={() => handleNumpadClick('#')}>#</button>
          </section>
        </article>
      </main>
    </body>
  );
};

export default ConfirmationPage;
