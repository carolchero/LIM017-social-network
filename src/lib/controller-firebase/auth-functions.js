import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
  GoogleAuthProvider, /* FacebookAuthProvider, */ signOut,
  updatePassword, onAuthStateChanged, sendPasswordResetEmail,
} from '../imports/firebase-imports.js';
// eslint-disable-next-line import/no-cycle
import { returnLogin } from '../auth.js';

export const createUser = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      return uid;
    });
};

export const accesUserExist = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const credential = userCredential;
      return credential;
    });
};

export const signGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth1 = getAuth();
  return signInWithPopup(auth1, provider)
    .then((result) => {
      const user = result.user;
      return (user);
    });
};

export const createNewPassword = (email) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

export const closeSession = () => {
  const auth = getAuth();
  return signOut(auth);
};

export const validateCorrectPassword = (email, currentPassword) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, currentPassword);
};

export function updateNewPassword(user) {
  return updatePassword(user);
}

export const stateUser = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateNewPassword(user);
      console.log('cambio exitoso');
    } else {
      console.log(user);
    }
  });
};

export const verifyUserActive = () => {
  const auth = getAuth();
  // eslint-disable-next-line no-shadow
  onAuthStateChanged(auth, (user) => {
    if (user === null) { // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      returnLogin();
    }
  });
};
