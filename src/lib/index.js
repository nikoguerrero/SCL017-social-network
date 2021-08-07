import { firebaseGetValidUser, firebaseInit } from './firebase.js';
import { setTemplate, setPageHash } from './routes.js';
import { realtimeListener } from '../templates/components/post.js';

export const initApp = () => {
  let uid = null;
  firebaseInit(() => {
    const user = firebaseGetValidUser();
    if (user != null) {
      console.log(user);
      uid = user.uid;
      setPageHash('#home');
    } else {
      setPageHash('');
    }
    realtimeListener();
  });

  // if (window.location.pathname === '/home') {
  //   setTemplate(window.location.hash);
  // } else if (window.location.pathname === '/register') {
  //   setTemplate('#register');
  // } else if (window.location.pathname === '/') {
  //   setTemplate('');
  // }

  // window.onpopstate = () => {
  //   if (window.location.pathname === '/home') {
  //     setTemplate('#home');
  //   } else if (window.location.pathname === '/register') {
  //     setTemplate('#register');
  //   } else if (window.location.pathname === '/') {
  //     setTemplate('');
  //   }
  // };

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null && user.emailVerified === true) {
      uid = user.uid;
      setPageHash('#home');
    }
  });
};

window.addEventListener('hashchange', () => {
  setTemplate(window.location.hash);
  // changeRoute(window.location.hash);
});
