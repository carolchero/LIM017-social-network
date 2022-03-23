// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js';

// import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js"; // conectar ,importar,mostrar

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCndNrEQqKW9lxejcf3Ksr3Zt3Q28Gtu2M',
  authDomain: 'social-network-programmers.firebaseapp.com',
  projectId: 'social-network-programmers',
  storageBucket: 'social-network-programmers.appspot.com',
  messagingSenderId: '857295101335',
  appId: '1:857295101335:web:ebceaaef0a3194aa7ef8d2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/* const db = getFirestore();

export function getUser() {
  const docs = getDocs(collection(db, 'users'));
  return docs;
} */
