import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// import { firebaseConfig } from './firebaseConfig';

const firebaseConfig = {
  // your firebase configuration
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Create and export the GoogleAuthProvider instance
const googleProvider = new GoogleAuthProvider();


export { app, auth, db , googleProvider};


