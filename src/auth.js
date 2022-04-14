/* eslint-disable max-len */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut,
  // eslint-disable-next-line no-unused-vars
  updatePassword, onAuthStateChanged, sendPasswordResetEmail,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
// eslint-disable-next-line import/no-cycle,import/no-unresolved
import { onNavigate } from './main.js';
import { dataUser } from './cloudFirebase.js';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-unresolved

// función para crear nuevos usuarios
export async function register(name, email, password) {
  const auth = getAuth();
  let result = '';
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const idUser = userCredential.user.uid;
      result = true;
      dataUser(idUser, name, email, password);
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
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const usuario = userCredential.user.uid;
      sessionStorage.setItem('uid', usuario);
      // sessionStorage.setItem('name', nameUsuarie);
      sessionStorage.setItem('email',email);
      console.log(email);

      if (userCredential.user.photoURL != null) {
        sessionStorage.setItem('photo', userCredential.user.photoURL);
      } else {
        sessionStorage.setItem('photo', 'img/un-usuario.jpg');
      }
      onNavigate('/feed');

      // //img
    })
    .catch((error) => {
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
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      sessionStorage.setItem('uid', user.uid);
      sessionStorage.setItem('name', user.displayName);
      console.log(user.displayName);
      console.log(user.photoURL);

      if (user.photoURL != null) {
        sessionStorage.setItem('photo', user.photoURL);
      } else {
        sessionStorage.setItem('photo', 'img/un-usuario.jpg');
      }

      onNavigate('/feed');
      // document.getElementById('imagenUsuario').src = photoUrl;
    }).catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(credential, error);
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
      console.log(accessToken, user);
      onNavigate('/feed');
    })
    .catch((error) => {
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(credential, error);
    });
}

// reestablecer contraseña

export function restorePassword() {
  const auth = getAuth();
  const email = document.getElementById('txtCorreo').value;
  console.log(email);
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      console.log('Puede cambiar contraseña');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // ..
    });
}

// cerrar sesion

export function cerrarSesion() {
  const auth = getAuth();
  signOut(auth)
    // eslint-disable-next-line no-unused-vars
    .then((userCredencial) => {
      // Password reset email sent!
      onNavigate('/');
    })
    .catch((error) => {
      console.log(error.message);
      document.getElementById('messageHide').style.display = 'block';
    });
}

export function validatePassword(password) {
  return password != null && password !== '';
}

export function configurationPassword() {
  const auth = getAuth();
  console.log(auth);
  const currentPassword = document.getElementById('txtPasswordCurrent').value;
  const newPassword = document.getElementById('txtPasswordNew').value;
  const newPasswordConfirm = document.getElementById('txtPasswordNewRepeat').value;
  const email = sessionStorage.getItem('email');
  if (newPassword !== newPasswordConfirm) {
    //
    console.log('las contraseñas no coinciden');
    return;
  }
  if (!validatePassword(newPassword)) {
    //
    console.log('la contraseña no es válida');
    return;
  }
  // Hacemos login para validar si currentpassword es la contraseña correcta
  signInWithEmailAndPassword(auth, email, currentPassword)
    .then(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);

          updatePassword(user, newPassword).then(() => {
            console.log('Update successful');
            onNavigate('/');
          }).catch((error) => {
            // An error ocurred
            // ...
            console.log(error.message);
          });
        } else {
          console.log(user);
        }
      });
    })
    .catch((error) => {
      console.log('la contraseña actual no es correcta');
      console.log(error.message);
      document.getElementById('messageHide').style.display = 'block';
    });
}
