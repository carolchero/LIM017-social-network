// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
import { publicationBeforeTemplate } from './PublicationBefore.js';
// eslint-disable-next-line object-curly-newline
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
          <div  contentEditable ="false" class= 'title-area '  id= 'newTitle' >${publicationNew.title}</div>
          <div  contentEditable ="false"   class= 'text-area div-text' id= 'newText'>${publicationNew.text}</div>
          <div class = 'logos-like-love direction' >
             <img  style='display:none;' class='share-stickers-logo logo-publication' src='img/emoticon-sonrisa.png' alt='logo para agregar stickers a la publicación'>
             <img class= 'like-logo logo-publication' src='img/icons8-like-64.png' alt='logo para dar me encanta'>
             <img class= 'love-logo logo-publication' src='img/corazones.png' alt='logo para dar love'>
             <button style='display:none;'  class = 'btn-save'>Guardar cambios</button>
             <div class='div-emoticons' id='divEmoticon'; style='display: none;'></div>
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
    buttonEdit.forEach((btn2) => {
      btn2.addEventListener('click', async (e) => {
        const doc = await getOnlyPublication(e.target.dataset.id); // trae publicaciones por id
        const id = e.target.dataset.id;
        const sectionPublication = btn2.parentNode.parentNode;
        // activamos el text area y el div para editar
        const areaTitle = sectionPublication.querySelector('.title-area');
        const areaText = sectionPublication.querySelector('.text-area');
        // activando contenedores
        areaTitle.contentEditable = true;
        areaText.contentEditable = true;
        // mostramos boton para guardar cambios
        const emoticon = sectionPublication.querySelector('.share-stickers-logo');
        const buttonSave = sectionPublication.querySelector('.btn-save');
        // eslint-disable-next-line no-param-reassign
        emoticon.style.display = 'block';

        // AÑADIENDO STICKERS
        const divEmoticon = sectionPublication.querySelector('.div-emoticons');
        // eslint-disable-next-line no-plusplus
        for (let index = 1; index < 82; index++) {
          const emoji = `../img/emoji/emoji${index}.png`;
          const emojiIco = document.createElement('img');
          emojiIco.className = 'emoticons';
          emojiIco.src = emoji;
          divEmoticon.appendChild(emojiIco);
          emojiIco.addEventListener('click', () => {
            const text = areaText.innerHTML;
            areaText.innerHTML = `${text}<img class="emoticon" src="${emoji}">`;
          });
        }
        emoticon.addEventListener('click', () => {
          if (divEmoticon.style.display === 'none') {
            divEmoticon.style.display = 'grid';
          } else {
            divEmoticon.style.display = 'none';
          }
        });
        buttonSave.style.display = 'block';
        buttonSave.addEventListener('click', () => {
          let titleNew = doc.data().title;
          titleNew = sectionPublication.querySelector('#newTitle').innerHTML;
          let textNew = doc.data().text;
          textNew = sectionPublication.querySelector('#newText').innerHTML;
          updatePublication(id, { // actualizando publicaciones
            title: titleNew,
            text: textNew,
          });
          // eslint-disable-next-line no-param-reassign
          buttonSave.style.display = 'none';
          areaTitle.contentEditable = false;
          areaText.contentEditable = false;
        });
      });
    });
  });
  divFeed.appendChild(headerTemplate());
  divFeed.appendChild(publicationBeforeTemplate());
  divFeed.appendChild(mainTemplate);

  return divFeed;
};
