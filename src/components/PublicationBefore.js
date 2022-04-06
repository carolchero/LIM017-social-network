import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import { doc, getDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
import { dataPublication, reviewResultPublication, db } from '../cloudFirebase.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const publicationBeforeTemplate = () => {
  const feedTemplate2 = document.createElement('main');
  feedTemplate2.className = 'container-publication';
  /* PUBLICACIÓN DE USUARIO */
  const sectionPublication = document.createElement('section');
  sectionPublication.className = 'container-publication-section';
  const figureSection = document.createElement('figure');
  figureSection.className = 'photo-user-container';
  // foto de usuario
  const imgPhotoUser = document.createElement('img');
  imgPhotoUser.className = 'photo-user';
  imgPhotoUser.alt = 'foto de perfil';
  imgPhotoUser.id = 'imagenUsuario';
  const figcaptionUser = document.createElement('figcaption');
  figcaptionUser.className = 'figcaption-name';
  // inputs de publicación
  const formInputs = document.createElement('form');
  const inputTitle = document.createElement('div');
  inputTitle.contentEditable = true;
  inputTitle.id = 'textPublication1';
  inputTitle.className = 'div-title';
  inputTitle.setAttribute('placeholder', 'título de publicación');

  // div editable
  const divText = document.createElement('div');
  divText.contentEditable = true;
  divText.id = 'textPublication1';
  divText.className = 'div-text';
  divText.setAttribute('placeholder', 'Escriba su texto aqui');
  // logos de publicación
  const containerLogosButton = document.createElement('div');
  const imgShareImage = document.createElement('img');
  imgShareImage.className = 'share-image-logo logo-publication';
  imgShareImage.src = 'img/icomon/images.jpg';
  imgShareImage.alt = 'logo para agregar imagenes a la publicación';

  const imgShareStickers = document.createElement('img');
  imgShareStickers.className = 'share-stickers-logo logo-publication';
  imgShareStickers.src = 'img/icomon/smile.jpg';
  imgShareStickers.alt = 'logo para agregar stickers a la publicación';
  const buttonPublication = document.createElement('button');
  buttonPublication.className = 'button-publication';
  buttonPublication.innerText = 'Publicar';

  // div oculto para subir foto
  const divUploader = document.createElement('div');
  divUploader.style.display = 'none';
  divUploader.className = 'div-uploader';
  /*const imagePreview = document.createElement('img');
  imagePreview.id = 'imgPreview';*/
  const imageUploader = document.createElement('input');
  imageUploader.type = 'file';
  imageUploader.id = 'imgUploader';
  imageUploader.className = 'img-uploader';

  // div para emoticos
  const divEmoticons = document.createElement('div');
  divEmoticons.className = 'div-emoticons';
  divEmoticons.style.display = 'none';
  // eslint-disable-next-line no-plusplus
  for (let index = 1; index < 82; index++) {
    const emoji = `img/emoji/emoji${index}.png`;
    const emojiIco = document.createElement('img');
    emojiIco.className = 'emoticons';
    emojiIco.src = emoji;
    emojiIco.addEventListener('click', () => {
      const text = divText.innerHTML;
      divText.innerHTML = `${text}<img class="emoticon" src="${emoji}">`;
    });
    divEmoticons.appendChild(emojiIco);
  }
  // agregando contenedores pequeños a medianos
  figureSection.appendChild(imgPhotoUser);
  figureSection.appendChild(figcaptionUser);
  formInputs.appendChild(inputTitle);
  // formInputs.appendChild(inputText);
  // divText.appendChild(imagePreview);
  formInputs.appendChild(divText);
  containerLogosButton.appendChild(imgShareImage);
  containerLogosButton.appendChild(imgShareStickers);
  containerLogosButton.appendChild(buttonPublication);
  containerLogosButton.appendChild(divEmoticons);
  // contenedor para subir imagenes a la publicación
  divUploader.appendChild(imageUploader);
  // agregando contenedores pequeños a medianos
  sectionPublication.appendChild(figureSection);
  sectionPublication.appendChild(formInputs);
  sectionPublication.appendChild(containerLogosButton);
  sectionPublication.appendChild(divUploader);

  // evento para almacenar titulo y texto de publicación o para actualizar al editar publicación
  buttonPublication.addEventListener('click', () => {
    dataPublication(inputTitle.innerHTML, divText.innerHTML);
    reviewResultPublication();

    inputTitle.innerHTML = '';
    divText.innerHTML = '';
    divEmoticons.style.display = 'none';
  });

  // evento para mostrar div de emoticons

  imgShareStickers.addEventListener('click', () => {
    if (divEmoticons.style.display === 'none') {
      divEmoticons.style.display = 'grid';
    } else {
      divEmoticons.style.display = 'none';
    }
  });

  // evento para aparecer el div para escoger imagen
  imgShareImage.addEventListener('click', () => {
    if (divUploader.style.display === 'none') {
      divUploader.style.display = 'flex';
    } else {
      divUploader.style.display = 'none';
    }
  });
  // obtener nombre y foto de firebase o de google
  function loginGoogleName() {
    const userNameGoogle = sessionStorage.getItem('name');
    if (userNameGoogle != null) {
      figcaptionUser.innerText = sessionStorage.getItem('name');
    } else {
      figcaptionUser.innerText = 'username';
    }
  }
  function loginGooglePhoto() {
    const photoNameGoogle = sessionStorage.getItem('photo');
    if (photoNameGoogle != null) {
      imgPhotoUser.src = sessionStorage.getItem('photo');
    } else {
      imgPhotoUser.src = 'img/icomon/user.jpg';
    }
  }

  async function obtenerUsuarioId(id) {
    let user = null;
    const docRef = doc(db, 'dataUsers', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      user = docSnap.data();
      if (user.name != null) {
        figcaptionUser.innerText = user.name;
      } else {
        figcaptionUser.innerText = 'username';
      }
    } else { // doc.data() will be undefined in this case
      loginGoogleName();
      console.log('No such document in Google!');
    }

    if (docSnap.exists()) {
      user = docSnap.data();
      if (user.photo != null) {
        console.log(user.photo);
      } else {
        imgPhotoUser.src = 'img/icomon/user.jpg';
      }
    } else { // doc.data() will be undefined in this case
      loginGooglePhoto();
      console.log('No such document in Google!');
    }
  }
  // ver autentificacion si la sesion  esta activa o inactiva //inicia y cerrar sesion
  function listeningSessionEvent() {
    const auth = getAuth();
    // eslint-disable-next-line no-shadow
    onAuthStateChanged(auth, (user) => {
      if (user === null) { // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
        onNavigate('/');
      } else {
        const uid = user.uid;
        obtenerUsuarioId(uid);
      }
    });
  }
  listeningSessionEvent();


  // evento para capturar evento para subir imagen
 /* imageUploader.addEventListener('change', (e) => {
    const file = e.target.files[0];
    console.log(file);
  });*/
  return sectionPublication;
};
