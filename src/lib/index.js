import { firebaseLogin, firebaseLogout, firebaseRegisterUser } from './firebase.js';
import setTemplate from './routes.js';

export const myFunction = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setTemplate('#feed');
      // var uid = user.uid;
    } else {
      setTemplate('');
    }
  });
};

window.addEventListener('hashchange', () => {
  setTemplate(location.hash);
});

// function userLogin() {
//   let userEmail = document.getElementById('emailField').value;
//   let userPass = document.getElementById('passwordField').value;
//   firebaseLogin(userEmail, userPass);
// }

// function userLogout(){
//   firebaseLogout();
// }

// function userRegister(e){
//   let userEmail = document.getElementById('signUpEmail').value;
//   let userPass = document.getElementById('signUpPass').value;
//   e.preventDefault();
//   firebaseRegisterUser(userEmail, userPass);

//   console.log(userEmail, userPass);
// }

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
