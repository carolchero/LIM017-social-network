// eslint-disable-next-line import/no-cycle
import { configurationPassword } from '../auth.js';

export const Configurar = () => {
  const sectionChangePassword = document.createElement('section');
  sectionChangePassword.className = 'section-configuration';
  const divChangePassword = document.createElement('div');
  divChangePassword.className = 'container-configuration';
  const divCard = document.createElement('div');
  divCard.className = 'card';

  const titleChangePassword = document.createElement('h2');
  titleChangePassword.className = 'text-center';
  titleChangePassword.innerText = 'Cambiar Contraseña';

  const labelPasswordCurrent = document.createElement('label');
  labelPasswordCurrent.className = 'control-label';
  labelPasswordCurrent.innerText = 'Ingrese su contraseña Actual';
  const inputPasswordCurrent = document.createElement('input');
  inputPasswordCurrent.type = 'password';
  inputPasswordCurrent.id = 'txtPasswordCurrent';

  const labelPasswordNew = document.createElement('label');
  labelPasswordNew.className = 'control-label';
  labelPasswordNew.innerText = 'Ingrese su Nueva contraseña';
  const inputPasswordNew = document.createElement('input');
  inputPasswordNew.type = 'password';
  inputPasswordNew.id = 'txtPasswordNew';

  const labelPasswordNewRepeat = document.createElement('label');
  labelPasswordNewRepeat.className = 'control-label';
  labelPasswordNewRepeat.innerText = 'Repita su Nueva contraseña';
  const inputPasswordNewRepeat = document.createElement('input');
  inputPasswordNewRepeat.type = 'password';
  inputPasswordNewRepeat.id = 'txtPasswordNewRepeat';

  const divEditPassword = document.createElement('div');
  divEditPassword.className = 'text-center';
  const buttonSaveChanges = document.createElement('button');
  buttonSaveChanges.className = 'button-form';
  buttonSaveChanges.innerText = 'Guardar Cambios ';
  buttonSaveChanges.addEventListener('click', () => (configurationPassword()));

  sectionChangePassword.appendChild(divChangePassword);
  divChangePassword.appendChild(titleChangePassword);
  divChangePassword.appendChild(labelPasswordCurrent);
  labelPasswordCurrent.appendChild(inputPasswordCurrent);
  divChangePassword.appendChild(labelPasswordNew);
  labelPasswordNew.appendChild(inputPasswordNew);
  divChangePassword.appendChild(labelPasswordNewRepeat);
  labelPasswordNewRepeat.appendChild(inputPasswordNewRepeat);
  divChangePassword.appendChild(divEditPassword);
  divEditPassword.appendChild(buttonSaveChanges);

  return sectionChangePassword;
};
