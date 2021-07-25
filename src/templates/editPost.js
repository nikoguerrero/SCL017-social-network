export const editModalTemplate = () => {
    const containerEditPost = document.createElement('div');
    containerEditPost.className = 'editPostModal';

    const editPost = `
    <div class="containerComposePost" id="containerPost">
    <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
    <img src="./images/ejemploperfilfoto.png" class="feedPicProfile"> 
    <textarea id="text-description" class="createPostText"></textarea>
    <button id="postButton" class="postButtonLink">guardar</button>
    </div>`;
    containerEditPost.innerHTML = editPost;
};