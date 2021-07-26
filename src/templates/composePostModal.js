import setTemplate from "../lib/routes.js";
import { topNavBar } from "./components/navbar.js";

export const createPostTemplate = () => {
    const containerCreatePost = document.createElement('div');
    containerCreatePost.className = 'containerCreatePost';
    const containerAddPost = document.createElement('section');
    containerAddPost.className = 'containerAddPost';
    const addPost = `
    <div class="containerComposePost" id="containerPost">
    <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
    <img src="./images/ejemploperfilfoto.png" class="feedPicProfile"> 
    <textarea id="text-description" class="createPostText" placeholder="Descríbelo aquí"></textarea>
    <button id="postButton" class="postButtonLink">compartir</button>
    </div>`;
  
    containerAddPost.innerHTML = addPost;
    const db = firebase.firestore();
    const containerPost = containerAddPost.querySelector('#containerPost');
    const textDescription = containerPost.querySelector('#text-description');
    const postButton = containerAddPost.querySelector('#postButton');
    postButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (textDescription.value.length == '') {
        alert('Recuerda, para conectar necesitas expresarte ');
        } else {
            await db.collection('post').add({
            textDescription: textDescription.value
            });
        }
        setTemplate('#feed');
        textDescription.value = ''
    });
    containerCreatePost.appendChild(topNavBar());
    containerCreatePost.appendChild(containerAddPost);
    return containerCreatePost;
  };
  

  