// eslint-disable-next-line import/no-cycle
import { restorePassword } from '../lib/auth.js';
import { onNavigate } from '../Router.js';

export const ResetPassword = () => {
  const sectionRestPassword = document.createElement('section');
  sectionRestPassword.className = 'container-publication';
  const titleHeader = document.createElement('h2');
  titleHeader.className = 'text-center';
  titleHeader.innerText = 'Recupera tu cuenta';
  const titleMain = document.createElement('div');
  titleMain.className = 'text-center';
  titleMain.innerText = 'Ingresa tu correo electrónico  para buscar tu cuenta.';
  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'text';
  inputCorreo.autocomplete = 'off';
  inputCorreo.className = 'input-login';
  inputCorreo.name = 'txtUser';
  inputCorreo.id = 'txtCorreo';
  inputCorreo.placeholder = 'Correo electrónico';
  const buttonRecuperarCuenta = document.createElement('button');
  buttonRecuperarCuenta.className = 'button-form';
  buttonRecuperarCuenta.innerText = 'Continuar ';
  buttonRecuperarCuenta.addEventListener('click', () => {
    restorePassword();
    onNavigate('/');
  });

  // creando div oculto
  const divHideMessage = document.createElement('div');
  divHideMessage.id = 'messageHideCorreo';
  const messageError = document.createElement('p');
  messageError.innerText = 'Tiene que ingresar un correo válido';
  divHideMessage.appendChild(messageError);

  sectionRestPassword.appendChild(titleHeader);
  titleHeader.appendChild(titleMain);
  titleMain.appendChild(inputCorreo);
  titleMain.appendChild(buttonRecuperarCuenta);
  return sectionRestPassword;
};

// <h2 className="uiHeaderTitle" aria-hidden="true">Recupera tu cuenta</h2>
// <div className="_9nq2 marginBottom16px">Ingresa tu correo electrónico o número de celular para
//   buscar tu cuenta.</div>
// <input type="text" className="inputtext _9o1w" id="identify_email" name="email"
//        placeholder="Correo electrónico o número de celular" autoFocus="1"
//        aria-label="Correo electrónico o número de celular">
// <div>
//   <div>
//     <a role="button" className="_42ft _4jy0 _9nq1 textPadding20px _4jy3 _517h _51sy"
//        href="/login.php">Cancelar</a>
//
//     <button value="1" className="_42ft _4jy0 _9nq0 textPadding20px _4jy3 _4jy1 selected _51sy"
//             type="submit" name="did_submit" id="did_submit">Buscar
//     </button>
//   </div>
//
// </div>
//
//   .clearfix {
//   zoom: 1;
// }
