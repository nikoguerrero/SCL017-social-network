
function init(){
  var firebaseConfig = {
      apiKey: "AIzaSyC7VRqwv_KqG8k7lA6EpUuPIvQ70r-jafY",
      authDomain: "bearhug-ca9c3.firebaseapp.com",
      projectId: "bearhug-ca9c3",
      storageBucket: "bearhug-ca9c3.appspot.com",
      messagingSenderId: "518796083283",
      appId: "1:518796083283:web:2a47b273fcd1b933e586a6",
      measurementId: "G-XEMSLEFBF3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
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

function logout() {
  firebase.auth().signOut().then(() => {
      window.alert('deslogueado');
    }).catch((error) => {
      console.error(error);
      // An error happened.
    });
}

function register() {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}

export { init, login, logout, register };