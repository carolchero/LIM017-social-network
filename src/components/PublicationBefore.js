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
  imgShareImage.src = 'img/insertar-icono-de-imagen.png';
  imgShareImage.alt = 'logo para agregar imagenes a la publicación';
  const imgShareStickers = document.createElement('img');
  imgShareStickers.className = 'share-stickers-logo logo-publication';
  imgShareStickers.src = 'img/emoticon-sonrisa.png';
  imgShareStickers.alt = 'logo para agregar stickers a la publicación';
  const buttonPublication = document.createElement('button');
  buttonPublication.className = 'button-publication';
  buttonPublication.innerText = 'Publicar';
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
  formInputs.appendChild(divText);
  containerLogosButton.appendChild(imgShareImage);
  containerLogosButton.appendChild(imgShareStickers);
  containerLogosButton.appendChild(buttonPublication);
  containerLogosButton.appendChild(divEmoticons);
  // agregando contenedores pequeños a medianos
  sectionPublication.appendChild(figureSection);
  sectionPublication.appendChild(formInputs);
  sectionPublication.appendChild(containerLogosButton);
  // evento para almacenar titulo y texto de publicación o para actualizar al editar publicación
  buttonPublication.addEventListener('click', () => {
    dataPublication(inputTitle.value, divText.innerHTML);
    reviewResultPublication();

    formInputs.reset();
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

  return sectionPublication;
};
