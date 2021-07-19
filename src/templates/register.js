import { firebaseLogout, firebaseRegisterUser } from '../lib/firebase.js';

export const registerTemplate = () => {
  const containerRegister = document.createElement('section');
  containerRegister.className = 'containerRegisterClass';
  const signUp = `
  <header class="homeImage">
  <img src="images/logotype.png" class="logoReg">
  </header>
  <div class="regDisplay" id="registerForm">
    <div class="title">
      <h1 class="regTitle">Regístrate</h1>
      <div class="regSubtitle"> Rápido y fácil</div>
    </div>
    <div class="signupForm">
      <input type="text" id= "name_field" class="emailBox" placeholder="Ingresa tu nombre">
      <input type="email" id="signUpEmail" class="emailBox" placeholder="Ingresa tu correo">
      <input type="password" id="signUpPass" class="passwordBox" placeholder="Ingresa tu contraseña">
      <button class="buttonLog"><a id="registerButton">REGISTRARTE</a> </button>
      <div class="signinOptionText">¿Ya tienes cuenta? <a href="#">Inicia sesión aquí</a></div>
    </div>
    <p class="conditionsText">Al registrarte aceptas nuestras Condiciones, <br> Política de datos y Política de cookies. </p>
  </div>`;

  const verifyEmail = `
  <p> ENVIAMOS UN MENSAJE DE VERIFICACIÓN A TU CORREO. VALIDA TU CUENTA Y LUEGO INCIA SESIÓN </p>
  <button class="buttonLog"><a href="#">Volver al inicio</a></button>
  `;

  containerRegister.innerHTML = signUp;

  const registerButton = containerRegister.querySelector('#registerButton');
  registerButton.addEventListener('click', (e) => {
    const userEmail = containerRegister.querySelector('#signUpEmail').value;
    const userPass = containerRegister.querySelector('#signUpPass').value;
    e.preventDefault();
    firebaseRegisterUser(userEmail, userPass, () => {
      window.location.hash += '/verifyEmail';
      containerRegister.querySelector('#registerForm').innerHTML = verifyEmail;
      firebaseLogout();
    });
    console.log(userEmail, userPass);
  });
  return containerRegister;
};
