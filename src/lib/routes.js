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
        setTemplate('#home');
      }
      break;
    case '#home':
      if (firebaseGetValidUser()) {
        container.innerHTML = '';
        container.appendChild(homeTemplate());
      } else {
        setTemplate('');
      }
      break;
    default:
      break;
  }
  // window.location.hash = route;
};

export const changeRoute = (hash) => {
  if (hash === '#home') {
    window.history.replaceState({}, 'home', '/home');
  } else if (hash === '#register') {
    window.history.replaceState({}, 'register', '/register');
  } else if (hash === '') {
    window.history.replaceState({}, 'login', '/');
  } else if (hash === '#/verifyEmail') {
    window.history.replaceState({}, 'verifyEmail', 'register/verifyEmail');
  }
};
