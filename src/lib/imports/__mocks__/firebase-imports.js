export const initializeApp = () => Promise.resolve({});
export const getAuth = () => {};

/* CREAR USUARIO */
export const createUserWithEmailAndPassword = () => {
  const userCredentials = {
    user: { uid: 'xyxyui123' },
  };
  return Promise.resolve(userCredentials.user.uid);
};

/* INGRESAR CON EMAIL Y PASSWORD */

export const signInWithEmailAndPassword = jest.fn(() => {
  const userCredential = {
    user: { uid: 'xyxyui123' },
  };
  return Promise.resolve(userCredential);
});

/* ACCES USER WITH GOOGLE */
export const GoogleAuthProvider = jest.fn(() => {});
export const signInWithPopup = jest.fn(() => {
  const user = {
    displayName: 'Paola',
    uid: 'hni12345',
    email: 'paola@gmail.com',
    accessToken: 'YYWWXX',
  };
  return Promise.resolve(user);
});

/* OLVIDO DE CONTRASEÑA */
export const sendPasswordResetEmail = jest.fn(() => Promise.resolve({}));

/* CAMBIAR CONTRASEÑA PASSWORD */
export const updatePassword = () => Promise.resolve({});
export const onAuthStateChanged = () => Promise.resolve({});

/* CERRAR SESIÓN */
export const signOut = () => Promise.resolve({});

/* CLOUDFIREBASE */

export const setDoc = () => Promise.resolve({ id: 'id' });
export const db = jest.fn();
export const collection = jest.fn((_db_, _collection_) => _collection_);
export const getDocs = jest.fn(() => Promise.resolve({
  data: {
    id: 'xxxxxyyyyzzzz',
  },
  forEach: () => ([{ data: { id: 'xxxxxyyyyzzzz' } }]),
}));
export const addDoc = () => Promise.resolve({});
export const onSnapshot = jest.fn(() => Promise.resolve({}));
export const orderBy = () => Promise.resolve({});
export const query = () => Promise.resolve({});
export const where = () => Promise.resolve({});
export const updateDoc = () => Promise.resolve({});
export const getDoc = jest.fn(() => ({
  data: () => ({
    id: 'xxxxxyyyyzzzz',
  }),
}));
export const getFirestore = () => Promise.resolve({});
export const deleteDoc = () => Promise.resolve({});
export const doc = () => Promise.resolve({});
export const arrayUnion = () => Promise.resolve({});
export const arrayRemove = () => Promise.resolve({});
// export const FacebookAuthProvider = () => Promise.resolve({});
/* STORAGE
export {
    getStorage, ref, uploadBytesResumable, getDownloadURL,
  }; */
export const getStorage = () => Promise.resolve({});
export const ref = (storage, photoUrl) => (photoUrl.includes('exist') ? 'urlPhoto' : '');
export const uploadBytesResumable = () => Promise.resolve({state: 'success'});
// eslint-disable-next-line prefer-promise-reject-errors
export const getDownloadURL = (photoName) => (photoName === '' ? Promise.reject('Photo not exists') : Promise.resolve('urlPhoto'));
