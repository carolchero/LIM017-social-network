// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
import { publications } from './Publication.js';
import { publicationBeforeTemplate } from './PublicationBefore.js';
import { onGetPublication } from '../cloudFirebase.js';

export const Feed = () => {
  const divFeed = document.createElement('div');
  divFeed.className = 'container-feed'; // contenedor general
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';

  // mainTemplate.appendChild(publications());

  onGetPublication((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      const publicationNew = doc.data();
      html += `
          <section class= 'container-publication-final' >
            <div class = 'container-user-edit direction' >
               <figure class = figure-name-photo direction' >
                   <img class= 'photo-user-pub' src='img/profile-user.png' alt='foto de perfil'>
                   <figcaption>Username</figcaption>
               </figure>
               <img class= 'share-edit-logo logo-publication' src='img/escribir.png' alt='logo para editar'>
               <img class= 'share-trash-logo logo-publication' src='img/icons8-trash-30.png' alt='logo para eliminar publicación'>
            </div>
            <p>${publicationNew.title}</p>
            <p  class= 'input-text-publication' >${publicationNew.text}</p>
            <div class = 'logos-like-love direction' >
               <img class= 'like-logo logo-publication' src='img/icons8-like-64.png' alt='logo para dar me encanta'>
               <img class= 'love-logo logo-publication' src='img/corazones.png' alt='logo para dar love'>
            </div>
          </section>
        `;
    });
    mainTemplate.innerHTML = html;
  });

  divFeed.appendChild(headerTemplate());
  divFeed.appendChild(publicationBeforeTemplate());
  divFeed.appendChild(mainTemplate);

  return divFeed;
};
