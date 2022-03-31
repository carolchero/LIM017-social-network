// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
import { publicationBeforeTemplate } from './PublicationBefore.js';
import { onGetPublication, deletePublication, getOnlyPublication } from '../cloudFirebase.js';

/* export const conditionUpdate = false;
let id; */

export const Feed = () => {
  const divFeed = document.createElement('div');
  divFeed.className = 'container-feed'; // contenedor general
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';

  onGetPublication((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      const publicationNew = doc.data();
      if (publicationNew.uid === sessionStorage.getItem('uid')) {
        html += `
        <section class= 'container-publication-final' >
          <div class = 'container-user-edit direction' >
             <figure class = figure-name-photo direction' >
                 <img class= 'photo-user-pub' src='img/profile-user.png' alt='foto de perfil'>
                 <figcaption>Username</figcaption>
             </figure>
             <img class= 'share-edit-logo logo-publication' data-id='${doc.id}' src='img/escribir.png' alt='logo para editar'>
             <img class= 'share-trash-logo logo-publication' data-id='${doc.id}' src='img/icons8-trash-30.png' alt='logo para eliminar publicación'>
          </div>
          <p>${publicationNew.title}</p>
          <p  class= 'input-text-publication' >${publicationNew.text}</p>
          <div class = 'logos-like-love direction' >
             <img class= 'like-logo logo-publication' src='img/icons8-like-64.png' alt='logo para dar me encanta'>
             <img class= 'love-logo logo-publication' src='img/corazones.png' alt='logo para dar love'>
          </div>
        </section>
      `;
      } else {
        html += `
        <section class= 'container-publication-final' >
          <div class = 'container-user-edit direction' >
             <figure class = figure-name-photo direction' >
                 <img class= 'photo-user-pub' src='img/profile-user.png' alt='foto de perfil'>
                 <figcaption>Username</figcaption>
             </figure>
          </div>
          <p>${publicationNew.title}</p>
          <p  class= 'input-text-publication' >${publicationNew.text}</p>
          <div class = 'logos-like-love direction' >
             <img class= 'like-logo logo-publication' src='img/icons8-like-64.png' alt='logo para dar me encanta'>
             <img class= 'love-logo logo-publication' src='img/corazones.png' alt='logo para dar love'>
          </div>
        </section>
      `;
      }
    });
    mainTemplate.innerHTML = html;
    // eliminando publicaciones
    const buttonDelete = mainTemplate.querySelectorAll('.share-trash-logo');
    buttonDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deletePublication(dataset.id);
      });
    });
    // editando publicaciones
    const buttonEdit = mainTemplate.querySelectorAll('.share-edit-logo');
    buttonEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getOnlyPublication(e.target.dataset.id);
        console.log(doc.data());
        const pub = doc.data();
        document.getElementById('titlePublication').value = pub.title;
        document.getElementById('textPublication').value = pub.text;
      /*         const editUpdate = !conditionUpdate;
        id = e.target.dataset.id;
        console.log(editUpdate);
        console.log('id =', id); */
      });
    });
  });

  divFeed.appendChild(headerTemplate());
  divFeed.appendChild(publicationBeforeTemplate());
  divFeed.appendChild(mainTemplate);

  return divFeed;
};
/* export const idDoc = id;
console.log('id =', idDoc); */
