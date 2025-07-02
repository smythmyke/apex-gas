import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDl5_B7WKWIkdRN5cOOgyLNIhWb6xfajHw",
  authDomain: "apex-gas-9920e.firebaseapp.com",
  projectId: "apex-gas-9920e",
  storageBucket: "apex-gas-9920e.firebasestorage.app",
  messagingSenderId: "177024004601",
  appId: "1:177024004601:web:b4fc7fc55fb67bcd9ab809"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { app, db };