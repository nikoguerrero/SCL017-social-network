export const homeTemplate = () => {
  const login = `
    <h3>BearHug</h3>
    <input type="email" id="emailField" class="emailBox" placeholder="Ingresa tu correo">
    <input type="password" id="passwordField" class="passwordBox" placeholder="Ingresa tu contraseña">
    <button class="buttonLog"><a href="#/muro" id="loginButton">Ingresar</a></button>
    <div class="secondOptionText">Ingresa con <a href="#registroGoogle" id="googleLogin">Google</a></div>
    <div class="secondOptionText">¿No tienes cuenta? <a href="#registro" id="userReg">Regístrate aquí</a></div>`;
  return login;
};
