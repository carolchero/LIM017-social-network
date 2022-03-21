// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from './main.js';

// función para crear nuevos usuarios
export function register(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log(user);
      onNavigate('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    // ..
    });
}

// funcion para acceso a usuarios existentes
export function accesUser(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log(user);
      onNavigate('/feed');
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log('errorCode' + errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      document.getElementById('messageHide').style.display = 'block';
    });
  console.log('el acces user devuelve' + auth);
}
