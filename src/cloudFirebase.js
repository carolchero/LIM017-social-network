// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // conectar ,importar,mostrar
import { async } from "regenerator-runtime";
import {app} from './lib/firebase.js';

export const db = getFirestore();

export async function dataUSer() {
  try {
    const docRef = await addDoc(collection(db, 'usuario'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}