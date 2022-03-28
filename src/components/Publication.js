export const publications = () => {
  /* PUBLICACIÓN GUARDADA */
  const sectionPublicationHistory = document.createElement('section');
  sectionPublicationHistory.className = 'container-publication-final';
  const divSectionUserEdit = document.createElement('div');
  divSectionUserEdit.className = 'container-user-edit direction';
  // foto de usuario
  const divSectionFigure = document.createElement('figure');
  divSectionFigure.className = 'figure-name-photo direction';
  const imgPhotoUser = document.createElement('img');
  imgPhotoUser.className = 'photo-user-pub';
  imgPhotoUser.src = 'img/profile-user.png';
  imgPhotoUser.alt = 'foto de perfil';
  const figcaptionUser = document.createElement('figcaption');
  figcaptionUser.innerText = 'Username';
  // imágenes para editar, eliminar
  const imgEdit = document.createElement('img');
  imgEdit.className = 'share-edit-logo logo-publication';
  imgEdit.src = 'img/escribir.png';
  imgEdit.alt = 'logo para editar';
  const imgTrash = document.createElement('img');
  imgTrash.className = 'share-trash-logo logo-publication';
  imgTrash.src = 'img/icons8-trash-30.png';
  imgTrash.alt = 'logo para eliminar publicación';
  // text
  const pTitle = document.createElement('p');
  pTitle.innerText = 'Titulo de publicación';
  const pText = document.createElement('p');
  pText.innerText = 'Escriba su texto aqui';
  pText.className = 'input-text-publication';
  // logos de publicación
  const containerLogosLikeLove = document.createElement('div');
  containerLogosLikeLove.className = 'logos-like-love direction';
  const imglike = document.createElement('img');
  imglike.className = 'like-logo logo-publication';
  imglike.src = 'img/icons8-like-64.png';
  imglike.alt = 'logo para dar me encanta';

  const imglove = document.createElement('img');
  imglove.className = 'love-logo logo-publication';
  imglove.src = 'img/corazones.png';
  imglove.alt = 'logo para dar love';

  // agregando contenedores pequeños a medianos
  divSectionFigure.appendChild(imgPhotoUser);
  divSectionFigure.appendChild(figcaptionUser);

  // agregando contenedores pequeños a medianos
  divSectionUserEdit.appendChild(divSectionFigure);
  divSectionUserEdit.appendChild(imgEdit);
  divSectionUserEdit.appendChild(imgTrash);

  containerLogosLikeLove.appendChild(imglike);
  containerLogosLikeLove.appendChild(imglove);

  // agregando contenedores medianos al section
  sectionPublicationHistory.appendChild(divSectionUserEdit);
  sectionPublicationHistory.appendChild(pTitle);
  sectionPublicationHistory.appendChild(pText);
  sectionPublicationHistory.appendChild(containerLogosLikeLove);

  return sectionPublicationHistory;
};
