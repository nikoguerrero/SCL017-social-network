import setTemplate from "../lib/routes.js";

export const createPostTemplate = () => {
    const containerAddPost = document.createElement('section');
    containerAddPost.className = 'containerAddPost';
  
    const addPost = `
    <div class="containerPost" id="containerPost">
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
        alert('Recuerda, para conectar necesitas experesarte ');
        } else {
            await db.collection('post').add({
            textDescription: textDescription.value
            });
        }
        setTemplate('#feed');
        textDescription.value = ''
    });
    return containerAddPost;
  };