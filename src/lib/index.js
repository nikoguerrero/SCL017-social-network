import { firebaseInit, firebaseLogin, firebaseLogout, firebaseRegisterUser } from './firebase.js';
import setTemplate from './routes.js';

export const initApp = () => {

  let uid = null;
  firebaseInit(() => {
    const user = firebase.auth().currentUser;
    if (user != null &&  user.emailVerified === true) {
      uid = user.uid;
      setTemplate('#feed');
    } else {
      setTemplate('');
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null &&  user.emailVerified === true) {
      uid = user.uid;
      setTemplate('#feed');
    } 
  });
};

window.addEventListener('hashchange', () => {
  setTemplate(location.hash);
});
