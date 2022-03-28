// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line object-curly-newline
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from './main.js';
import { dataUser } from './cloudFirebase.js';

// función para crear nuevos usuarios
export async function register(name, email, password, date, cellphone) {
  const auth = getAuth();
  let result = '';
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const idUser = userCredential.user.uid;
      result = true;
      dataUser(idUser, name, email, password, date, cellphone);
    })
    .catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/weak-password':
          result = 'Contraseña debil';
          break;
        case 'auth/email-already-in-use':
          result = 'Correo ya está registrado';
          break;
        case 'auth/invalid-email':
          result = 'Correo invalido';
          break;
        default:
          result = 'Correo y/o contraseña invalido';
          break;
      }
    });
  return result;
}

// funcion para acceso a usuarios existentes
export function accesUser(email, password) {
  console.log(document.cookie);
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user.uid;
      console.log('id usuario: '+user);
      onNavigate('/feed');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message);
      document.getElementById('messageHide').style.display = 'block';
    });
}
// autenticación con Google
const provider = new GoogleAuthProvider();

export function accesGoogle() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      onNavigate('/feed');
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

// autenticación con FB
const provider2 = new FacebookAuthProvider();

export function accesFacebook() {
  const auth = getAuth();
  signInWithPopup(auth, provider2)
    .then((result) => {
      // The signed-in user info.
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const user = result.user;
      onNavigate('/feed');
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
}

// reestablecer contraseña
/* import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); */
