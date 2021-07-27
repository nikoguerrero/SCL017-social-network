import { firebaseGetValidUser, firebaseInit } from './firebase.js';
import setTemplate from './routes.js';
import { realtimeListener } from '/templates/components/post.js';

export const initApp = () => {
  let uid = null;
  firebaseInit(() => {
    const user = firebaseGetValidUser();
    if (user != null) {
      uid = user.uid;
      setTemplate('#home');
    } else {
      setTemplate('');
    }
    realtimeListener();
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null && user.emailVerified === true) {
      uid = user.uid;
      setTemplate('#home');
    }
  });
};

window.addEventListener('hashchange', () => {
  setTemplate(window.location.hash);
});
