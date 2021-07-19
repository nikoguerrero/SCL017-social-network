import { firebaseLogout, firebaseRegisterUser } from '../lib/firebase.js';

export const registerTemplate = () => {
  const containerRegister = document.createElement('section');
  containerRegister.className = 'containerRegisterClass';
  const signUp = `
  <div class="homeImage">
  <img src="images/logotipo.png" class="logotipo">
  </div>
  <div class="formRegisterLogin" id="registerForm">
    <input type="text" id= "name_field" class="emailBox" placeholder="Ingresa tu nombre">
    <input type="email" id="signUpEmail" class="emailBox" placeholder="Ingresa tu correo">
    <input type="password" id="signUpPass" class="passwordBox" placeholder="Ingresa tu contraseña">
    <button class="buttonLog"><a id="registerButton">Registrar</a> </button>
    <div class="signinOptionText">¿Ya tienes cuenta? <a href="#">Inicia sesión aquí</a></div>
    <p>Al hacer clic en "Registrar", aceptas nuestras Condiciones, la Política de datos y la Política de cookies. </p>
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
