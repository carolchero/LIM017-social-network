import {
  register, accesUser, accesGoogle, restorePassword, cerrarSesion,
  configurationPassword, listeningSessionEven, validateCorrectPassword
} from '../../src/lib/auth';

import {
  createNewPassword,
} from '../../src/lib/controller-firebase/auth-functions.js';

const {
  createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider,
  signInWithEmailAndPassword, sendPasswordResetEmail,
} = require('../../src/lib/imports/firebase-imports.js');

jest.mock('../../src/lib/imports/firebase-imports.js');

describe('register', () => {
  it('la función retorna un objeto(si se creo el usuario)', () => {
    const email = 'maria@gmail.com';
    const name = 'Maria';
    const password = 'maria123';
    window.history = jest.fn();
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

describe('signInWithPopup with Google', () => {
  it('La función es llamada y  permite el acceso al usuario', () => signInWithPopup()
    .then(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(signInWithPopup.mock.calls[0][0]).toEqual(getAuth());
      expect(signInWithPopup.mock.calls[0][1]).toEqual(GoogleAuthProvider());
    }));
});

/* describe('restorePassword', () => {
  it('La función es llamada y  permite cambiar contraseña', () => {
    
    expect('holi').toBe('holi');
  });
});

// faltaaaaaaaaaaaaaa
describe('cerrarSesion', () => {
  it('la función retorna un objeto(si se creo el usuario)', () => {
    expect('holi').toBe('holi');
  });
});



describe('validateCorrectPassword', () => {
  it('la función retorna un objeto(si se creo el usuario)', () => {
    expect('holi').toBe('holi');
  });
});
describe('listeningSessionEven', () => {
  it('la función retorna un objeto(si se creo el usuario)', () => {
    expect('holi').toBe('holi');
  });
}); */
