import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB1m6nJ2jZXEM9DCmHOVzjK_JyuVyTDkJw",
  authDomain: "dominoclubapp.firebaseapp.com",
  projectId: "dominoclubapp",
  storageBucket: "dominoclubapp.firebasestorage.app",
  messagingSenderId: "643328207517",
  appId: "1:643328207517:web:507c43ee281184340a0274"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;