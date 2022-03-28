/* eslint-disable object-curly-newline */
// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // conectar ,importar,mostrar

export const db = getFirestore();

// para almacenar datos del usuario
export async function dataUser(id, name, email, password, date, cellphone) {
  try {
    const docRef = await addDoc(collection(db, 'dataUsers'), {
      id, name, email, password, date, cellphone,
    });
    // eslint-disable-next-line no-console
    console.log('id data user: ', docRef.id);
  } catch (e) {
    // console.error('Error adding document: ', e);
  }
}

// para verificar que se agregaron los datos
export async function reviewResult() {
  const querySnapshot = await getDocs(collection(db, 'dataUsers'));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
}

// para alamacenar datos de publicación
export async function dataPublication(title, text) {
  const uid = sessionStorage.getItem('uid');
  try {
    const docRef = await addDoc(collection(db, 'dataPublication'), {
      uid, title, text,
    });
    console.log('', docRef.id);
  } catch (e) {
    // console.error('Error adding document: ', e);
  }
}
// para verificar que se agregaron los datos
export async function reviewResultPublication() {
  const querySnapshot = await getDocs(collection(db, 'dataPublication'));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
}
