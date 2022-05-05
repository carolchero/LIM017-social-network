/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
// eslint-disable-next-line import/no-cycle
import { publicationBeforeTemplate } from './PublicationBefore.js';
import {
  onGetPublication, likePublication, lovePublication, getUsers,
} from '../lib/cloudFirebase.js';
// eslint-disable-next-line import/named
import {
  buttonEditMain, deletePublicationWithMessage, hideShowDivUploader, uploaderImagePublication,
} from '../lib/functionComponents.js';

export const Feed = () => {
  const divFeed = document.createElement('div');
  divFeed.className = 'container-feed'; // contenedor general
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';
  mainTemplate.id = 'mainTemplate';
  onGetPublication(async (querySnapshot) => {
    let html = '';
    const allDataUser = await getUsers();
    const mapaDato = new Map();

    allDataUser.forEach((dataUser) => {
      mapaDato.set(`${dataUser.data().id}-photo`, dataUser.data().urlPhotoUser);
      mapaDato.set(`${dataUser.data().id}-name`, dataUser.data().name);
    });
    querySnapshot.forEach(async (doc2) => {
      const publicationNew = doc2.data();
      if (sessionStorage.getItem('uid') === publicationNew.uid) {
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
          <div  contentEditable ='false'   class= 'text-area div-text' id= 'newText'>${publicationNew.text}
          </div>
          <div class = 'direction' >
             <img style='display:none;' class="share-image-logo logo-smile-image" data-id='${doc2.id}'  src="img/icomon/images.jpg" alt="logo para agregar imagenes a la publicación">
             <img  style='display:none;' class='share-stickers-logo like-love-smile ' src='img/icomon/smile.jpg' alt='logo para agregar stickers a la publicación'>
             <img class= 'like-love-smile btnlike' data-id='${doc2.id}' src= ${!publicationNew.like ? 'img/icomon/like.jpg' : publicationNew.like.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/likeO.jpg' : 'img/icomon/like.jpg'} alt='logo para dar me encanta'><figcaption class ='count-like-love' >${publicationNew.like ? publicationNew.like.length : 0}</figcaption>
             <img class= 'like-love-smile btnlove' data-id='${doc2.id}' src= ${!publicationNew.love ? 'img/icomon/heart.jpg' : publicationNew.love.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/heartO.jpg' : 'img/icomon/heart.jpg'} alt='logo para dar love'><figcaption class ='count-like-love' >${publicationNew.love ? publicationNew.love.length : 0}</figcaption>
             <button style='display:none;'  class = 'btn-save'>Guardar cambios</button>
             <div class='div-emoticons ' id='divEmoticon'; style='display: none;'></div>
          </div>
          <div class = 'div-uploader' style='display:none;'>
                 <input type ='file' id = 'imgUploader' class = 'img-uploader' >
          </div>
          
        </section>
       `;
      } else {
        html += `
        <section class= 'container-publication-final' >
          <div class = 'container-user-edit direction' >
             <figure class = figure-name-photo direction' >
                 <img class= 'photo-user-pub' id = 'photoUser' src='${mapaDato.get(`${publicationNew.uid.toString()}-photo`)}'  alt='foto de perfil'>
                 <figcaption class ='user-name-pub' >${mapaDato.get(`${publicationNew.uid.toString()}-name`)}</figcaption>
             </figure>
          </div>
          <div  contentEditable ='false' id= 'newTitle'>${publicationNew.title}</div>
          <div  contentEditable ='false'  class= 'p-text-publication' id= 'newText' >${publicationNew.text}</div>
          <div class = 'direction' >
          <img class= 'like-love-smile btnlike' data-id='${doc2.id}' src= ${!publicationNew.like ? 'img/icomon/like.jpg' : publicationNew.like.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/likeO.jpg' : 'img/icomon/like.jpg'} alt='logo para dar me encanta'><figcaption class ='count-like-love' >${publicationNew.like ? publicationNew.like.length : 0}</figcaption>
          <img class= 'like-love-smile btnlove' data-id='${doc2.id}' src= ${!publicationNew.love ? 'img/icomon/heart.jpg' : publicationNew.love.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/heartO.jpg' : 'img/icomon/heart.jpg'} alt='logo para dar love'><figcaption class ='count-like-love' >${publicationNew.love ? publicationNew.love.length : 0}</figcaption>
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
  divFeed.appendChild(headerTemplate());
  divFeed.appendChild(publicationBeforeTemplate());
  divFeed.appendChild(mainTemplate);

  return divFeed;
};
