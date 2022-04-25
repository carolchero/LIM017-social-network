/* CLOUD FIRESTORE */
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc,
  doc, setDoc, getDoc, query, where, updateDoc, orderBy,
  arrayUnion, arrayRemove,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // conectar ,importar,mostrar

export {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc,
  doc, setDoc, getDoc, query, where, updateDoc, orderBy,
  arrayUnion, arrayRemove,
};
export const db = getFirestore();
