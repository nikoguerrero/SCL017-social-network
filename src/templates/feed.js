import { firebaseLogout } from '../lib/firebase.js';
import setTemplate from '../lib/routes.js';

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
  <nav class="menu"> 
    <a href="#feed" id="registerButton" class="feedLink"></a>
    <a href="#" id="logoutButton" class="logoutButton"></a>
    <a href="#createPost" id="createPostId" class="createPostLink"></a>
    <a href="#profile" id="profileId" class="profileLink"></a>
  </nav>
    `;

  containerFeed.innerHTML = feedDisplay;

  const logoutButton = containerFeed.querySelector('#logoutButton');
  logoutButton.addEventListener('click', () => {
    firebaseLogout();
  });
const createPostId = containerFeed.querySelector('#createPostId');
createPostId.addEventListener('click', () =>{ 
  setTemplate('#createPost');
});
  return containerFeed;
};
