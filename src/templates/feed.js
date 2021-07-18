import { firebaseLogout } from '../lib/firebase.js';

export const feedTemplate = () => {
  const containerFeed = document.createElement('section');
  containerFeed.className = 'containerFeedGrid';

  const feedDisplay = `
  <div class="header">
    <h3>¡Qué bueno verte!</h3>
    <input type="text" class="searchInput">
  </div>
  <div class="post"> 
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque saepe architecto amet at cum facere, error odio aspernatur iste excepturi!
    </p>
    <div class="like"></div>
    <div class="comments"></div>
  </div>
  <footer class="menu"> 
    <a href="#feed" id="registerButton" class="feedLink"></a>
    <a href="#" id="logoutButton" class="logoutButton"></a>
    <a href="#createPost" id="createPostId" class="createPostLink"></a>
    <a href="#profile" id="profileId" class="profileLink"></a>
  </footer>
    <button id="logoutButton" class="logoutButton">Cerrar sesión</button>
    `;

  containerFeed.innerHTML = feedDisplay;

  const logoutButton = containerFeed.querySelector('#logoutButton');
  logoutButton.addEventListener('click', () => {
    firebaseLogout();
  });

  return containerFeed;
};
