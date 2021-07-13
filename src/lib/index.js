import { firebaseLogin, firebaseLogout, firebaseRegisterUser } from './firebase.js';
import setTemplate from './routes.js';

function userLogin() {
  let userEmail = document.getElementById('emailField').value;
  let userPass = document.getElementById('passwordField').value;
  firebaseLogin(userEmail, userPass);
}

function userLogout(){
  firebaseLogout();
}

function userRegister(e){
  let userEmail = document.getElementById('signUpEmail').value;
  let userPass = document.getElementById('signUpPass').value;
  e.preventDefault();
  firebaseRegisterUser(userEmail, userPass);

  console.log(userEmail, userPass);
}

export const myFunction = () => {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setTemplate('#feed');
      var uid = user.uid;
    } else {
      setTemplate('');
    }
  });
  
  // const googleButton = document.querySelector('#googleLogin');
  // googleButton.addEventListener('click', (e) => {
  //   console.log('click google');
  // });

  // const loginButton = document.getElementById('loginButton');
  // loginButton.addEventListener('click', userLogin);

  // const logoutButton = document.getElementById('logoutButton');
  // logoutButton.addEventListener('click', userLogout);

  // const registerButton = document.getElementById('registerButton');
  // registerButton.addEventListener('click', userRegister);
};


// const div = document.querySelector("#root");

setTemplate('#feed');

window.addEventListener('hashchange', () => {
  setTemplate(location.hash);
});


// const name = document.querySelector("#name_field");

// const userReg = `<h3>BearHug</h3>
// <div id="signUpForm">
// <input type="text" id= "name_field" class="emailBox" placeholder="Ingresa tu nombre">
// <input type="email" id="signUpEmail" class="emailBox" placeholder="Ingresa tu correo">
// <input type="password" id="signUpPass" class="passwordBox" placeholder="Ingresa tu contraseña">
// <button class="buttonLog"> <a href="#/muro" id="registerButton">Registrar</a> </button>
// </div>`


