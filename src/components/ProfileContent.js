import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';
import { Camera, Loader2 } from 'lucide-react';

const ProfileContent = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les données utilisateur
  const fetchUserData = async (currentUser) => {
    try {
      // D'abord, essayer de récupérer les données du localStorage
      const storedData = localStorage.getItem(`userData_${currentUser.uid}`);
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }

      // Ensuite, essayer de mettre à jour depuis Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const firestoreData = userDocSnap.data();
        setUserData(firestoreData);
        // Mettre à jour le localStorage avec les nouvelles données
        localStorage.setItem(`userData_${currentUser.uid}`, JSON.stringify(firestoreData));
      }
    } catch (err) {
      console.log('Utilisation des données locales uniquement');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);
      
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser);
      } else {
        setUser(null);
        setUserData(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Veuillez vous connecter pour voir votre profil.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* En-tête du profil */}
        <div className="flex flex-col items-center pb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl text-gray-400 font-bold">
                  {userData?.firstName?.charAt(0) || user.email?.charAt(0)}
                </div>
              )}
            </div>
            <button 
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {userData?.firstName} {userData?.lastName}
          </h2>
        </div>

        {/* Informations du profil */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-gray-50">
              {user.email}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <p className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-gray-50">
              {userData?.firstName || 'Non spécifié'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <p className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-gray-50">
              {userData?.lastName || 'Non spécifié'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;