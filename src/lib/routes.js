import { profileTemplate } from '../templates/components/profileUser.js';
import { homeTemplate } from '../templates/home.js';
import { loginTemplate } from '../templates/login.js';
import { registerTemplate } from '../templates/register.js';
import { firebaseGetDatabase, firebaseGetValidUser } from './firebase.js';

const container = document.getElementById('root');

export const setTemplate = (route) => {
  if (firebaseGetValidUser()) {
    switch (route) {
      case '#home':
        container.innerHTML = '';
        container.appendChild(homeTemplate());
        break;
      case '#profile':
        profileTemplate(container);
        break;
      case '#login':
      case '#register':
      default:
        setPageHash('#home');
        break;
    }
  } else {
    container.innerHTML = '';
    switch (route) {
      case '#login':
        container.appendChild(loginTemplate());
        break;
      case '#register':
        container.appendChild(registerTemplate());
        break;
    }
  }
};

export const setPageHash = (hash) => {
  if (hash === window.location.hash) {
    setTemplate(hash);
  } else {
    window.location.hash = hash;
  }
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
