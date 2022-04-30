// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../Router.js';
import { dataUser, getUser } from './cloudFirebase.js';
// eslint-disable-next-line import/no-cycle
import {
  createUser, accesUserExist, signGoogle, createNewPassword, closeSession, validateCorrectPassword,
  stateUser, verifyUserActive,
} from './controller-firebase/auth-functions.js';

// FUNCIÓN PARA CREAR NUEVOS USUARIOS
export async function register(name, email, password) {
  let result = '';
  await createUser(email, password)
    .then((uid) => {
      const idUser = uid; // id de usuario
      result = true;
      // imagenes predeterminadas
      const urlPhotoUser = 'https://firebasestorage.googleapis.com/v0/b/social-network-programmers.appspot.com/o/user.jpg?alt=media&token=231ef8f9-fbee-4755-b3db-7cd80cbd3cf9';
      const urlCoverPage = 'https://firebasestorage.googleapis.com/v0/b/social-network-programmers.appspot.com/o/cover-default.jpg?alt=media&token=5a5ea188-4df6-41e6-8279-37f40e57711b';
      dataUser(idUser, name, email, password, urlPhotoUser, urlCoverPage);
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

// FUNCIÓN PARA ACCESO A USUARIOS EXISTENTES
export function accesUser(email, password) {
  accesUserExist(email, password)
    .then(async (credential) => {
    // Signed in
      const usuario = credential.user.uid;
      const docSnap = await getUser(usuario);
      const urlPhotoUser = docSnap.data().urlPhotoUser;
      const nameUser = docSnap.data().name;
      const id = docSnap.data().id;
      sessionStorage.setItem('uid', id);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('nameUser', nameUser);
      sessionStorage.setItem('photoUser', urlPhotoUser);
      onNavigate('/feed');
    })
    .catch(() => {
      document.getElementById('messageHide').style.display = 'block';
    });
}

// AUTENTICACIÓN CON GOOGLE
export async function accesGoogle() {
  let result = '';
  signGoogle()
    .then(async (user) => {
      const nameUser = user.displayName;
      const idUser = user.uid;
      const emailUser = user.email;
      const token = user.accessToken;
      let urlPhotoUser = null;
      let urlCoverPage = null;
      const docSnap = await getUser(idUser);
      if (docSnap.exists()) {
        urlPhotoUser = docSnap.data().urlPhotoUser;
        urlCoverPage = docSnap.data().urlCoverPage;
        sessionStorage.setItem('uid', user.uid);
        sessionStorage.setItem('photoUser', urlPhotoUser);
        sessionStorage.setItem('nameUser', nameUser);
        dataUser(idUser, nameUser, emailUser, token, urlPhotoUser, urlCoverPage);
      } else { // doc.data() will be undefined in this case
        // imagenes predeterminadas ¿'opcion de poner foto de google?
        urlPhotoUser = user.photoURL;
        sessionStorage.setItem('uid', user.uid);
        sessionStorage.setItem('nameUser', nameUser);
        sessionStorage.setItem('photoUser', urlPhotoUser);
        urlCoverPage = 'https://firebasestorage.googleapis.com/v0/b/social-network-programmers.appspot.com/o/cover-default.jpg?alt=media&token=5a5ea188-4df6-41e6-8279-37f40e57711b';
        dataUser(idUser, nameUser, emailUser, token, urlPhotoUser, urlCoverPage);
      }
      onNavigate('/feed');
      result = true;
    }).catch((error) => {
      console.error(error);
      result = false;
    });
  return result;
}

/* // AUTENTICACIÓN CON FB
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
} */

// REESTABLECER CONTRASEÑA
export function restorePassword() {
  const email = document.getElementById('txtCorreo').value;
  createNewPassword(email)
    .then(() => {
      // Password reset email sent!
      console.log('Puede cambiar contraseña');
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

// FUNCIÓN PARA CERRAR SESIÓN
export function cerrarSesion() {
  closeSession()
    .then(() => {
      // Password reset email sent!
      sessionStorage.clear();
      onNavigate('/');
    })
    .catch(() => {
      document.getElementById('messageHide').style.display = 'block';
    });
}

// Cambiar contraseña
export function validatePassword(password) {
  return password != null && password !== '';
}
export function returnLogin() {
  onNavigate('/');
}

export function configurationPassword() {
  const currentPassword = document.getElementById('txtPasswordCurrent').value;
  const newPassword = document.getElementById('txtPasswordNew').value;
  const newPasswordConfirm = document.getElementById('txtPasswordNewRepeat').value;
  const email = sessionStorage.getItem('email');
  function time() {
    const messageError = document.getElementById('cardHide');
    messageError.style.display = 'none';
  }
  if (newPassword !== newPasswordConfirm) {
    const messageError = document.getElementById('cardHide');
    messageError.innerText = 'Las contraseñas nuevas no coinciden';
    messageError.style.display = 'block';
    setTimeout(time, 1000);
    return;
  }
  if (!validatePassword(newPassword)) {
    const messageError = document.getElementById('cardHide');
    messageError.innerText = 'Contraseña no valida';
    messageError.style.display = 'block';
    setTimeout(time, 1000);
    return;
  }
  async function validyUser() {
    const docSnap = await getUser(sessionStorage.getItem('uid'));
    const passwordFirestore = docSnap.data().password;
    if (currentPassword !== passwordFirestore) {
      const messageError = document.getElementById('cardHide');
      messageError.innerText = 'Contraseña antigua es incorrecta';
      messageError.style.display = 'block';
      setTimeout(time, 1000);
    }
  }
  validyUser();

  // actualizamos la contraseña
  validateCorrectPassword(email, currentPassword)
    .then(() => {
      stateUser(newPassword);
      setTimeout(returnLogin, 1000);
    });
}

// VERIFICAR SI SESIÓN ESTA ACTIVA O NO => CERRAR SI ESTA INACTIVA
export function listeningSessionEvent() {
  verifyUserActive();
}
