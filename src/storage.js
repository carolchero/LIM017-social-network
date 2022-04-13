import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js';
// Create a root reference
const storage = getStorage();

// funcion para descargar la foto del usuario
async function dowloadImagePhoto(imagePreview, image) {
  await getDownloadURL(ref(storage, `foto-user/${image}`))
    .then((url) => {
      // eslint-disable-next-line no-param-reassign
      imagePreview.style.backgroundImage = `url('${url}')`;
      sessionStorage.setItem('photoUser', url);
    }).catch((error) => {
      console.log(error);
    });
}
// funcion para subir la foto del usuario al storage
export async function photoUser(photo, imagePreview) {
  let result = '';
  const photoRef = ref(storage, `foto-user/${photo.name}`);
  await uploadBytes(photoRef, photo);
  result = true;
  await dowloadImagePhoto(imagePreview, photo.name);
  return result;
}

// funcion para descargar la foto de la portada del usuario
async function dowloadCoverPage(imagePreview, image) {
  await getDownloadURL(ref(storage, `portada-user/${image}`))
    .then((url) => {
      // eslint-disable-next-line no-param-reassign
      imagePreview.style.backgroundImage = `url('${url}')`;
      sessionStorage.setItem('coverPageUser', url);
    }).catch((error) => {
      console.log(error);
    });
}
// funcion para subir la foto de portada del usuario al storage
export async function coverPageUser(coverPage, imagePreview) {
  let result = '';
  const coverPageRef = ref(storage, `portada-user/${coverPage.name}`);
  await uploadBytes(coverPageRef, coverPage);
  result = true;
  // setTimeout(dowloadImage, 5000);
  await dowloadCoverPage(imagePreview, coverPage.name);
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
export async function publicationUser(image, imagePreview) {
  let result = '';
  const publicationRef = ref(storage, `image-publication/${image.name}`);
  await uploadBytes(publicationRef, image);
  result = true;
  // setTimeout(dowloadImage, 5000);
  await dowloadImage(imagePreview, image.name);
  return result;
}
