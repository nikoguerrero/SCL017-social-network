// función de inicializar firebase
let database = null;
export const firebaseGetDatabase = () => database;

export const firebaseInit = (onFirebaseInit) => {
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
  database = firebase.firestore();
  onFirebaseInit();
};


export const firebaseLogin = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
    // Signed in
    })
    .catch((error) => {
      const errorMessage = error.message;
      window.alert(`Error : ${errorMessage}`);
    });
};

export const firebaseGoogleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const userDataRef = firebaseGetDatabase().collection('userInfo').doc(result.user.uid);
      userDataRef.get().then((doc) => {
        if (doc.exists) {
          console.log('google signed in');
        } else {
          userDataRef.set({
            userId: result.user.uid,
            userName: result.user.displayName,
            userEmail: result.user.email,
            userPic: result.user.photoURL,
            userBio: 'Biografía',
            userInterests: 'Mis intereses'
          });
          console.log('registro exitoso con google');
        }
      });
    }).catch((error) => {
      console.log(error);
    });
};

export const firebaseLogout = () => {
  firebase.auth().signOut()
    .then(() => {
    })
    .catch((error) => {
      console.error(error);
    });
};

export const firebaseRegisterUser = (email, password, userName, onVerifyEmailSent) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      firebaseGetDatabase().collection('userInfo').doc(userCredential.user.uid).set({
        userId: firebase.auth().currentUser.uid,
        userName,
        userEmail: email,
        userPic: './images/ejemploperfilfoto.png',
        userBio: 'Biografía',
        userInterests: 'Mis intereses'
      });

      userCredential.user.updateProfile({
        displayName: userName,
        photoURL: './images/ejemploperfilfoto.png'
      });

      const user = firebase.auth().currentUser;
      if (user != null) {
        user.sendEmailVerification()
          .then(() => {
            onVerifyEmailSent();
            console.log('verification email sent');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
};

export const firebaseGetValidUser = () => {
  const user = firebase.auth().currentUser;
  if (user != null && user.emailVerified) {
    return user;
  }
  return null;
};
