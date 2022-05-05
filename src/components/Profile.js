/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
// eslint-disable-next-line import/no-cycle
import { publicationBeforeTemplate } from './PublicationBefore.js';
import {
  // eslint-disable-next-line max-len
  onGetPublicationUser, deletePublication, getOnlyPublication, updatePublication, onGetUser, likePublication, lovePublication,
} from '../lib/cloudFirebase.js';
import { photoUser, coverPageUser, publicationUser } from '../lib/storage.js';
import {
  buttonEditMain, deletePublicationWithMessage, hideShowDivUploader, uploaderImagePublication,
} from '../lib/functionComponents.js';

export const Profile = () => {
  const profileContainer = document.createElement('div');
  profileContainer.className = 'container-feed'; // contenedor general
  const divChangeImageDisplay = document.createElement('div');
  divChangeImageDisplay.style.display = 'none';
  const divChangeImage = document.createElement('div');
  divChangeImage.className = 'div-logo-change-image';
  const logoChange = document.createElement('img');
  logoChange.src = '../img/cargando.gif';
  logoChange.alt = 'gif de cargando';
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';
  const coverPagePhotoContainer = document.createElement('div');
  coverPagePhotoContainer.className = 'container-coverpage-Photo';
  divChangeImageDisplay.appendChild(divChangeImage);
  divChangeImage.appendChild(logoChange);

  // FOTO DE PORTADA Y FOTO DEL USUARIO EN GRANDE
  onGetUser((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc2) => {
      const profileNew = doc2.data(); // dato de todos los usuarios
      if (profileNew.id === sessionStorage.getItem('uid')) {
        html += `
        <div class="container-coverPage-profilePhoto" id="coverProfileContainer"  style="background-image: url('${profileNew.urlCoverPage}');">
        <div class="photo-profile" style="background-image: url('${profileNew.urlPhotoUser}');">
          <div class="div-uploader-photo">
           <input type="file" id="imgUploaderphoto">
          </div>
        </div>
        <div class="name-usuario">
            <label class="name-label" id="nameLabel"> Bienvenid@ ${profileNew.name}</label>
        </div>
        <div class="div-uploader-cover-page">
             <input type="file" id="imgUploaderPortada">
        </div>
        </div>
      `;
      }
    });
    coverPagePhotoContainer.innerHTML = html;

    const imageUploaderPhoto = coverPagePhotoContainer.querySelector('#imgUploaderphoto');
    const imageUploaderCover = coverPagePhotoContainer.querySelector('#imgUploaderPortada');

    // AÑADIENDO FUNCIONALIDAD PARA PONER LA FOTO DEL USUARIO EN EL PROFILE
    imageUploaderPhoto.addEventListener('change', (e) => {
      const file = e.target.files[0]; // url de la foto
      divChangeImageDisplay.style.display = 'block';
      photoUser(file, divChangeImageDisplay.style);
    });
    imageUploaderCover.addEventListener('change', (e) => {
      const file = e.target.files[0]; // url de la foto
      divChangeImageDisplay.style.display = 'block';
      coverPageUser(file, divChangeImageDisplay.style);
    });
  });
  // PUBLICACIONES SOLO DEL USUARIO
  onGetPublicationUser((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc2) => {
      const publicationNew = doc2.data();
      if (publicationNew.uid === sessionStorage.getItem('uid')) {
        html += `
        <section class= 'container-publication-final' >
            <div style='display:none;' class = 'message-alert-content div-alert-message-color'>
                <p>¿Estas seguro de eliminar esta publicación?</p>
                <button  class ='button-yes button-alert' data-id='${doc2.id}' >SI</button>
                <button class= 'button-no button-alert'>NO</button>
            </div>
          <div class = 'container-user-edit direction' >
             <figure class = figure-name-photo direction' >
                 <img class= 'photo-user-pub' id = 'photoUser' src='${sessionStorage.getItem('photoUser')}' alt='foto de perfil'>
                 <figcaption class ='user-name-pub' >${sessionStorage.getItem('nameUser')}</figcaption>
                 <img class= 'share-edit-logo' data-id='${doc2.id}' src='img/icomon/pencil.jpg' alt='logo para editar'>
                 <img class= 'share-trash-logo' data-id='${doc2.id}' src='img/icomon/bin.jpg' alt='logo para eliminar publicación'>
             </figure>
          </div>
          <div class='div-display-change' style='display: none;'>
          <div class='div-logo-change-image-publication'>
                   <img src='../img/cargando.gif' alt='gif de cargando'>
              </div>
          </div>
          <div  contentEditable ='false' class= 'title-area '  id= 'newTitle' >${publicationNew.title}</div>
          <div  contentEditable ='false'   class= 'text-area div-text' id= 'newText'>${publicationNew.text}</div>
         <div class = 'direction' >
         <img style='display:none;' class="share-image-logo logo-smile-image" data-id='${doc2.id}'  src="img/icomon/images.jpg" alt="logo para agregar imagenes a la publicación">
             <img  style='display:none;' class='share-stickers-logo like-love-smile' src='img/icomon/smile.jpg' alt='logo para agregar stickers a la publicación'>
             <img class= 'like-love-smile btnlike' data-id='${doc2.id}' src= ${!publicationNew.like ? 'img/icomon/like.jpg' : publicationNew.like.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/likeO.jpg' : 'img/icomon/like.jpg'} alt='logo para dar me encanta'><figcaption class ='count-like-love' >${publicationNew.like ? publicationNew.like.length : 0}</figcaption>
             <img class= 'like-love-smile btnlove' data-id='${doc2.id}' src= ${!publicationNew.love ? 'img/icomon/heart.jpg' : publicationNew.love.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/heartO.jpg' : 'img/icomon/heart.jpg'} alt='logo para dar love'><figcaption class ='count-like-love' >${publicationNew.love ? publicationNew.love.length : 0}</figcaption>
             <button style='display:none;'  class = 'btn-save'>Guardar cambios</button>
             <div class='div-emoticons' id='divEmoticon'; style='display: none;'></div>
          </div>
          <div class = 'div-uploader' style='display:none;'>
               <input type ='file' id = 'imgUploader' class = 'img-uploader' >
          </div>
          
        </section>
       `;
      }
    });
    mainTemplate.innerHTML = html;
    // AGREGANDO FUNCIONALIDAD DE IMAGENES
    const buttonShareImage = mainTemplate.querySelectorAll('.share-image-logo');
    // EVENTO PARA PUBLICAR FOTO
    buttonShareImage.forEach((btnImage) => {
      const sectionPublication = btnImage.parentNode.parentNode;
      const buttonShare = sectionPublication.querySelector('.share-image-logo');
      buttonShare.id = 'buttonShare';
      hideShowDivUploader(sectionPublication); // FUNCIÓN PARA MOSTRAR Y OCULTAR CONTENEDOR DE FOTOS
      uploaderImagePublication(sectionPublication); // FUNCIÓN PARA PUBLICAR FOTO
    });
    // LIKE A PUBLICACIONES
    const buttonLike = mainTemplate.querySelectorAll('.btnlike');
    buttonLike.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        likePublication(dataset.id);
      });
    });
    // LOVE A PUBLICACIONES
    const buttonLove = mainTemplate.querySelectorAll('.btnlove');
    buttonLove.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        lovePublication(dataset.id);
      });
    });
    // ELIMINANDO PUBLICACIONES
    const buttonDelete = mainTemplate.querySelectorAll('.share-trash-logo');
    buttonDelete.forEach((btn) => {
      const sectionPublication = btn.parentNode.parentNode.parentNode;
      deletePublicationWithMessage(sectionPublication);
    });
    // EDITANDO PUBLICACIONES
    const buttonEdit = mainTemplate.querySelectorAll('.share-edit-logo');
    buttonEditMain(buttonEdit);
  });
  profileContainer.appendChild(divChangeImageDisplay);
  profileContainer.appendChild(headerTemplate());
  profileContainer.appendChild(coverPagePhotoContainer);
  profileContainer.appendChild(publicationBeforeTemplate());
  profileContainer.appendChild(mainTemplate);

  return profileContainer;
};
