// aqui exportaras las funciones que necesites


export const myFunction = () => {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      document.getElementById('welcomeBox').style.display = "";
      document.getElementById('loginBox').style.display = "none";
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      document.getElementById('welcomeBox').style.display = "none";
      document.getElementById('loginBox').style.display = "";
    }
  });

  
  function login() {
    let userEmail = document.getElementById('email_field').value;
    let userPass = document.getElementById('password_field').value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);
    });
  

  }


  let loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', login);

  function logout(){
    firebase.auth().signOut().then(() => {
      window.alert('deslogueado');
    }).catch((error) => {
      console.error(error);
      // An error happened.
    });
  }

  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', logout);

};
const home = `<h3>BearHug</h3>
<input type="email" id="email_field" class="emailBox" placeholder="Ingresa tu correo">
<input type="password" id="password_field" class="passwordBox" placeholder="Ingresa tu contraseña">
<div  class="buttonLog"> <a href="#/muro" id="loginButton">Ingresar</a> </div>
<div class="secondOptionText">Ingresa con <a href="#registroGoogle" id="googleLogin">Google</a> </div>
<div class="registerText">¿No tienes cuenta?<a href="#registro" id="userReg">Regístrate aquí</a></div>`
const div = document.querySelector("#loginBox")

const name = document.querySelector("#name_field");

const register = `<h3>BearHug</h3>
<input type="text" id= "name_field" class="emailBox" placeholder="Ingresa tu nombre">
<input type="email" id="email_field" class="emailBox" placeholder="Ingresa tu correo">
<input type="password" id="password_field" class="passwordBox" placeholder="Ingresa tu contraseña">
<div  class="buttonLog"> <a href="#/muro" id="loginButton">Registrar</a> </div>`

div.innerHTML = home,  register;
