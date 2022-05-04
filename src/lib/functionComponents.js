import {
    onGetPublication, deletePublication, getOnlyPublication, updatePublication,
    likePublication, lovePublication, getUsers,
  } from './cloudFirebase.js';
// eslint-disable-next-line import/no-unresolved
import f from './functions.js';

/* FUNCIONES FEED */

// FUNCIONES PARA EDITAR PUBLICACIONES
export function filesShow(sectionPublication) {
  const areaTitle = sectionPublication.querySelector('.title-area');
  const areaText = sectionPublication.querySelector('.text-area');
  const imgUploader = sectionPublication.querySelector('.share-image-logo');
  const emoticon = sectionPublication.querySelector('.share-stickers-logo');
  const buttonSave = sectionPublication.querySelector('.btn-save');
  // activando contenedores
  areaTitle.contentEditable = true;
  areaText.contentEditable = true;
  emoticon.style.display = 'block';
  buttonSave.style.display = 'block';
  imgUploader.style.display = 'block';
}

export function filesHide(sectionPublication) {
  const emoticon = sectionPublication.querySelector('.share-stickers-logo');
  const buttonSave = sectionPublication.querySelector('.btn-save');
  const areaTitle = sectionPublication.querySelector('.title-area');
  const areaText = sectionPublication.querySelector('.text-area');
  emoticon.style.display = 'none';
  buttonSave.style.display = 'none';
  areaTitle.contentEditable = false;
  areaText.contentEditable = false;
  return true;
}

export function buttonSaveEdit(buttonSave, doc3, sectionPublication, id) {
  let titleNew = doc3.data().title;
  titleNew = sectionPublication.querySelector('#newTitle').innerHTML;
  let textNew = doc3.data().text;
  textNew = sectionPublication.querySelector('#newText').innerHTML;
  updatePublication(id, { // actualizando publicaciones
    title: titleNew,
    text: textNew,
  });
  filesHide(sectionPublication, buttonSave);
  return true;
}

export function createEmoticon(sectionPublication) {
  const divText = sectionPublication.querySelector('.text-area');
  const divEmoticons = sectionPublication.querySelector('.div-emoticons');
  // eslint-disable-next-line no-plusplus
  for (let index = 1; index < 82; index++) {
    const emoji = `img/emoji/emoji${index}.png`;
    const emojiIco = document.createElement('img');
    emojiIco.className = 'emoticons';
    emojiIco.src = emoji;
    emojiIco.id = 'emojiIco';
    emojiIco.addEventListener('click', () => {
      divText.focus();
      f.pasteHtmlAtCaret(`<img class="emoticon" src="${emoji}">`);
    });
    divEmoticons.appendChild(emojiIco);
  }
  return true;
}

export function showEmoticons(sectionPublication) {
  const divEmoticon = sectionPublication.querySelector('.div-emoticons');
  const inputUploader = sectionPublication.querySelector('.div-uploader');
  const emoticon = sectionPublication.querySelector('.share-stickers-logo');
  emoticon.addEventListener('click', () => {
    if (divEmoticon.style.display === 'none') {
      divEmoticon.style.display = 'grid';
      inputUploader.style.display = 'none';
    } else {
      divEmoticon.style.display = 'none';
    }
  });
}

export function buttonEditMain(buttonEdit) { // falllllllllltaaaaaaaaaaaa
  buttonEdit.forEach((btn2) => {
    btn2.addEventListener('click', async (e) => {
      const doc3 = await getOnlyPublication(e.target.dataset.id); // trae publicaciones por id
      const id = e.target.dataset.id;
      const sectionPublication = btn2.parentNode.parentNode.parentNode;
      const buttonSave = sectionPublication.querySelector('.btn-save');
      // MOSTRAMOS Y ACTIVAMOS CONTENEDORES
      filesShow(sectionPublication);
      // AÑADIENDO STICKERS
      // eslint-disable-next-line no-plusplus
      createEmoticon(sectionPublication);
      showEmoticons(sectionPublication);
      // GUARDAR CAMBIOS
      buttonSave.addEventListener('click', () => {
        buttonSaveEdit(buttonSave, doc3, sectionPublication, id);
      });
    });
  });
  return true;
}

// FUNCIONES PARA ELIMINAR PUBLICACIONES
export function deletePublicationWithMessage(sectionPublication) {
  const buttonDeleteOnly = sectionPublication.querySelector('.share-trash-logo');
  const messageAlert = sectionPublication.querySelector('.div-alert-message-color');
  const messageAlertYes = sectionPublication.querySelector('.button-yes');
  const messageAlertNo = sectionPublication.querySelector('.button-no');
  buttonDeleteOnly.addEventListener('click', () => {
    messageAlert.style.display = 'block';
    messageAlertYes.addEventListener('click', ({ target: { dataset } }) => {
      deletePublication(dataset.id);
      messageAlert.style.display = 'none';
    });
    messageAlertNo.addEventListener('click', () => {
      messageAlert.style.display = 'none';
    });
  });
}
