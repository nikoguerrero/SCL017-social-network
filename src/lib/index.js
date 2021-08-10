import { firebaseGetValidUser, firebaseInit } from './firebase.js';
import { setTemplate, setPageHash } from './routes.js';
import { realtimeListener } from '../dataFunctions/firebaseListener.js';

export const initApp = () => {
  let uid = null;
  firebaseInit(() => {
    const user = firebaseGetValidUser();
    // if (user != null) {
    //   console.log(user);
    //   uid = user.uid;
    //   setPageHash('#home');
    // } else {
    //   setPageHash('');
    // }
    setTemplate(window.location.hash);
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
      setPageHash('#home');
    } else {
      setPageHash('#login');
    }
  });
};

window.addEventListener('hashchange', () => {
  setTemplate(window.location.hash);
  // changeRoute(window.location.hash);
});
