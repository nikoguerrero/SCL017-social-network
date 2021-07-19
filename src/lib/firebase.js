// función de inicializar firebase
export const firebaseInit = (onFirbaseInit) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC7VRqwv_KqG8k7lA6EpUuPIvQ70r-jafY',
    authDomain: 'bearhug-ca9c3.firebaseapp.com',
    projectId: 'bearhug-ca9c3',
    storageBucket: 'bearhug-ca9c3.appspot.com',
    messagingSenderId: '518796083283',
    appId: '1:518796083283:web:2a47b273fcd1b933e586a6',
    measurementId: 'G-XEMSLEFBF3'
  };
  firebase.initializeApp(firebaseConfig);
  onFirbaseInit();
};

// función de hacer login con firebase
export const firebaseLogin = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(`Error : ${errorMessage}`);
    });
};

// función de hacer login a través de Google con Firebase
export const firebaseGoogleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log('google signed in');
    })
    .catch((error) => {
      console.error(error);
    });
};

// función de salir del login con firebase
export const firebaseLogout = () => {
  firebase.auth().signOut()
    .then(() => {
    })
    .catch((error) => {
      console.error(error);
    });
};

// función de registrar al usuario con firebase
export function firebaseRegisterUser(email, password, onVerifyEmailSent) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = firebase.auth().currentUser;
      if (user != null) {
        user.sendEmailVerification()
          .then(() => {
            console.log('verification email sent');
            onVerifyEmailSent();
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // Signed in
      // const user = userCredential.user;
      // console.log(userCredential);
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
}

export const firebaseGetValidUser = () => {
  const user = firebase.auth().currentUser;
  if (user != null && user.emailVerified) {
    return user;
  }
  return null;
};


