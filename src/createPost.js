export const postTemplate = () => {
  const containerAddPost = document.createElement("section");
  containerAddPost.className = "containerAddPost";

const addPost = `
<a href="#feed" id="goBack" class="backLink"></a>
<input type="text" placeholder="¿Como te sientes hoy?" id="postInput" class="postBox">
<button id="postButton" class="postButtonLink"></button>`;

containerAddPost.innerHTML= addPost;
return containerAddPost;

};