import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js';
// Create a root reference
import {updateDataUsers} from './cloudFirebase.js';

const storage = getStorage();

let id = sessionStorage.getItem('uid');
function chooseId() {
  if (id === null) {
    id = sessionStorage.getItem('uidGoogle');
  } else {
    id = sessionStorage.getItem('uid');
  }
  return id;
}
// funcion para descargar la foto del usuario
export async function dowloadImagePhoto(image) {
  let urlImage = '';
  await getDownloadURL(ref(storage, `foto-user/${image}`))
    .then((url) => {
      urlImage = url;
      updateDataUsers(chooseId(), {
        urlPhotoUser: url,
      });
      sessionStorage.setItem('photoUser', url);
    }).catch((error) => {
      console.log(error);
    });
  return urlImage;
}
// funcion para subir la foto del usuario al storage
export async function photoUser(photo, div) {
  let result = '';
  const photoRef = ref(storage, `foto-user/${photo.name}`);
  const upload = await uploadBytesResumable(photoRef, photo);
  function time() {
    // eslint-disable-next-line no-param-reassign
    div.display = 'none';
  }
  if (upload.state === 'success') {
    setTimeout(time, 2000);
  }
  result = true;
  await dowloadImagePhoto(photo.name, div);
  return result;
}

// funcion para descargar la foto de la portada del usuario
export async function dowloadCoverPage(image) {
  let urlImage = '';
  await getDownloadURL(ref(storage, `portada-user/${image}`))
    .then((url) => {
      urlImage = url;
      updateDataUsers(chooseId(), {
        urlCoverPage: url,
      });
    }).catch((error) => {
      console.log(error);
    });
  return urlImage;
}
// funcion para subir la foto de portada del usuario al storage
export async function coverPageUser(coverPage, div) {
  let result = '';
  const coverPageRef = ref(storage, `portada-user/${coverPage.name}`);
  const upload = await uploadBytesResumable(coverPageRef, coverPage);
  function time() {
    // eslint-disable-next-line no-param-reassign
    div.display = 'none';
  }
  if (upload.state === 'success') {
    setTimeout(time, 2000);
  }
  result = true;
  await dowloadCoverPage(coverPage.name);
  return result;
}

// funcion para descargar la imagen del storage a la publicación
async function dowloadImage(imagePreview, image) {
  await getDownloadURL(ref(storage, `image-publication/${image}`))
    .then((url) => {
      imagePreview.setAttribute('src', url);
    }).catch((error) => {
      console.log(error);
    });
}
// funcion para subir la imagen de la publicación al storage
export async function publicationUser(image, imagePreview, logoChange) {
  let result = '';
  const publicationRef = ref(storage, `image-publication/${image.name}`);
  const upload = await uploadBytesResumable(publicationRef, image);
  function time() {
    // eslint-disable-next-line no-param-reassign
    logoChange.display = 'none';
  }
  if (upload.state === 'success') {
    setTimeout(time, 2000);
  }
  result = true;
  await dowloadImage(imagePreview, image.name);
  return result;
}
