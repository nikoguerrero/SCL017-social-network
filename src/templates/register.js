export const registerTemplate = () => {
  const signUp = `
    <h3>BearHug</h3>
    <input type="text" id= "name_field" class="emailBox" placeholder="Ingresa tu nombre">
    <input type="email" id="signUpEmail" class="emailBox" placeholder="Ingresa tu correo">
    <input type="password" id="signUpPass" class="passwordBox" placeholder="Ingresa tu contraseña">
    <button class="buttonLog"> <a href="#/muro" id="registerButton">Registrar</a> </button>
    </div>`;

  return signUp;
};
