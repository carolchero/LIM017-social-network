// eslint-disable-next-line import/no-cycle
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import {
  collection, query, where, getDocs, getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
import { headerTemplate } from './Header.js';
import { publicationBeforeTemplate } from './PublicationBefore.js';
import { publications } from './Publication.js';
import { onNavigate } from '../main.js';

export const db = getFirestore();
export const Profile = () => {
  const profileContainer = document.createElement('div');
  profileContainer.className = 'container-profile'; // contenedor general
  // agregando las publicaciones
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';
  // agregando las publicaciones al main
  mainTemplate.appendChild(publicationBeforeTemplate());
  mainTemplate.appendChild(publications());

  // foto de portada y foto del usuario en grande
  const nameUsuario = document.createElement('div');
  nameUsuario.className = 'name-usuario';
  const labelNameUsuario = document.createElement('label');
  labelNameUsuario.className = 'name-label';
  labelNameUsuario.id = 'nameLabel';

  const coverPageProfilePhotoContainer = document.createElement('div');
  coverPageProfilePhotoContainer.className = 'container-coverPage-profilePhoto';
  const divProfilePhoto = document.createElement('div');
  divProfilePhoto.className = 'photo-profile';
  const profilePhoto = document.createElement('img');
  profilePhoto.className = 'search-logo';
  profilePhoto.id = 'imagenUsuario'
  profilePhoto.src = 'img/un-usuario.jpg';

  const divProfileCoverPage = document.createElement('div');
  divProfileCoverPage.className = 'cover-page-profile';
  const coverPagePhoto = document.createElement('img');
  coverPagePhoto.className = 'search-logo';
  coverPagePhoto.src = 'img/search-logo.png';



  profileContainer.appendChild(headerTemplate());
  profileContainer.appendChild(nameUsuario);
  nameUsuario.appendChild(labelNameUsuario);
  profileContainer.appendChild(coverPageProfilePhotoContainer);
  coverPageProfilePhotoContainer.appendChild(divProfilePhoto);
  divProfilePhoto.appendChild(profilePhoto);
  coverPageProfilePhotoContainer.appendChild(divProfileCoverPage);
  divProfileCoverPage.appendChild(coverPagePhoto);
  /*profileContainer.appendChild( );*/ // aqui iria el contenedor que tenga la foto del usuario en grande y su portada
  profileContainer.appendChild(mainTemplate);

  escuchandoEventoSesion();
  return profileContainer;
};

function escuchandoEventoSesion() { //ver autentificacion si la cuenta esta activa o inactiva
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user==null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
       onNavigate('/register');
      // ...
      obtenerUsuarioId(uid);
      console.log(uid);
    } else {
     onNavigate('/');
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
