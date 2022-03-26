// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { headerTemplate } from './Header.js';

export const Feed = () => {
  const divFeed = document.createElement('div');
  divFeed.className = 'container-feed'; // contenedor general
  const feedTemplate2 = document.createElement('main');
  feedTemplate2.className = 'container-publication';

  /* PUBLICACIÓN DE USUARIO */
  const sectionPublication = document.createElement('section');
  sectionPublication.className = 'container-publication-section';
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
  inputText.className = 'input-text-publication';
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
  divFeed.appendChild(headerTemplate());
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
