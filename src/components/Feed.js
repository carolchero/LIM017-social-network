// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
import { publications } from './Publication.js';
import { publicationBeforeTemplate } from './PublicationBefore.js';
import { getPublication } from '../cloudFirebase.js';

export const Feed = () => {
  const divFeed = document.createElement('div');
  divFeed.className = 'container-feed'; // contenedor general
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';

  // mainTemplate.appendChild(publications());

  window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot = await getPublication();
    let html = '';
    querySnapshot.forEach((doc) => {
      const publicationNew = doc.data();
      html += `
           <div id= 'px'>
               <h3>${publicationNew.title}</h3>
               <p>${publicationNew.text}</p>
           </div>
      `;
    });
    mainTemplate.innerHTML = html;
  });

  divFeed.appendChild(headerTemplate());
  divFeed.appendChild(publicationBeforeTemplate());
  divFeed.appendChild(mainTemplate);

  return divFeed;
};
