// eslint-disable-next-line import/no-cycle
import { cerrarSesion } from '../auth.js';

export const headerTemplate = () => {
  const headerdiv = document.createElement('header');
  // CONTENEDOR DIV( FOTO,NAME,SEARCH)
  const divContainerSearchPhoto = document.createElement('div');
  divContainerSearchPhoto.className = 'container-search-photo-nav';
  // contenedor de foto y nombre
  const figureNamePhoto = document.createElement('figure');
  figureNamePhoto.className = 'photo-user-container';
  const aPhoto = document.createElement('a');
  aPhoto.href = '/profile';
  const imgUser = document.createElement('img');
  imgUser.className = 'photo-user';
  imgUser.id = 'imagenUsuario';
  imgUser.src = 'img/profile-user.png';
  imgUser.alt = 'foto de perfil';
  const figcaptionName = document.createElement('figcaption');
  figcaptionName.innerText = 'user.name';
  // contenedor del buscador
  const containerSearch = document.createElement('div');
  containerSearch.className = 'container-search';
  const inputSearch = document.createElement('input');
  inputSearch.className = 'input-search';
  inputSearch.placeholder = 'Buscar';

  const imgSearch = document.createElement('img');
  imgSearch.className = 'search-logo';
  imgSearch.src = 'img/search-logo.png';
  imgSearch.alt = 'lupita';

  // agregando elementos pequeños a contenedores
  aPhoto.appendChild(imgUser);
  figureNamePhoto.appendChild(aPhoto);
  figureNamePhoto.appendChild(figcaptionName);

  containerSearch.appendChild(inputSearch);
  containerSearch.appendChild(imgSearch);

  // CONTENEDOR NAV
  const containerNav = document.createElement('nav');
  containerNav.className = 'container-search-photo-nav width-content';
  const aWall = document.createElement('a');
  aWall.href = '/feed';
  const imgWall = document.createElement('img');
  imgWall.className = 'logo-wall';
  imgWall.src = 'img/web-content.png';
  imgWall.alt = 'logo para el muro';

  const imgComputer = document.createElement('img');
  imgComputer.className = 'logo-computer';
  imgComputer.src = 'img/logo3.png';
  imgComputer.alt = 'una computadora(logo de aplicación)';
  // navegador oculto
  const lines = document.createElement('label');
  lines.className = 'nav-lines';
  lines.innerHTML = '&#8801';
  const containerNavHide = document.createElement('div');
  containerNavHide.className = 'container-options-nav';
  containerNavHide.id = 'optionsNav';
  containerNavHide.style.display = 'none';

  const ulNavHide = document.createElement('ul');
  ulNavHide.className = 'ul-nav';

  const liConfig = document.createElement('li');
  const aConfig = document.createElement('a');
  aConfig.href = '#';
  aConfig.innerText = 'Configurar cuenta';

  const liDelete = document.createElement('li');
  const aDelete = document.createElement('a');
  aDelete.href = '#';
  aDelete.innerText = 'Eliminar cuenta';

  const liPrivate = document.createElement('li');
  const aPrivate = document.createElement('a');
  aPrivate.href = '#';
  aPrivate.innerText = 'Privacidad';

  const liClose = document.createElement('li');
  const aClose = document.createElement('a');
  aClose.href = '#';
  aClose.innerText = 'Cerrar cuenta';
  aClose.addEventListener('click', () => {
    cerrarSesion();
  });

  // agregando a contenedor mediano
  divContainerSearchPhoto.appendChild(imgComputer);
  divContainerSearchPhoto.appendChild(containerSearch);
  // agregando elementos pequeños a contenedores
  aWall.appendChild(imgWall);
  liConfig.appendChild(aConfig);
  liDelete.appendChild(aDelete);
  liPrivate.appendChild(aPrivate);
  liClose.appendChild(aClose);
  // agregando a contenedor mediano
  ulNavHide.appendChild(liConfig);
  ulNavHide.appendChild(liDelete);
  ulNavHide.appendChild(liPrivate);
  ulNavHide.appendChild(liClose);

  containerNavHide.appendChild(ulNavHide);
  // agregando contenido al nav
  containerNav.appendChild(aWall);
  containerNav.appendChild(figureNamePhoto);
  containerNav.appendChild(lines);
  containerNav.appendChild(containerNavHide);

  // agregando al header
  // headerdiv.appendChild(divContainerSearchPhoto);
  headerdiv.appendChild(divContainerSearchPhoto);
  headerdiv.appendChild(containerNav);

  // evento para aparecer el nav
  const open = 'block';
  const close = 'none';
  lines.addEventListener('click', () => {
    console.log(containerNavHide.style.display);
    // eslint-disable-next-line no-cond-assign
    if (containerNavHide.style.display = close) {
      // eslint-disable-next-line no-unused-expressions
      containerNavHide.style.display = open;
    } else {
      // eslint-disable-next-line no-unused-expressions
      containerNavHide.style.display = close;
    }
  });

  return headerdiv;
};

/* export const feedTemplate = `<!-- para el buscador-->
<header>
<div class="container-search-photo-nav">
    <figure>
<a href = "/profile"><img id="userPhoto" class='photo-user' src='img/profile-user.png' alt"></a>
    <figcaption id="nameUser" class="">Username</figcaption>
    </figure>
    <div class="container-search">
        <input class="input-search" placeholder=" Buscar"/>
        <img class="search-logo" src="img/search-logo.png" alt="lupita">
    </div>
</div >

<!-- para la navegación -->
<nav class="container-search-photo-nav width-content">
    <img class="logo-wall"  src="img/web-content.png" alt="logo para el muro">
    <img class="logo-computer" src="img/logo.png" alt="una computadora(logo de aplicación)">

      <div><label class="nav-lines" id="checkLabelShow"> &#8801 </label>
          <ul class="container-options-nav"   >
              <li><a href="#" id="">Configurar cuenta</a></li>
              <li><a href="#" id="">Eliminar cuenta</a> </li>
              <li><a href="#" id="">Privacidad</a> </li>
              <li><a href="#" id="">Cerrar cuenta</a></li>

          </ul>
      </div>

</nav>
</header>
`; */
