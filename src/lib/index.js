import { firebaseLogin, firebaseLogout, firebaseRegisterUser } from './firebase.js';
import setTemplate from './routes.js';

export const myFunction = () => {

  let uid = null;

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null &&  user.emailVerified === true) {
      uid = user.uid;
      setTemplate('#feed');
      // var uid = user.uid;
    } else {
      uid = null;
      setTemplate('');
    }
  });
};

window.addEventListener('hashchange', () => {
  setTemplate(location.hash);
});
