// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Login = () => {
  const divLogin = document.createElement('section');
  divLogin.className = 'full-page login-page';
  const divContainer = document.createElement('div');
  divContainer.className = 'container';
  const divCard = document.createElement('div');
  divCard.className = 'card';

  const divCardHeader = document.createElement('div');
  divCardHeader.className = 'card-header text-center';
  const imgLogo = document.createElement('img');
  imgLogo.className = 'img-login';
  imgLogo.src = 'img/logo5.png';
  imgLogo.addEventListener('click', () => onNavigate('/'));

  const title = document.createElement('p');
  title.className = 'text-center';
  title.innerText = 'Iniciar Sesión';

  const divCardContent = document.createElement('div');
  divCardContent.className = 'card-content';

  const inputGroupUser = document.createElement('div');
  inputGroupUser.className = 'input-group';
  const spanIcoUser = document.createElement('span');
  spanIcoUser.className = 'input-group-ico';
  const icoUser = document.createElement('i');
  icoUser.className = 'ico-user';
  const labelUser = document.createElement('label');
  labelUser.className = 'control-label';
  labelUser.innerText = 'Ingrese Usuario';
  const inputUser = document.createElement('input');
  inputUser.type = 'text';
  inputUser.autocomplete = 'off';
  inputUser.className = 'input-login';
  inputUser.name = 'txtUser';
  inputUser.id = 'txtUser';

  const inputGroupPassword = document.createElement('div');
  inputGroupPassword.className = 'input-group';
  const spanIcoPassword = document.createElement('span');
  spanIcoPassword.className = 'input-group-ico';
  const icoPassword = document.createElement('i');
  icoPassword.className = 'ico-lock';
  const labelPassword = document.createElement('label');
  labelPassword.className = 'control-label';
  labelPassword.innerText = 'Ingrese Contraseña';
  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.autocomplete = 'off';
  inputPassword.className = 'input-login';
  inputPassword.name = 'txtPassword';
  inputPassword.id = 'txtPassword';

  const divCardFooter = document.createElement('div');
  divCardFooter.className = 'text-center';
  const buttonLogIn = document.createElement('button');
  buttonLogIn.className = 'buttonLogin';
  buttonLogIn.innerText = 'Log in';
  const buttonSignUp = document.createElement('button');
  buttonSignUp.className = 'buttonLogin';
  buttonSignUp.innerText = 'Sign Up';
  buttonSignUp.addEventListener('click', () => onNavigate('/register'));
  const linkLogin = document.createElement('a');
  linkLogin.className = 'link-login';
  linkLogin.href = '#';
  linkLogin.innerText = '¿Olvidaste tu contraseña?';

  divCardHeader.appendChild(imgLogo);

  spanIcoUser.appendChild(icoUser);
  inputGroupUser.appendChild(spanIcoUser);
  inputGroupUser.appendChild(labelUser);
  inputGroupUser.appendChild(inputUser);

  spanIcoPassword.appendChild(icoPassword);
  inputGroupPassword.appendChild(spanIcoPassword);
  inputGroupPassword.appendChild(labelPassword);
  inputGroupPassword.appendChild(inputPassword);

  divCardContent.appendChild(inputGroupUser);
  divCardContent.appendChild(inputGroupPassword);

  divCardFooter.appendChild(buttonLogIn);
  divCardFooter.appendChild(buttonSignUp);
  divCardFooter.appendChild(linkLogin);

  divCard.appendChild(divCardHeader);
  divCard.appendChild(title);
  divCard.appendChild(divCardContent);
  divCard.appendChild(divCardFooter);

  divContainer.appendChild(divCard);
  divLogin.appendChild(divContainer);
  return divLogin;
};
