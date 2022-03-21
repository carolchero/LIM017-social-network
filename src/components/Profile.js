// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Profile = () => {
  const profileContainer = document.createElement('div');
  const textProfile = document.createElement('p');
  textProfile.innerText = 'Bienvenido a tu perfil';
  textProfile.addEventListener('click', () => onNavigate('/'));

  profileContainer.appendChild(textProfile);

  return profileContainer;
};
