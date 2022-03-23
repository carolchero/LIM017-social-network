import './lib/firebase.js';
// Este es el punto de entrada de tu aplicacion
// import { getUser } from './lib/firebase.js';
/* import { myFunction } from './lib/index.js';
myFunction();
 */
// eslint-disable-next-line import/no-cycle
import { Register } from './components/Register.js';
// eslint-disable-next-line import/no-cycle
import { Login } from './components/Login.js';
// eslint-disable-next-line import/no-cycle
import { Feed } from './components/Feed.js';
// eslint-disable-next-line import/no-cycle
import { Profile } from './components/Profile.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Login,
  '/register': Register,
  '/feed': Feed,
  '/profile': Profile,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[pathname]());
};

const component = routes[window.location.pathname]; // sale ruta

window.onpopstate = () => {
  rootDiv.appendChild(component());
};

rootDiv.appendChild(component());

// firebase
