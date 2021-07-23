import { firebaseLogout } from '../lib/firebase.js';
import { navbarMenu, topNavBar } from './navbar.js';
import { postTemplate } from '../createPost.js';

export const feedTemplate = () => {
  const containerFeed = document.createElement('section');
  containerFeed.className = 'containerFeedGrid';

  containerFeed.appendChild(navbarMenu());
  containerFeed.appendChild(topNavBar());
  containerFeed.appendChild(postTemplate());
  return containerFeed;
};
