import {
  register, accesUser, accesGoogle, restorePassword, cerrarSesion,
  configurationPassword, listeningSessionEvent, validateCorrectPassword,
} from '../../src/lib/auth';
import { ResetPassword } from '../../src/components/ResetPassword.js';
import { Login } from '../../src/components/Login.js';
import { Configurar } from '../../src/components/Configurar.js';
import {
  createNewPassword, closeSession, accesUserExist, signGoogle, verifyUserActive, stateUser, createUser,
} from '../../src/lib/controller-firebase/auth-functions.js';
import { Register } from '../../src/components/Register.js';

const {
  getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,
  signInWithEmailAndPassword, sendPasswordResetEmail, signOut,
} = require('../../src/lib/imports/firebase-imports.js');

jest.mock('../../src/lib/imports/firebase-imports.js');

test('use jsdom in this test file', () => {
  const root = document.getElementById('root');
  expect(root).not.toBeNull();
});

describe('register', () => {
  it('la función retorna un objeto(si se creo el usuario)', () => {
    const email = 'maria@gmail.com';
    const name = 'Maria';
    const password = 'maria123';
    expect(typeof register(name, email, password)).toBe('object');
  });

  it('si no se crea el usuario, retorna el error', async () => {
    const email = 'maria';
    const name = 'Maria';
    const password = 'maria123';
    expect(await register(name, email, password)).toBe('Correo y/o contraseña invalido');
  });
});
describe('accesUser', () => {
  it('la función es llamada para permitir acceso', () => signInWithEmailAndPassword()
    .then(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(signInWithEmailAndPassword.mock.calls[0][0]).toEqual(getAuth());
    }));
  it('si el usuario no existe la promesa es rechazada', () => signInWithEmailAndPassword()
    .catch(() => {
      expect(accesUser('', '')).toMatch('error');
    }));
  it('si el usuario no existe muestra mensaje de error', () => signInWithEmailAndPassword()
    .catch(() => {
      expect(accesUser('', '')).toBe('auth/invalid-email');
    }));
});

describe('Login', () => {
  it('Login es una función que contiene texto HTML', () => {
    expect(typeof Login().textContent).toBe('string');
  });
  it('si el correo o contraseña ingresado es invalido', () => {
    document.body.innerHTML = '<div id = "messageHide" ></div>';
    const result = Login();
    const email = result.querySelector('#txtUser');
    const password = result.querySelector('#txtPassword');
    email.value = 'aaaaaaa ';
    password.value = ' 4';
    const btnLogin = result.querySelector('#btnLogin');
    btnLogin.dispatchEvent(new Event('click'));
    const messageHide = document.getElementById('messageError');
    accesUserExist(email, password)
      .catch(() => {
        expect(messageHide.textContent).toBe('Usuario o contraseña no válido');
      });
  });
});

describe('signInWithPopup with Google', () => {
  it('La función es llamada y  permite el acceso al usuario', () => signInWithPopup()
    .then(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(signInWithPopup.mock.calls[0][0]).toEqual(getAuth());
      expect(signInWithPopup.mock.calls[0][1]).toEqual(GoogleAuthProvider());
    }));
  it('si hay algun error al ingresar con google', () => {
    signGoogle()
      .catch(() => {
        expect(signGoogle).toMatch('error');
      });
  });
});

describe('createNewPassword', () => {
  it('createNewPassword tiene como resultado sendPasswordResetEmail() ', () => {
    expect(createNewPassword('holi@gmail.com')).toEqual(sendPasswordResetEmail());
  });
  it('la función al ser llamada permite el acceso', () => sendPasswordResetEmail()
    .then(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalled();
      expect(sendPasswordResetEmail.mock.calls[0][0]).toEqual(getAuth());
      expect(sendPasswordResetEmail.mock.calls[0][1]).toEqual('holi@gmail.com');
    }));
  it('muestra el error si el email no es definido', () => createNewPassword()
    .catch(() => {
      expect(createNewPassword).toMatch('error');
    }));
});

describe('Configurar', () => {
  it('Configurar es una función que contiene texto HTML', () => {
    expect(typeof Configurar().textContent).toBe('string');
  });
});

describe('ResetPassword', () => {
  it('ResetPassword es una función que contiene texto HTML', () => {
    expect(typeof ResetPassword().textContent).toBe('string');
  });
  it('si el correo ingresado es invalido', () => {
    document.body.innerHTML = '<p id = "messageError" ></p>';
    const result = ResetPassword();
    const email = result.querySelector('#txtCorreo');
    email.value = 'aaaaaaa ';
    const btn = result.querySelector('#buttonResetPassword');
    btn.dispatchEvent(new Event('click'));
    const messageHideCorreo = document.getElementById('messageError');
    createNewPassword(email.value)
      .catch(() => {
        expect(messageHideCorreo.textContent).toBe('Tiene que ingresar un correo válido');
      });
  });
});

describe('signOut', () => {
  it(' closeSession itiene como resultado signOut', () => {
    expect(closeSession()).toEqual(signOut());
  });
  it(' el resultado de closeSession es un objeto', () => {
    expect(typeof closeSession()).toBe('object');
  });
  it('La función signOut es llamada correctamente', () => signOut()
    .then(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(signInWithPopup.mock.calls[0][0]).toEqual(getAuth());
    }));
});
