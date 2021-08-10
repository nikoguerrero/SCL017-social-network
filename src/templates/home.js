import { navbarMenu, topNavBar, rightBar } from './components/navbar.js';
import { postTemplate } from './components/post.js';

export const homeTemplate = () => {
  const containerFeed = document.createElement('section');
  containerFeed.id = 'containerFeedId';
  containerFeed.className = 'containerFeedGrid';

  containerFeed.appendChild(navbarMenu());
  containerFeed.appendChild(topNavBar());
  containerFeed.appendChild(rightBar());
  containerFeed.appendChild(postTemplate());
  return containerFeed;
};
// testear si es un elemento html. 
// testear si es una funcion 
