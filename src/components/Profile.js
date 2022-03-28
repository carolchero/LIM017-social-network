// eslint-disable-next-line import/no-cycle
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import {
  collection, query, where, getDocs, getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
import { onNavigate } from '../main.js';
import { headerTemplate } from './Header.js';
import { dataPublication, reviewResultPublication } from '../cloudFirebase.js';

export const db = getFirestore();
export const Profile = () => {
  const profileContainer = document.createElement('div');
  profileContainer.className = 'container-profile'; // contenedor general
  const profileTemplate = document.createElement('main');
  profileTemplate.className = 'container-publication';
  const textProfile = document.createElement('p');
  textProfile.innerText = 'Bienvenido a tu perfil';
  textProfile.addEventListener('click', () => onNavigate('/'));

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
  const inputText = document.createElement('textarea');
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
  buttonPublication.className = 'button-publication';
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
  profileTemplate.appendChild(sectionPublication);

  // divFeed.appendChild(feedTemplate);
  profileContainer.appendChild(headerTemplate());
  profileContainer.appendChild(profileTemplate);
  profileContainer.appendChild(textProfile);

  buttonPublication.addEventListener('click', () => {
    dataPublication(inputTitle.value, inputText.value);
    reviewResultPublication();
  });

  escuchandoFondo();
  return profileContainer;
};

function escuchandoFondo() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      obtenerUsuarioId(uid);
      console.log(uid);
    } else {
      // User is signed out
      // ...
    }
  });
}

async function obtenerUsuarioId(id) {
  const q = query(collection(db, 'dataUsers'), where('id', '==', id));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
}
