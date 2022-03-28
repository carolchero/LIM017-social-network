// eslint-disable-next-line import/no-cycle
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import {
  collection, query, where, getDocs, getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
import { headerTemplate } from './Header.js';
import { publicationBeforeTemplate } from './PublicationBefore.js';
import { publications } from './Publication.js';

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

  profileContainer.appendChild(headerTemplate());
  /*profileContainer.appendChild( );*/ // aqui iria el contenedor que tenga la foto del usuario en grande y su portada
  profileContainer.appendChild(mainTemplate);

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
