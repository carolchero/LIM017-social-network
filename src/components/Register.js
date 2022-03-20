// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

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

  const labelNombre = document.createElement('label');
  labelNombre.className = 'label-form';
  labelNombre.innerText = 'Nombre';
  const inputNombre = document.createElement('input');
  inputNombre.className = 'input-form';

  const labelCorreo = document.createElement('label');
  labelCorreo.className = 'label-form';
  labelCorreo.innerText = 'Correo';
  const inputCorreo = document.createElement('input');
  inputCorreo.className = 'input-form';

  const labelPassword = document.createElement('label');
  labelPassword.className = 'label-form';
  labelPassword.innerText = 'Password';
  const inputPassword = document.createElement('input');
  inputPassword.className = 'input-form';

  const labelConfirmarPassword = document.createElement('label');
  labelConfirmarPassword.className = 'label-form';
  labelConfirmarPassword.innerText = 'ConfirmarPassword';
  const inputConfirmarPassword = document.createElement('input');
  inputConfirmarPassword.className = 'input-form';

  const labelFechaNacimiento = document.createElement('label');
  labelFechaNacimiento.className = 'label-form';
  labelFechaNacimiento.innerText = 'FechaNacimiento';
  const inputFechaNacimiento = document.createElement('input');
  inputFechaNacimiento.className = 'input-form';

  const labelCelular = document.createElement('label');
  labelCelular.className = 'label-form';
  labelCelular.innerText = 'Celular';
  const inputCelular = document.createElement('input');
  inputCelular.className = 'input-form';

  const labelFoto = document.createElement('label');
  labelFoto.className = 'label-form';
  labelFoto.innerText = 'Foto';
  const inputFoto = document.createElement('input');
  inputFoto.className = 'input-form';

  const divButtons = document.createElement('div');
  divButtons.className = 'text-center';
  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'button-form';
  buttonRegister.innerText = 'Register';
  buttonRegister.addEventListener('click', () => onNavigate('/'));
  const buttonReturn = document.createElement('button');
  buttonReturn.className = 'button-form';
  buttonReturn.innerText = 'Return';
  buttonReturn.addEventListener('click', () => onNavigate('/'));

  divHeader.appendChild(imgLogo);
  divContent.appendChild(title);

  divContent.appendChild(labelNombre);
  divContent.appendChild(inputNombre);
  divContent.appendChild(labelCorreo);
  divContent.appendChild(inputCorreo);
  divContent.appendChild(labelPassword);
  divContent.appendChild(inputPassword);
  divContent.appendChild(labelConfirmarPassword);
  divContent.appendChild(inputConfirmarPassword);
  divContent.appendChild(labelFechaNacimiento);
  divContent.appendChild(inputFechaNacimiento);
  divContent.appendChild(labelCelular);
  divContent.appendChild(inputCelular);
  divContent.appendChild(labelFoto);
  divContent.appendChild(inputFoto);

  divButtons.appendChild(buttonRegister);
  divButtons.appendChild(buttonReturn);
  divContent.appendChild(divButtons);

  sectionRegister.appendChild(divHeader);
  sectionRegister.appendChild(divContent);

  return sectionRegister;
};
