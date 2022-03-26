// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
// eslint-disable-next-line import/no-cycle
import { register } from '../auth.js';
import { dataUser, reviewResult } from '../cloudFirebase.js';

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
  const title = document.createElement('h3');
  title.innerText = 'REGISTRO DE USUARIO';

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
  inputEmail.type = 'email';

  const labelPassword = document.createElement('label');
  labelPassword.className = 'label-form';
  labelPassword.innerText = 'Contraseña';
  const divPassword = document.createElement('div');
  divPassword.className = 'input-form div-form';
  const inputPassword = document.createElement('input');
  inputPassword.className = 'input-password';
  inputPassword.id = 'inputPassword';
  inputPassword.type = 'password';

  const icoEye = document.createElement('i');
  icoEye.className = 'ico-eye-hide';
  icoEye.addEventListener('click', () => { if (icoEye.className === 'ico-eye-hide') { icoEye.className = 'ico-eye'; inputPassword.type = 'text'; } else { icoEye.className = 'ico-eye-hide'; inputPassword.type = 'password'; } });
  const divLevelSecurity = document.createElement('div');
  divLevelSecurity.className = 'input-form div-level-low';
  inputPassword.addEventListener('keyup', () => {
    if (inputPassword.value.length > 6) {
      divLevelSecurity.className = 'input-form div-level-medium';
    } else {
      divLevelSecurity.className = 'input-form div-level-low';
    }
    //console.log(inputPassword.value);
  });

  const labelConfirmPassword = document.createElement('label');
  labelConfirmPassword.className = 'label-form';
  labelConfirmPassword.innerText = 'Confirmar contraseña';
  const divConfirmPassword = document.createElement('div');
  divConfirmPassword.className = 'input-form div-form';
  const inputConfirmPassword = document.createElement('input');
  inputConfirmPassword.className = 'input-password';
  inputConfirmPassword.id = 'inputConfirmPassword';
  inputConfirmPassword.type = 'password';
  inputConfirmPassword.addEventListener('keyup', () => { // console.log(inputConfirmPassword.value);
  });
  const icoEyeConfirm = document.createElement('i');
  icoEyeConfirm.className = 'ico-eye-hide';
  icoEyeConfirm.addEventListener('click', () => { if (icoEyeConfirm.className === 'ico-eye-hide') { icoEyeConfirm.className = 'ico-eye'; inputConfirmPassword.type = 'text'; } else { icoEyeConfirm.className = 'ico-eye-hide'; inputConfirmPassword.type = 'password'; } });

  const labelDateOfBirth = document.createElement('label');
  labelDateOfBirth.className = 'label-form';
  labelDateOfBirth.innerText = 'Fecha de nacimiento';
  const inputDateOfBirth = document.createElement('input');
  inputDateOfBirth.type = 'date';
  inputDateOfBirth.className = 'input-form';

  const labelCellphone = document.createElement('label');
  labelCellphone.className = 'label-form';
  labelCellphone.innerText = 'Celular';
  const inputCellphone = document.createElement('input');
  inputCellphone.className = 'input-form';
  // boton se registrar
  const divButtons = document.createElement('div');
  divButtons.className = 'text-center';
  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'button-form';
  buttonRegister.innerText = 'Registrar';
  // boton de iniciar sesión
  const buttonReturn = document.createElement('button');
  buttonReturn.className = 'button-form';
  buttonReturn.innerText = 'Iniciar sesión';
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
  divContent.appendChild(divLevelSecurity);

  divContent.appendChild(labelConfirmPassword);
  divConfirmPassword.appendChild(inputConfirmPassword);
  divConfirmPassword.appendChild(icoEyeConfirm);
  divContent.appendChild(divConfirmPassword);

  divContent.appendChild(labelDateOfBirth);
  divContent.appendChild(inputDateOfBirth);
  divContent.appendChild(labelCellphone);
  divContent.appendChild(inputCellphone);

  divButtons.appendChild(buttonRegister);
  divButtons.appendChild(buttonReturn);
  divContent.appendChild(divButtons);
  divContent.appendChild(divEmailHide);

  sectionRegister.appendChild(divHeader);
  sectionRegister.appendChild(divContent);

  buttonRegister.addEventListener('click', () => {
    // eslint-disable-next-line max-len
    //dataUser(inputName.value, inputEmail.value, inputPassword.value, inputDateOfBirth.value, inputCellphone.value); // enviando datos de usuario a dataUser y a register
    register(inputName.value, inputEmail.value, inputPassword.value, inputDateOfBirth.value, inputCellphone.value); // para agregar nuevo usuario
    reviewResult(); // leer datos que se agregan del nuevo usuario en la consola de firebase
    onNavigate('/');
  });
  return sectionRegister;
};
