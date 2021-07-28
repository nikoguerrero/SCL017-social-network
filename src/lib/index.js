import {  firebaseInit } from './firebase.js';
import { setTemplate, changeRoute } from './routes.js';
import { realtimeListener } from '/templates/components/post.js';

export const initApp = () => {
  let uid = null;
  firebaseInit(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid;
        setTemplate('#home');
      } else {
        setTemplate('');
        console.log('ratata');
      }
      realtimeListener();
    });
    // if (user != null) {
    //   uid = user.uid;
    //   setTemplate('#home');
    // } else {
    //   setTemplate('');
    // }
    // realtimeListener();
  });
console.log(window.location.pathname);
console.log(window.location.hash);
  if (window.location.pathname === '/home') {
    setTemplate('#home');
  } else if (window.location.pathname === '/register') {
    setTemplate('#register');
  } else if (window.location.pathname === '/') {
    setTemplate('');
  }

  window.onpopstate = () => {
    if (window.location.pathname === '/home') {
      setTemplate('#home');
    } else if (window.location.pathname === '/register') {
      setTemplate('#register');
    } else if (window.location.pathname === '/') {
      setTemplate('');
    }
  };

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user != null && user.emailVerified === true) {
  //     uid = user.uid;
  //     setTemplate('#home');
  //   }
  // });
};

window.addEventListener('hashchange', () => {
  setTemplate(window.location.hash);
  changeRoute(window.location.hash);
});



