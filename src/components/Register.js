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


  const inputPassword = document.createElement('input');
  inputPassword.className = 'input-form';
  inputPassword.type = 'password';

  const labelConfirmPassword = document.createElement('label');
  labelConfirmPassword.className = 'label-form';
  labelConfirmPassword.innerText = 'Confirmar password';
  const inputConfirmPassword = document.createElement('input');
  inputConfirmPassword.className = 'input-form';
  inputConfirmPassword.type = 'password';

  const labelDateOfBirth = document.createElement('label');
  labelDateOfBirth.className = 'label-form';
  labelDateOfBirth.innerText = 'Fecha de nacimiento';
  const inputDateOfBirth = document.createElement('input');
  inputDateOfBirth.className = 'input-form';
  inputDateOfBirth.type = 'date';

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
  divContent.appendChild(inputPassword);
  divContent.appendChild(labelConfirmPassword);
  divContent.appendChild(inputConfirmPassword);
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
