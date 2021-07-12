import { login, logout, register } from './firebase.js';
// import { home } from './templates/home.js';

export const myFunction = () => {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      window.addEventListener('hashchange', function() {
        console.log('The hash has changed!')
      }, false);
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      document.getElementById('welcomeBox').style.display = "none";
      document.getElementById('loginBox').style.display = "";
    }
  });
  
  function userLogin() {
    let userEmail = document.getElementById('emailField').value;
    let userPass = document.getElementById('passwordField').value;
    login(userEmail, userPass);
  }

  function userLogout(){
    logout();
  }

  function userRegister(){
    let userEmail = document.getElementById('emailField').value;
    let userPass = document.getElementById('passwordField').value;
    register(userEmail, userPass);
  }


  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', userLogin);

  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', userLogout);

  const registerButton = document.getElementById('registerButton');
  registerButton.addEventListener('click', userRegister);
};


const home = `
<h3>BearHug</h3>
<input type="email" id="emailField" class="emailBox" placeholder="Ingresa tu correo">
<input type="password" id="passwordField" class="passwordBox" placeholder="Ingresa tu contraseña">
<button class="buttonLog"><a href="#/muro" id="loginButton">Ingresar</a></button>
<div class="secondOptionText">Ingresa con <a href="#registroGoogle" id="googleLogin">Google</a></div>
<div class="secondOptionText">¿No tienes cuenta? <a href="#registro" id="userReg">Regístrate aquí</a></div>`;

const div = document.querySelector("#root");



const name = document.querySelector("#name_field");

const userReg = `<h3>BearHug</h3>
<input type="text" id= "name_field" class="emailBox" placeholder="Ingresa tu nombre">
<input type="email" id="emailField" class="emailBox" placeholder="Ingresa tu correo">
<input type="password" id="passwordField" class="passwordBox" placeholder="Ingresa tu contraseña">
<button class="buttonLog"> <a href="#/muro" id="registerButton">Registrar</a> </button>`

div.innerHTML = home, userReg;



