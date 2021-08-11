import { firebaseGetDatabase } from '../../../lib/firebase.js';

const removePost = (e) => {
  const textId = e.target.parentElement.parentElement.getAttribute('data-id');
  firebaseGetDatabase().collection('post').doc(textId).delete();
};

const confirmDeletePost = (e) => {
  const answer = window.confirm('¿Deseas borrar el post?');
  if (answer === true) {
    removePost(e);
  }
};

export const deleteButton = () => {
  const deletePost = document.createElement('img');
  const deletePostText = document.createElement('span');
  deletePost.className = 'delete';
  deletePostText.className = 'deletePostText';
  deletePostText.innerText = 'borrar';
  deletePost.src = './images/deletepost.svg';

  deletePost.addEventListener('click', (e) => {
    e.stopPropagation();
    confirmDeletePost(e);
  });

  deletePost.appendChild(deletePostText);
  return deletePost;
};
