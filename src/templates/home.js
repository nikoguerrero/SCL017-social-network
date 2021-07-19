import { firebaseLogin, firebaseGoogleLogin } from '../lib/firebase.js';

export const homeTemplate = () => {
  const user = firebase.auth().currentUser;
  const containerLogin = document.createElement('section');
  containerLogin.className = 'grid';

  const login = `
    <div class="homeImage">
      <img src="images/logotype.png" class="logotype">
    </div>
    <h3> Crea conexiones <br> cercanas </h3>
    <div class="formLogin">
      <div id="verifyEmailMessage"></div>
      <input type="email" id="emailField" class="emailBox" placeholder="Ingresa tu correo">
      <input type="password" id="passwordField" class="passwordBox" placeholder="Ingresa tu contraseña">
      <button class="buttonLog"><a id="loginButton">INGRESAR</a></button>
    </div>
    <div class="options">
      <div class="secondOptionText">Ingresa con <a href="#signinGoogle" id="googleLogin">
      <img src="images/googleicon.svg" id="googleLogin" class="googleButton"></a>
      <div class="signupOptionText">¿No tienes cuenta? <a href="#register" id="userReg">Regístrate aquí</a></div>
    </div>
   `;

  containerLogin.innerHTML = login; // hace el nodo.

  const verifyEmailMessage = containerLogin.querySelector('#verifyEmailMessage');
  if (user != null && user.emailVerified === false) {
    verifyEmailMessage.innerHTML = 'HEMOS ENVIADO UN CORREO <br> A TU CUENTA. <br> VERIFICA TU CUENTA <br> ANTES DE INGRESAR';
  }

  const loginButton = containerLogin.querySelector('#loginButton');
  loginButton.addEventListener('click', () => { // evento para hacer click a loguear usuario con contraseña
    const userEmail = containerLogin.querySelector('#emailField').value;
    const userPass = containerLogin.querySelector('#passwordField').value;
    firebaseLogin(userEmail, userPass);
  });
  const signupLink = containerLogin.querySelector('#userReg');
  signupLink.addEventListener('click', () => { // evento para llevar a usuario a la pantalla de registro con el #Register
  });
  const googleButton = containerLogin.querySelector('#googleLogin');
  googleButton.addEventListener('click', () => { // evento para loguear a usuario a través de Google
    firebaseGoogleLogin();
  });

  return containerLogin;
};
