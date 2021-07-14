import { firebaseLogin, firebaseLogout, firebaseRegisterUser } from './firebase.js';
import setTemplate from './routes.js';

export const myFunction = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setTemplate('#feed');
      // var uid = user.uid;
    } else {
      setTemplate('');
    }
  });
};

window.addEventListener('hashchange', () => {
  setTemplate(location.hash);
});
