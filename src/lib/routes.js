import { feedTemplate } from '../templates/feed.js';
import { homeTemplate } from '../templates/home.js';
import { registerTemplate } from '../templates/register.js';
// import {
//   firebaseLogin,
//   firebaseLogout,
//   firebaseRegisterUser,
//   firebaseGoogleLogin,
// } from './firebase.js';

const container = document.getElementById('root');

function setTemplate(route) {
  switch(route) {
    case '': // ruta principal (login)
      container.innerHTML = '';
      container.appendChild(homeTemplate());
      break;
    case '#register': // ruta pantalla registro 
      container.innerHTML = '';
      container.appendChild(registerTemplate()); // empujamos nuestro hijo.
      break;
    case '#feed': // ruta pantalla muro
      container.innerHTML = '';
      container.appendChild(feedTemplate());
      break;
  }
  location.hash = route;
}

export default setTemplate;
