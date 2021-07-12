// Este es el punto de entrada de tu aplicacion

import { init } from './lib/firebase.js';
import { myFunction } from './lib/index.js';

init();
myFunction();

const routes = {
    '/' : main,
    '/' : register,
    '/' : feed
};

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

