// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Feed = () => {
  const feedContainer = document.createElement('div');
  const textFeed = document.createElement('p');
  textFeed.innerText = 'Bienvenido a tu muro';

  const buttonProfile = document.createElement('button');
  buttonProfile.innerText = 'Ir al perfil';
  buttonProfile.addEventListener('click', () => onNavigate('/profile'));

  feedContainer.appendChild(textFeed);
  feedContainer.appendChild(buttonProfile);

  return feedContainer;
};
