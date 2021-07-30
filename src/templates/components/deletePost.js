import { firebaseGetDatabase } from '/lib/firebase.js';

export const deleteButton = () => {
    const deletePost = document.createElement('img');
    const deletePostText = document.createElement('span');
    deletePost.className = 'delete';
    deletePostText.className = 'deletePostText';
    deletePostText.innerText = 'borrar';
    deletePost.src = './images/deletepost.svg';
  
    // borrar posts
    deletePost.addEventListener('click', (e) => {
      e.stopPropagation();
      confirmDeletePost(e);
    });
    deletePost.appendChild(deletePostText);
    return deletePost;
  };
  
const confirmDeletePost = (e) => {
    const answer = confirm('deseas borrar el post?');
      if (answer === true){
        removePost(e);
      }
  };
  
const removePost =  (e) => {
    const textId = e.target.parentElement.parentElement.getAttribute('data-id');
    firebaseGetDatabase().collection('post').doc(textId).delete();
  };