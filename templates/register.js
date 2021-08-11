import { firebaseLogout, firebaseRegisterUser } from '../lib/firebase.js';

export const registerTemplate = () => {
  const containerRegister = document.createElement('section');
  containerRegister.className = 'containerRegisterGrid';
  const signUp = `
  <header class="homeImage" id="displayReg">
  <img src="images/logotype.png" class="logoReg">
  </header>
  <div class="regDisplay" id="registerForm">
    <div class="title">
      <h1 class="regTitle">Regístrate</h1>
      <div class="regSubtitle"> Rápido y fácil</div>
    </div>
    <div class="signupForm">
      <input type="text" id= "signUpName" class="emailBox" placeholder="Ingresa tu nombre">
      <input type="email" id="signUpEmail" class="emailBox" placeholder="Ingresa tu correo">
      <input type="password" id="signUpPass" class="passwordBox" placeholder="Ingresa tu contraseña">
      <button class="buttonLog" id="registerButton">REGISTRARTE </button>
      <div class="signinOptionText">¿Ya tienes cuenta? <a href="#login">Inicia sesión aquí</a></div>
    </div>
    <p class="conditionsText">Al registrarte aceptas nuestras Condiciones, <br> Política de datos y Política de cookies. </p>
  </div>`;

  const verifyEmail = `
  <h1 class="verifyEmailTitle"> Verifica tu email</h1>
  <p class="validateEmailP"> Te hemos enviado un link de activación <br> a tu correo. Por favor, valida tu cuenta <br> antes de iniciar sesión</p>
  <button class="buttonLog" id="backToLogin"><a href="#login">VOLVER AL INICIO</a></button>
  `;

  containerRegister.innerHTML = signUp;

  const passInput = containerRegister.querySelector('#signUpPass');
  const registerButton = containerRegister.querySelector('#registerButton');
  passInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      registerButton.click();
    }
  });

  registerButton.onclick = (e) => {
    const userName = containerRegister.querySelector('#signUpName').value;
    const userEmail = containerRegister.querySelector('#signUpEmail').value;
    const userPass = containerRegister.querySelector('#signUpPass').value;
    e.preventDefault();
    firebaseRegisterUser(userEmail, userPass, userName, () => {
      window.location.hash += '/verifyEmail';
      containerRegister.querySelector('#registerForm').innerHTML = verifyEmail;
      firebaseLogout();
    });
  };
  return containerRegister;
};
