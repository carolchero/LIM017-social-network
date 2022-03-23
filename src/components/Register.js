// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
// eslint-disable-next-line import/no-cycle
import { register } from '../auth.js';

export const Register = () => {
  const sectionRegister = document.createElement('section');
  sectionRegister.id = 'pageCreate';

  const divHeader = document.createElement('div');
  divHeader.id = 'pageCreateHeader';
  const imgLogo = document.createElement('img');
  imgLogo.className = 'img-create';
  imgLogo.src = 'img/logo5.png';

  const divContent = document.createElement('div');
  divContent.id = 'pageCreateContent';
  const title = document.createElement('h1');
  title.innerText = 'REGISTER USER';

  const labelName = document.createElement('label');
  labelName.className = 'label-form';
  labelName.innerText = 'Nombre';
  const inputName = document.createElement('input');
  inputName.className = 'input-form';

  const labelEmail = document.createElement('label');
  labelEmail.className = 'label-form';
  labelEmail.innerText = 'Correo';
  const inputEmail = document.createElement('input');
  inputEmail.className = 'input-form';

  const labelPassword = document.createElement('label');
  labelPassword.className = 'label-form';
  labelPassword.innerText = 'Password';
  const divPassword = document.createElement('div');
  divPassword.className = 'input-form div-form';
  const inputPassword = document.createElement('input');
  inputPassword.className = 'input-password';
  inputPassword.id = 'inputPassword';
  inputPassword.type = 'password';
  inputPassword.addEventListener('keyup', () => {
    console.log(inputPassword.value);
  });
  const icoEye = document.createElement('i');
  icoEye.className = 'ico-eye-hide';
  icoEye.addEventListener('click', () => { if (icoEye.className === 'ico-eye-hide') { icoEye.className = 'ico-eye'; inputPassword.type = 'text'; } else { icoEye.className = 'ico-eye-hide'; inputPassword.type = 'password'; } });

  const labelConfirmPassword = document.createElement('label');
  labelConfirmPassword.className = 'label-form';
  labelConfirmPassword.innerText = 'Confirmar password';
  const divConfirmPassword = document.createElement('div');
  divConfirmPassword.className = 'input-form div-form';
  const inputConfirmPassword = document.createElement('input');
  inputConfirmPassword.className = 'input-password';
  inputConfirmPassword.id = 'inputConfirmPassword';
  inputConfirmPassword.type = 'password';
  inputConfirmPassword.addEventListener('keyup', () => {
    console.log(inputConfirmPassword.value);
  });
  const icoEyeConfirm = document.createElement('i');
  icoEyeConfirm.className = 'ico-eye-hide';
  icoEyeConfirm.addEventListener('click', () => { if (icoEyeConfirm.className === 'ico-eye-hide') { icoEyeConfirm.className = 'ico-eye'; inputConfirmPassword.type = 'text'; } else { icoEyeConfirm.className = 'ico-eye-hide'; inputConfirmPassword.type = 'password'; } });

  const labelDateOfBirth = document.createElement('label');
  labelDateOfBirth.className = 'label-form';
  labelDateOfBirth.innerText = 'Fecha de nacimiento';
  const inputDateOfBirth = document.createElement('input');
  inputDateOfBirth.type = '';
  inputDateOfBirth.className = 'input-form';

  const labelCellphone = document.createElement('label');
  labelCellphone.className = 'label-form';
  labelCellphone.innerText = 'Celular';
  const inputCellphone = document.createElement('input');
  inputCellphone.className = 'input-form';

  const labelPhoto = document.createElement('label');
  labelPhoto.className = 'label-form';
  labelPhoto.innerText = 'Foto';
  const inputPhoto = document.createElement('input');
  inputPhoto.className = 'input-form';

  const divButtons = document.createElement('div');
  divButtons.className = 'text-center';
  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'button-form';
  buttonRegister.innerText = 'Register';
  buttonRegister.addEventListener('click', () => register(inputEmail.value, inputPassword.value));
  const buttonReturn = document.createElement('button');
  buttonReturn.className = 'button-form';
  buttonReturn.innerText = 'Return';
  buttonReturn.addEventListener('click', () => onNavigate('/'));

  // creando div oculto
  const divEmailHide = document.createElement('div');
  divEmailHide.id = 'messageEmailHide';
  const messageError = document.createElement('p');
  messageError.innerText = 'Correo invalido';
  divEmailHide.appendChild(messageError);
  // validando correo
  /* const regexEmail = new RegExp('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
  function validy() {
    console.log(inputEmail.value);
    console.log('regex sin avlue es: ' + regexEmail.test(inputEmail));
    console.log('regex completo es: ' + regexEmail.test(inputEmail.value));
    // eslint-disable-next-line no-unused-expressions
    !regexEmail.test(inputEmail.value) ? divEmailHide.style.display = 'block' : divEmailHide.style.display = 'none';
  }
  inputEmail.addEventListener('keyup', validy);
 */
  divHeader.appendChild(imgLogo);
  divContent.appendChild(title);

  divContent.appendChild(labelName);
  divContent.appendChild(inputName);
  divContent.appendChild(labelEmail);
  divContent.appendChild(inputEmail);

  divContent.appendChild(labelPassword);
  divPassword.appendChild(inputPassword);
  divPassword.appendChild(icoEye);
  divContent.appendChild(divPassword);

  divContent.appendChild(labelConfirmPassword);
  divConfirmPassword.appendChild(inputConfirmPassword);
  divConfirmPassword.appendChild(icoEyeConfirm);
  divContent.appendChild(divConfirmPassword);

  divContent.appendChild(labelDateOfBirth);
  divContent.appendChild(inputDateOfBirth);
  divContent.appendChild(labelCellphone);
  divContent.appendChild(inputCellphone);
  divContent.appendChild(labelPhoto);
  divContent.appendChild(inputPhoto);

  divButtons.appendChild(buttonRegister);
  divButtons.appendChild(buttonReturn);
  divContent.appendChild(divButtons);
  divContent.appendChild(divEmailHide);

  sectionRegister.appendChild(divHeader);
  sectionRegister.appendChild(divContent);

  return sectionRegister;
};
