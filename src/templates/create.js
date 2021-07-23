export const createPostTemplate = () => {
    const containerAddPost = document.createElement('section');
    const publicPost = document.createElement('ul');
    publicPost.id = ('#publicPost');
    publicPost.className = ('containerPublicPost');
    containerAddPost.className = 'containerAddPost';
  
    const addPost = `
    <div class="containerPost" id="containerPost">
    <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
    <img src="./images/ejemploperfilfoto.png" class="feedPicProfile"> 
    <textarea id="text-description" class="createPostText" placeholder="Descríbelo aquí"></textarea>
    <button id="postButton" class="postButtonLink">compartir</button>
    </div>`;
  
    containerAddPost.innerHTML = addPost;
    return containerAddPost;
  };