
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

function login(){
    let userEmail = document.getElementById("email_field").value;
    let userPass = document.getElementById("password_field").value;

}
export { init, login };