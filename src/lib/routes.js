import { feedTemplate } from '../templates/feed.js';
import { homeTemplate } from '../templates/home.js';
import { registerTemplate } from '../templates/register.js';
import {
  firebaseLogin,
  firebaseLogout,
  firebaseRegisterUser,
  firebaseGoogleLogin,
} from './firebase.js';

const container = document.getElementById('root');

function setTemplate(route) {
  switch(route) {
    case '': // ruta principal (login)
      container.innerHTML = homeTemplate();
      const loginButton = document.getElementById('loginButton');
      loginButton.addEventListener('click', () => {  // evento para hacer click a loguear usuario con contraseña
        let userEmail = document.getElementById('emailField').value;
        let userPass = document.getElementById('passwordField').value;
        firebaseLogin(userEmail, userPass);
      });
      const signupLink = document.querySelector('#userReg');
      signupLink.addEventListener('click', () => { // evento para llevar a usuario a la pantalla de registro
        setTemplate('#register');
      });
      const googleButton = document.querySelector('#googleLogin');
      googleButton.addEventListener('click', (e) => { // evento para loguear a usuario a través de Google
        firebaseGoogleLogin();
      });
      break;
    case '#register': // ruta pantalla registro 
      container.innerHTML = registerTemplate();
      const registerButton = document.getElementById('registerButton');
      registerButton.addEventListener('click', (e) => {
        let userEmail = document.getElementById('signUpEmail').value;
        let userPass = document.getElementById('signUpPass').value;
        e.preventDefault();
        firebaseRegisterUser(userEmail, userPass);
        console.log(userEmail, userPass);
      });
      break;
    case '#feed': // ruta pantalla muro
      container.innerHTML = feedTemplate();
      const logoutButton = document.getElementById('logoutButton');
      logoutButton.addEventListener('click', () => {
        firebaseLogout();
      });
      break;
  }
  location.hash = route;
}

export default setTemplate;
