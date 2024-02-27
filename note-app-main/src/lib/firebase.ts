import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, serverTimestamp as firestoreServerTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB1CBIjct1a5QAkdTUtl602H7k80oPAfQ0",
    authDomain: "silvia-diary.firebaseapp.com",
    projectId: "silvia-diary",
    storageBucket: "silvia-diary.appspot.com",
    messagingSenderId: "478979856595",
    appId: "1:478979856595:web:2727dfb5ee2c792c9d1c26",
    measurementId: "G-NW3WN4FHW4"
};

const app = initializeApp(firebaseConfig);

let analytics;
if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}



export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const serverTimestamp = firestoreServerTimestamp;

export function signInWithGooglePopup() {return signInWithPopup(auth, googleAuthProvider)};

export function signUpWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
export function signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
