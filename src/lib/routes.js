import { profileTemplate } from '../templates/components/profileUser.js';
import { homeTemplate } from '../templates/home.js';
import { loginTemplate } from '../templates/login.js';
import { registerTemplate } from '../templates/register.js';
import { firebaseGetValidUser } from './firebase.js';

const container = document.getElementById('root');

export const setTemplate = (route) => {
  switch (route) {
    case '': // ruta principal (login)
      container.innerHTML = '';
      container.appendChild(loginTemplate());
      break;
    case '#register': // ruta pantalla registro
      if (!firebaseGetValidUser()) {
        container.innerHTML = '';
        container.appendChild(registerTemplate());
      } else {
        setPageHash('#home');
      }
      break;
    case '#home':
      if (firebaseGetValidUser()) {
        container.innerHTML = '';
        container.appendChild(homeTemplate());
      } else {
        setPageHash('');
      }
      break;
      case '#profile':
        profileTemplate(container);
      break;
    default:
      break;
  }
};

export const setPageHash = (hash) => {
  window.location.hash = hash;
};

// export const changeRoute = (hash) => {
//   if (hash === '#home') {
//     window.history.replaceState({}, 'home', '/home');
//   } else if (hash === '#register') {
//     window.history.replaceState({}, 'register', '/register');
//   } else if (hash === '') {
//     window.history.replaceState({}, 'login', '/');
//   } else if (hash === '#profile') {
//     window.history.replaceState({}, 'profile', '/profile');
//   }
// };
