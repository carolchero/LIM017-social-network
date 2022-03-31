import { dataPublication, reviewResultPublication } from '../cloudFirebase.js';

export const publicationBeforeTemplate = () => {
  const feedTemplate2 = document.createElement('main');
  feedTemplate2.className = 'container-publication';
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
  const formInputs = document.createElement('form');
  const inputTitle = document.createElement('input');
  inputTitle.id = 'titlePublication';
  inputTitle.placeholder = 'Titulo de publicación';
  const inputText = document.createElement('textarea');
  inputText.id = 'textPublication';
  inputText.placeholder = 'Escriba su texto aqui';
  inputText.className = 'input-text-publication';

  const divText = document.createElement('div');
  divText.contentEditable = true;
  divText.className = 'input-text-publication';
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
  formInputs.appendChild(inputTitle);
  formInputs.appendChild(inputText);
  // formInputs.appendChild(divText);
  containerLogosButton.appendChild(imgShareImage);
  containerLogosButton.appendChild(imgShareStickers);
  containerLogosButton.appendChild(imgTrash);
  containerLogosButton.appendChild(buttonPublication);
  // agregando contenedores pequeños a medianos
  sectionPublication.appendChild(figureSection);
  sectionPublication.appendChild(formInputs);
  sectionPublication.appendChild(containerLogosButton);
  // evento para almacenar titulo y texto de publicación o para actualizar al editar publicación
  buttonPublication.addEventListener('click', () => {
    dataPublication(inputTitle.value, inputText.value);
    reviewResultPublication();

    formInputs.reset();
  });

  return sectionPublication;
};
