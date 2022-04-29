import { Configurar } from '../../src/components/Configurar.js';

jest.mock('../../src/lib/imports/firebase-imports.js');

/* describe('configurationPassword', () => {
    it('configurationPassword es una función', () => {
    const configuration = Configurar();
    // const currentPassword =configuration.getElementById('txtPasswordCurrent');
    const newPassword = configuration.querySelector('#txtPasswordNew');
    const newPasswordConfirm = configuration.querySelector('#txtPasswordNewRepeat');
    const messageError = configuration.querySelector('#cardHide');
    const btn = configuration.querySelector('#buttonConfiguration');
    newPassword.value = 'password1';
    newPasswordConfirm.value = 'password2';
    btn.dispatchEvent(new Event('click'));
      expect(messageError.textContent).toBe('Las contraseñas nuevas no coinciden');
    });
  }); */ 
