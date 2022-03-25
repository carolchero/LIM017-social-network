// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { feedTemplate } from './Header.js';

export const Feed = () => {
  const divFeed = document.createElement('div');
  divFeed.className = 'container-feed';
  const feedTemplate2 = `<main class="container-publication">
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

 <section>

 </section>
</main>
`;
  divFeed.innerHTML = feedTemplate + feedTemplate2;
  return divFeed;
};
