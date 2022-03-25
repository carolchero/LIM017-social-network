// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { feedTemplate } from './Header.js';

export const Feed = () => {
  const divFeed = document.createElement('div');
  divFeed.className = 'container-feed'; // contenedor general
  const feedTemplate2 = document.createElement('main');
  feedTemplate2.className = 'container-publication';

  const headerdiv = document.createElement('header');

  // CONTENEDOR DIV( FOTO,NAME,SEARCH)
  const divContainerSearchPhoto = document.createElement('div');
  divContainerSearchPhoto.className = 'container-search-photo-nav';
  // contenedor de foto y nombre
  const figureNamePhoto = document.createElement('figure');
  const aPhoto = document.createElement('a');
  aPhoto.href = '/profile';
  const imgUser = document.createElement('img');
  imgUser.className = 'photo-user';
  imgUser.src = 'img/profile-user.png';
  imgUser.alt = 'foto de perfil';
  const figcaptionName = document.createElement('figcaption');
  figcaptionName.innerText = 'Username';
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
  // agregando a contenedor mediano
  divContainerSearchPhoto.appendChild(figureNamePhoto);
  divContainerSearchPhoto.appendChild(containerSearch);

  // CONTENEDOR NAV
  const containerNav = document.createElement('nav');
  containerNav.className = 'container-search-photo-nav width-content';
  const imgWall = document.createElement('img');
  imgWall.className = 'logo-wall';
  imgWall.src = 'img/web-content.png';
  imgWall.alt = 'logo para el muro';

  const imgComputer = document.createElement('img');
  imgComputer.className = 'logo-computer';
  imgComputer.src = 'img/logo5.png';
  imgComputer.alt = 'una computadora(logo de aplicación)';
  // navegador oculto
  const containerNavHide = document.createElement('div');
  const lines = document.createElement('label');
  lines.className = 'nav-lines';
  lines.innerHTML = '&#8801';
  const ulNavHide = document.createElement('ul');
  ulNavHide.className = 'container-options-nav';

  const liConfig = document.createElement('li');
  const aConfig = document.createElement('a');
  aConfig.href = '#';

  const liDelete = document.createElement('li');
  const aDelete = document.createElement('a');
  aDelete.href = '#';

  const liPrivate = document.createElement('li');
  const aPrivate = document.createElement('a');
  aPrivate.href = '#';

  const liClose = document.createElement('li');
  const aClose = document.createElement('a');
  aClose.href = '#';

  // agregando elementos pequeños a contenedores
  liConfig.appendChild(aConfig);
  liDelete.appendChild(aDelete);
  liPrivate.appendChild(aPrivate);
  liClose.appendChild(aClose);
  // agregando a contenedor mediano
  ulNavHide.appendChild(liConfig);
  ulNavHide.appendChild(liDelete);
  ulNavHide.appendChild(liPrivate);
  ulNavHide.appendChild(liClose);

  containerNavHide.appendChild(lines);
  containerNavHide.appendChild(ulNavHide);
  // agregando contenido al nav
  containerNav.appendChild(imgWall);
  containerNav.appendChild(imgComputer);
  containerNav.appendChild(containerNavHide);

  // agregando al header
  headerdiv.appendChild(divContainerSearchPhoto);
  headerdiv.appendChild(containerNav);

  /* PUBLICACIÓN DE USUARIO */
  const sectionPublication = document.createElement('section');
  sectionPublication.className = 'container-publication';
  const figureSection = document.createElement('figure');
  // foto de usuario
  const imgPhotoUser = document.createElement('img');
  imgPhotoUser.className = 'photo-user';
  imgPhotoUser.src = 'img/profile-user.png';
  imgPhotoUser.alt = 'foto de perfil';
  const figcaptionUser = document.createElement('figcaption');
  figcaptionUser.innerText = 'Username';
  // inputs de publicación
  const inputTitle = document.createElement('input');
  inputTitle.placeholder = 'Titulo de publicación';
  const inputText = document.createElement('input');
  inputText.placeholder = 'Escriba su texto aqui';
  // logos de publicación
  const containerLogosButton = document.createElement('div');
  const imgShareImage = document.createElement('img');
  imgShareImage.className = 'share-image-logo logo-publication';
  imgShareImage.src = 'img/insertar-icono-de-imagen.png';
  imgShareImage.alt = 'logo para agregar imagenes a la publicación';

  const imgShareStickers = document.createElement('img');
  imgShareStickers.className = 'share-stickers-logo logo-publication';
  imgShareStickers.src = 'img/emoticon-sonrisa.png';
  imgShareStickers.alt = 'logo para agregar stickers a la publicación';

  const imgTrash = document.createElement('img');
  imgTrash.className = 'share-trash-logo logo-publication';
  imgTrash.src = 'img/icons8-trash-30.png';
  imgTrash.alt = 'logo para eliminar publicación';

  const buttonPublication = document.createElement('button');
  buttonPublication.innerText = 'Publicar';

  // agregando contenedores pequeños a medianos
  figureSection.appendChild(imgPhotoUser);
  figureSection.appendChild(figcaptionUser);

  containerLogosButton.appendChild(imgShareImage);
  containerLogosButton.appendChild(imgShareStickers);
  containerLogosButton.appendChild(imgTrash);
  containerLogosButton.appendChild(buttonPublication);

  // agregando contenedores pequeños a medianos
  sectionPublication.appendChild(figureSection);
  sectionPublication.appendChild(inputTitle);
  sectionPublication.appendChild(inputText);
  sectionPublication.appendChild(containerLogosButton);
  // agregando publicación de usuario a main
  feedTemplate2.appendChild(sectionPublication);

  // divFeed.appendChild(feedTemplate);
  divFeed.appendChild(headerdiv);
  divFeed.appendChild(feedTemplate2);
  return divFeed;
};
/*
<main class="container-publication">
<!--publicación del usuario-->
<section class="container-publication">
   <figure>
       <img id="" class="photo-user-publication" src='profile-user.png' alt="foto de perfil">
       <figcaption id="" class="">Username</figcaption>
   </figure>
   <input placeholder="Titulo de publicación"/>
   <input placeholder="Escriba su texto aqui"/>
   <div>
       <img id="" class="share-image-logo logo-publication" src='insertar-icono-de-imagen.png' alt="logo para agregar imagenes a la publicación">
       <img id="" class="share-stickers-logo logo-publication" src='emoticon-sonrisa.png' alt="logo para agregar stickers a la publicación">
       <img id="" class="share-trash-logo logo-publication" src='icons8-trash-30.png' alt="logo para eliminar publicación">
       <button> Publicar </button>
   </div>
</section>


<!--publicación de otros usuarios-->

</main> */
