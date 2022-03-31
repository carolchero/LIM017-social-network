// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
import { publicationBeforeTemplate } from './PublicationBefore.js';
import { onGetPublication, deletePublication, getOnlyPublication, updatePublication } from '../cloudFirebase.js';

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
          <textarea  class= 'title-area-text' disabled = 'true' id= 'newTitle' >${publicationNew.title}</textarea>
          <textarea  class= 'title-area-text input-text-publication' disabled = 'true' id= 'newText'>${publicationNew.text}</textarea>
          <div class = 'logos-like-love direction' >
             <img class= 'like-logo logo-publication' src='img/icons8-like-64.png' alt='logo para dar me encanta'>
             <img class= 'love-logo logo-publication' src='img/corazones.png' alt='logo para dar love'>
             <button style='display:none;'  class = 'btn-save'>Guardar cambios</button>
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
    // ELIMINANDO PUBLICACIONES
    const buttonDelete = mainTemplate.querySelectorAll('.share-trash-logo');
    buttonDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deletePublication(dataset.id);
      });
    });

    // EDITANDO PUBLICACIONES
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
    buttonEdit.forEach((btn2) => {
      btn2.addEventListener('click', async (e) => {
        const doc = await getOnlyPublication(e.target.dataset.id); // trae publicaciones por id
        const id = e.target.dataset.id;
        // activamos los textarea para editar
        const areaTitleText = mainTemplate.querySelectorAll('.title-area-text');
        // eslint-disable-next-line no-param-reassign
        areaTitleText.forEach((btn3) => { btn3.disabled = false; });
        // mostramos boton para guardar cambios
        const buttonSave = document.querySelectorAll('.btn-save');
        buttonSave.forEach((btn4) => {
          // eslint-disable-next-line no-param-reassign
          btn4.style.display = 'block';
          btn4.addEventListener('click', () => {
            let titleNew = doc.data().title;
            titleNew = document.getElementById('newTitle').value;
            let textNew = doc.data().text;
            textNew = document.getElementById('newText').value;
            updatePublication(id, { // actualizando publicaciones
              title: titleNew,
              text: textNew,
            });
            // eslint-disable-next-line no-param-reassign
            btn4.style.display = 'none';
            areaTitleText.forEach((btn6) => {
              // eslint-disable-next-line no-param-reassign
              btn6.disabled = true;
            });
          });
        });
      });
    });
  });
  divFeed.appendChild(headerTemplate());
  divFeed.appendChild(publicationBeforeTemplate());
  divFeed.appendChild(mainTemplate);

  return divFeed;
};
