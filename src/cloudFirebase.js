/* eslint-disable object-curly-newline */
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, setDoc, getDoc, query, where, updateDoc, orderBy } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // conectar ,importar,mostrar

export const db = getFirestore();

const uid = sessionStorage.getItem('uid');
// para almacenar datos del usuario
export async function dataUser(id, name, email, password, urlPhotoUser, urlCoverPage) {
  try {
    const docRef = await setDoc(doc(db, 'dataUsers', id), {
      id, name, email, password, urlPhotoUser, urlCoverPage,
    });
    // eslint-disable-next-line no-console
    console.log('id data user: ', docRef.id);
  } catch (e) {
    // console.error('Error adding document: ', e);
  }
}
/* USUARIO  */

export const getUser = (id) => getDoc(doc(db, 'dataUsers', id));// obtener informacion del usuario despues del login
export const getUsers = () => getDocs(collection(db, 'dataUsers')); // obtener informacion de los usuarios  despues del login
export const onGetUser = (callback) => onSnapshot(query(collection(db, 'dataUsers')), callback);
export const updateDataUsers = (id, newFields) => updateDoc(doc(db, 'dataUsers', id), newFields); // actualizar publicación
/* PUBLICACIÓN */
export const dataPublication = (title, text, date) => addDoc(collection(db, 'dataPublication'), { uid, title, text, date }); // para alamacenar datos de publicación
export const getPublication = () => getDocs(collection(db, 'dataPublication')); // obtener informacion
export const onGetPublication = (callback) => onSnapshot(query(collection(db, 'dataPublication'), orderBy('date', 'desc')), callback);// se agrega la publicación nueva sin recargar
export const onGetPublicationUser = (callback) => onSnapshot(query(collection(db, 'dataPublication'), where('uid', '==', uid)), callback); // se agrega la publicación nueva sin recargar POR USUARIO
export const deletePublication = (id) => deleteDoc(doc(db, 'dataPublication', id)); // eliminar publicación
export const getOnlyPublication = (id) => getDoc(doc(db, 'dataPublication', id)); // editar publicación
export const updatePublication = (id, newFields) => updateDoc(doc(db, 'dataPublication', id), newFields); // actualizar publicación
// para que se muestren en consola las publicaciones
export async function reviewResultPublication() {
  // const querySnapshot = await getDocs(collection(db, 'dataPublication'));
  onSnapshot(collection(db, 'dataPublication'), (querySnapshot) => {
    querySnapshot.forEach((doc1) => {
      console.log(doc1.data());
    });
  });
}

export async function likePublication(id) {
  try {
    const docRef = await setDoc(doc(db, 'dataPublication', id, 'like', sessionStorage.getItem('uid')), {});
  } catch (e) {
    // console.error('Error adding document: ', e);
  }
}
