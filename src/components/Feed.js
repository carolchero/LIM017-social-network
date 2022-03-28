// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
import { publications } from './Publication.js';
import { publicationBeforeTemplate } from './PublicationBefore.js';

export const Feed = () => {
  const divFeed = document.createElement('div');
  divFeed.className = 'container-feed'; // contenedor general
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';

  // agregando las publicaciones al main
  mainTemplate.appendChild(publicationBeforeTemplate());
  mainTemplate.appendChild(publications());

  divFeed.appendChild(headerTemplate());
  divFeed.appendChild(mainTemplate);

  return divFeed;
};
