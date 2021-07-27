import { topNavBar } from './navbar.js';
import { saveData } from './post.js';

export const createPostModal = () => {
    const composePostContainer = document.createElement('div');
    composePostContainer.className = 'composePostContainer';
    const containerAddPost = document.createElement('section');
    containerAddPost.className = 'containerAddPost';
    const addPost = `
    <div class="containerComposePost" id="containerPost">
    <img src="./images/ejemploperfilfoto.png" class="feedPicProfile"> 
    <textarea id="postBox" class="createPostText" placeholder="Descríbelo aquí"></textarea>
    <button id="postButton" class="postButtonLink">compartir</button>
    </div>`;
  
    containerAddPost.innerHTML = addPost;
    
    composePostContainer.appendChild(topNavBar());
    composePostContainer.appendChild(containerAddPost);
    const postBox = composePostContainer.querySelector('#postBox');
    const sharePostButton = composePostContainer.querySelector('#postButton');
    sharePostButton.addEventListener('click', () => {
      saveData(postBox.value);
      document.getElementById('root').removeChild(composePostContainer);
    });
    return composePostContainer;
  };
  

  