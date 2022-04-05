// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-unresolved
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import {
  doc, getDoc, getFirestore,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
import { publicationBeforeTemplate } from './PublicationBefore.js';
import { onGetPublicationUser, deletePublication, getOnlyPublication, updatePublication } from '../cloudFirebase.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const db = getFirestore();
export const Profile = () => {
  const profileContainer = document.createElement('div');
  profileContainer.className = 'container-feed'; // contenedor general
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';

  // mainTemplate.appendChild(publications());

  onGetPublicationUser((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc2) => {
      const publicationNew = doc2.data();
      if (publicationNew.uid === sessionStorage.getItem('uid')) {
        html += `
        <section class= 'container-publication-final' >
          <div class = 'container-user-edit direction' >
             <figure class = figure-name-photo direction' >
                 <img class= 'photo-user-pub' src='img/profile-user.png' alt='foto de perfil'>
                 <figcaption>Username</figcaption>
             </figure>
             <img class= 'share-edit-logo logo-publication' data-id='${doc2.id}' src='img/escribir.png' alt='logo para editar'>
             <img class= 'share-trash-logo logo-publication' data-id='${doc2.id}' src='img/icons8-trash-30.png' alt='logo para eliminar publicación'>
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
    // eliminando publicaciones
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
        const doc3 = await getOnlyPublication(e.target.dataset.id); // trae publicaciones por id
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
          let titleNew = doc3.data().title;
          titleNew = sectionPublication.querySelector('#newTitle').innerHTML;
          let textNew = doc3.data().text;
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

  // foto de portada y foto del usuario en grande
  const nameUsuario = document.createElement('div');
  nameUsuario.className = 'name-usuario';
  const labelNameUsuario = document.createElement('label');
  labelNameUsuario.className = 'name-label';
  labelNameUsuario.id = 'nameLabel';

  const coverPageProfilePhotoContainer = document.createElement('div');
  coverPageProfilePhotoContainer.className = 'container-coverPage-profilePhoto';
  coverPageProfilePhotoContainer.id = 'coverProfileContainer';
  const divProfilePhoto = document.createElement('div');
  divProfilePhoto.className = 'photo-profile';

  const coverPagePhoto = document.createElement('img');
  coverPagePhoto.className = 'search-logo';
  coverPagePhoto.src = 'img/search-logo.png';

  profileContainer.appendChild(headerTemplate());

  profileContainer.appendChild(coverPageProfilePhotoContainer);

  coverPageProfilePhotoContainer.appendChild(divProfilePhoto);
  coverPageProfilePhotoContainer.appendChild(nameUsuario);
  nameUsuario.appendChild(labelNameUsuario);

  profileContainer.appendChild(publicationBeforeTemplate());

  profileContainer.appendChild(mainTemplate);
  // profileContainer.appendChild(nameUsuario);
  // nameUsuario.appendChild(labelNameUsuario);

  // funcion para colocar nombre cuando ingreses con google
  function loginGoogle() {
    const userNameGoogle = sessionStorage.getItem('name');
    if (userNameGoogle != null) {
      labelNameUsuario.innerText = `BIENVENIDO  ${userNameGoogle}`;
    }
  }

  async function obtenerUsuarioId(id) {
    let user = null;
    const docRef = doc(db, 'dataUsers', id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      user = docSnap.data();
      console.log(user);
      if (user.name != null) {
        console.log(user.name);
        labelNameUsuario.innerText = `BIENVENIDO  ${user.name}`;
      } else {
        labelNameUsuario.innerText = `BIENVENIDO ${user.email}`;
      }
    } else {
      // doc.data() will be undefined in this case
      loginGoogle();
      console.log('No such document!');
    }
    // eslint-disable-next-line no-use-before-define
    //
  }

  // ver autentificacion si la sesion  esta activa o inactiva //inicia y cerrar sesion
  function listeningSessionEvent() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        onNavigate('/');
      } else {
        const uid = user.uid;
        obtenerUsuarioId(uid);
        console.log(uid);
      }
    });
  }

  listeningSessionEvent();
  return profileContainer;
};
