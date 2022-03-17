// Este es el punto de entrada de tu aplicacion

/* import { myFunction } from './lib/index.js';

myFunction();
 */
import { Home } from './components/Home.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Home,
  '/register': Register,
  '/Login': Login,
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
