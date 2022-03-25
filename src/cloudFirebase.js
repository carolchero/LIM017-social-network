// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // conectar ,importar,mostrar

export const db = getFirestore();

export function dataUser() {
  try {
    const docRef = addDoc(collection(db, 'usuario'), {
      first: 'Prueba',
      last: 'Prueba',
      born: 1815,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
