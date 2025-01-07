import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyD1f2VRhCPTqIWydIvBOAGMDw1cyRYcy9s",
    authDomain: "projetpct-e19a8.firebaseapp.com",
    projectId: "projetpct-e19a8",
    storageBucket: "projetpct-e19a8.appspot.com",
    messagingSenderId: "842922201479",
    appId: "1:842922201479:web:2403ca48ebc7d801b44322"
  };

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);