import setTemplate from "../lib/routes.js";
import { viewPost } from "./components/createPost.js";
import { topNavBar } from "./components/navbar.js";

export const createPostTemplate = () => {
    const containerCreatePost = document.createElement('div');
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
        setTemplate('#feed');
        e.preventDefault();
        if (textDescription.value.length == '') {
        alert('Recuerda, para conectar necesitas expresarte ');
        } else {
            const postAdd = await db.collection('post').add({ textDescription: textDescription.value });
            const postDb = await db.collection('post').get();
            const postDocs = postDb.docs;
            const publicPost = document.getElementById('publicPost');
            postDocs.forEach( (doc) => {
              if (doc.id != postAdd.id) {
                viewPost(doc, publicPost);
              }
            });
        }
        textDescription.value = ''
    });
    containerCreatePost.appendChild(topNavBar());
    containerCreatePost.appendChild(containerAddPost);
    return containerCreatePost;
  };
  

  