import { firebaseLogout } from '../lib/firebase.js';

export const feedTemplate = () => {
  const containerFeed = document.createElement('section');
  containerFeed.className = 'containerFeedGrid';
  const feedDisplay = `
  <nav class="menu"> 
    <ul class="menuList">
      <li class="menuItem">
        <a href="#" id="logoutButton">
          <img src="images/logouticon.svg">
          <p class="nmenuItemlabel">Cerrar sesión</p>
        </a>
      </li>
      <li class="menuItem">
        <a href="#feed" id="registerButton">
          <img src="images/homelogin.svg">
          <p class="menuItemlabel">Home</p>
        </a>
      </li>
      <li class="menuItem">
        <a href="#createPost" id="createPostId">
          <img src="images/createpost.svg">
          <p class="menuItemlabel">Crear post</p>
        </a>
      </li>
      <li class="menuItem">
        <a href="#profile" id="profileId">
          <img src="images/profileicon.svg">
          <p class="menuItemlabel">Perfil</p>
        </a>
      </li>
    </ul>
  </nav>
    `;
  containerFeed.innerHTML = feedDisplay;
  const logoutButton = containerFeed.querySelector('#logoutButton');
  logoutButton.addEventListener('click', () => {
    firebaseLogout();
  });
  return containerFeed;
};
