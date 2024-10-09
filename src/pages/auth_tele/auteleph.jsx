import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../auth_tele/styleu.css';
import { useNavigate } from 'react-router-dom'; 
const validationSchema = Yup.object({
    countryCode: Yup.string().required('Le code pays est requis'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]\d{9}$/, 'Le numéro de téléphone doit comporter 10 chiffres')
      .required('Le numéro de téléphone est requis'),
  });
  
  function LoginPage() {
    const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection
  
    const formik = useFormik({
      initialValues: {
        countryCode: '+225', // Valeur par défaut
        phoneNumber: '',
      },
      validationSchema,
      onSubmit: (values) => {
        console.log('Numéro validé avec succès:', values);
        // Rediriger vers la page de confirmation
        navigate('/connexi');
      },
    });
  
    return (
      <div className="body-login-box">
        <main className="container-login-box">
          <article className="login-box">
            <h2>Bienvenue sur Easily</h2>
            <p>Entrez votre numéro de téléphone</p>
  
            {/* Formulaire */}
            <form onSubmit={formik.handleSubmit}>
              <section className="input-group">
                {/* Sélecteur de code pays */}
                <select
                  className="country-code"
                  name="countryCode"
                  value={formik.values.countryCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="+225">+225</option>
                  <option value="+33">+33</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  {/* Autres options */}
                </select>
                {formik.touched.countryCode && formik.errors.countryCode ? (
                  <div className="error">{formik.errors.countryCode}</div>
                ) : null}
  
                {/* Champ de numéro de téléphone */}
                <input
                  type="tel"
                  className="phone-number"
                  name="phoneNumber"
                  placeholder="07 00 00 00 00"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="error">{formik.errors.phoneNumber}</div>
                ) : null}
              </section>
  
              {/* Bouton Continuer */}
              <button className="btn" type="submit">
                Continuer
              </button>
            </form>
          </article>
        </main>
      </div>
    );
  }
  
  export default LoginPage;