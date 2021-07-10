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

  let logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', logout);

};
