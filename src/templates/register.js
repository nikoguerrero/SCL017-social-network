import { firebaseRegisterUser } from '../lib/firebase.js';

export const registerTemplate = () => {
  const containerRegister = document.createElement("div");
  containerRegister.className = "containerRegisterClass"
  const signUp = `
  <div class="homeImage">
  <img src="images/logotipo.png" class="logotipo">
  </div>
    <input type="text" id= "name_field" class="emailBox" placeholder="Ingresa tu nombre">
    <input type="email" id="signUpEmail" class="emailBox" placeholder="Ingresa tu correo">
    <input type="password" id="signUpPass" class="passwordBox" placeholder="Ingresa tu contraseña">
    <button class="buttonLog"> <a href="#feed" id="registerButton">Registrar</a> </button>
    </div>`;

    // agregar parrafo 
containerRegister.innerHTML = signUp;
const registerButton = containerRegister.querySelector('#registerButton');
registerButton.addEventListener('click', (e) => {
  let userEmail = containerRegister.querySelector('#signUpEmail').value;
  let userPass = containerRegister.querySelector('#signUpPass').value;
  e.preventDefault();
  firebaseRegisterUser(userEmail, userPass);
  console.log(userEmail, userPass);
});
  return containerRegister;
};
