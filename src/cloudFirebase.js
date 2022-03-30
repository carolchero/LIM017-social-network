/* eslint-disable object-curly-newline */
// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, setDoc, getDoc, query, where, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // conectar ,importar,mostrar

export const db = getFirestore();
const uid = sessionStorage.getItem('uid');

// para almacenar datos del usuario
export async function dataUser(id, name, email, password, date, cellphone) {
  try {
    const docRef = await setDoc(doc(db, 'dataUser', id), {
      name, email, password, date, cellphone,
    });
    // eslint-disable-next-line no-console
    console.log('id data user: ', docRef.id);
  } catch (e) {
    // console.error('Error adding document: ', e);
  }
}

// obtener informacion del usuario despues del login
export function getUser(id) {
  return getDoc(doc(db, 'dataUser', id));
}

// para verificar que se agregaron los datos
export async function reviewResult() {
  const querySnapshot = await getDocs(collection(db, 'dataUsers')); // querySnapshot son los datos que existen hasta ese momento
  querySnapshot.forEach((doc1) => { // recorre datos internos
    console.log(doc1.data()); // trae los objetos
  });
}

// para verificar que se agregaron los datos
export async function reviewResultPublication() {
  // const querySnapshot = await getDocs(collection(db, 'dataPublication'));
  onSnapshot(collection(db, 'dataPublication'), (querySnapshot) => {
    querySnapshot.forEach((doc1) => {
      console.log(doc1.data());
    });
  });
}

// para alamacenar datos de publicación
export const dataPublication = (title, text) => addDoc(collection(db, 'dataPublication'), { uid, title, text });
export const getPublication = () => getDocs(collection(db, 'dataPublication'));

// se agrega la publicación nueva sin recargar
export const onGetPublication = (callback) => onSnapshot(collection(db, 'dataPublication'), callback);
export const onGetPublicationUser = (callback) => onSnapshot(query(collection(db, 'dataPublication'), where('uid', '==', uid)), callback);

// elimiminar  y editar publicación
export const deletePublication = (id) => deleteDoc(doc(db, 'dataPublication', id));
export const getOnlyPublication = (id) => getDoc(doc(db, 'dataPublication', id));
// actualizar publicación
export const updatePublication = (id, newFields) => updateDoc(doc(db, 'dataPublication', id), newFields);
