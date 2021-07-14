import { firebaseLogout } from '../lib/firebase.js';

export const feedTemplate = () => {
  const containerFeed = document.createElement("div");
  containerFeed.className = "containerFeedRegister"
  const feedDisplay = `
    <h3> Bienvenido a BearHug <h3>
    <button id="logoutButton" class="logoutButton">Cerrar sesión</button>
    `;
   containerFeed.innerHTML = feedDisplay;
   const logoutButton = containerFeed.querySelector('#logoutButton');
   logoutButton.addEventListener('click', () => {
     firebaseLogout();
   });
  return containerFeed;
};
