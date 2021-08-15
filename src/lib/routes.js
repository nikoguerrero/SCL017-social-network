import { profileTemplate } from '../templates/userProfile.js';
import { homeTemplate } from '../templates/home.js';
import { loginTemplate } from '../templates/login.js';
import { registerTemplate } from '../templates/register.js';
import { firebaseGetValidUser } from './firebase.js';

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
    switch (route) {
      case '#login':
        container.innerHTML = '';
        container.appendChild(loginTemplate());
        break;
      case '#register':
        container.innerHTML = '';
        container.appendChild(registerTemplate());
        break;
      default:
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
