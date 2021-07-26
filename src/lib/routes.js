import { feedTemplate } from '../templates/feed.js';
import { homeTemplate } from '../templates/home.js';
import { registerTemplate } from '../templates/register.js';
import { firebaseGetValidUser } from './firebase.js';

const container = document.getElementById('root');

const setTemplate = (route) => {
  switch (route) {
    case '': // ruta principal (login)
      container.innerHTML = '';
      container.appendChild(homeTemplate());
      break;
    case '#register': // ruta pantalla registro
      if (!firebaseGetValidUser()) {
        container.innerHTML = '';
        container.appendChild(registerTemplate());
      } else {
        setTemplate('#feed');
      }
      break;
    case '#feed': // ruta pantalla muro
      if (firebaseGetValidUser()) {
        container.innerHTML = '';
        container.appendChild(feedTemplate());
      } else {
        setTemplate('');
      }
      break;
    default:
      break;
  }
  window.location.hash = route;
}

export default setTemplate;
