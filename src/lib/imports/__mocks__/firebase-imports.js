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


export const getFirestore = () => Promise.resolve({});
export const collection = () => Promise.resolve({});
export const addDoc = () => Promise.resolve({});
export const getDocs = () => Promise.resolve({});
export const onSnapshot = () => Promise.resolve({});
export const deleteDoc = () => Promise.resolve({});
export const doc = () => Promise.resolve({});
export const setDoc = () => Promise.resolve({});
export const getDoc = () => Promise.resolve({});
export const query = () => Promise.resolve({});
export const where = () => Promise.resolve({});
export const updateDoc = () => Promise.resolve({});
export const orderBy = () => Promise.resolve({});
export const arrayUnion = () => Promise.resolve({});
export const arrayRemove = () => Promise.resolve({});
export const FacebookAuthProvider = () => Promise.resolve({});
/* STORAGE
export {
    getStorage, ref, uploadBytesResumable, getDownloadURL,
  }; */
export const getStorage = () => Promise.resolve({});
export const ref = () => Promise.resolve({});
export const uploadBytesResumable = () => Promise.resolve({});
export const getDownloadURL = () => Promise.resolve({});
