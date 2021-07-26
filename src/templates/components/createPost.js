
import{ firebaseGetDatabase } from '/lib/firebase.js';
let editPostId = null;

export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('ul');
  publicPost.id = 'publicPost';
  publicPost.className = 'containerPublicPost';
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <div class="containerPost" id="containerPost">
  <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
  <img src="./images/ejemploperfilfoto.png" class="feedPicProfile"> 
  <textarea id="text-description" class="createPostText" placeholder="Descríbelo aquí"></textarea>
  <button id="postButton" class="postButtonLink">compartir</button>
  </div>`;

  containerAddPost.innerHTML = addPost;

  saveData(containerAddPost);

  containerAddPost.appendChild(publicPost);
  return containerAddPost;
};

const viewPost = (doc) => {
  const postsList = document.createElement('li');
  const postedText = document.createElement('span');
  const interactionElements = document.createElement('div');

  postedText.id = ('postedTextId');
  postsList.setAttribute('data-id', doc.id);
  postedText.textContent = doc.data().textDescription;

  postsList.className = ('li');
  postedText.className = ('postedText');
  interactionElements.className = 'interactionWrapper';
  
  publicPost.appendChild(postsList);
  postsList.appendChild(postedText);
  postsList.appendChild(interactionElements);
  interactionElements.appendChild(deleteUserPost());
  interactionElements.appendChild(editUserPost());
  interactionElements.appendChild(likeUserPost());
  interactionElements.appendChild(commentUserPost());
};

const saveData = (parentElement) => {
  const containerPost = parentElement.querySelector('#containerPost');
  const textDescription = containerPost.querySelector('#text-description');
  const postButton = parentElement.querySelector('#postButton');
  postButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (textDescription.value.length == '') {
      alert('Recuerda, para conectar necesitas expresarte ');
    } else {
      if (editPostId === null){ // si no hay post a editar, agrega un nuevo post
        await firebaseGetDatabase().collection('post').add({
          textDescription: textDescription.value
        });
      } else { // cuando se edita, se modifica el post selecionado
        await firebaseGetDatabase().collection('post').doc(editPostId).update({
          textDescription: textDescription.value
        });
        editPostId = null;
      }
    }
    textDescription.value = '';
  });
};

const editUserPost = (userPostBox) => {
  const edit = document.createElement('img');
  edit.className = ('edit');
  edit.src = './images/editpost.svg';

  // editar posts
  edit.addEventListener('click', async (e) => {
    e.stopPropagation();
    editPostId = e.target.parentElement.parentElement.getAttribute('data-id'); // guardamos el id del post
    const postData = await firebaseGetDatabase().collection('post').doc(editPostId).get(); // pasamos la data del post a la variable postData
    textDescription.value = postData.data().textDescription;
  });
  return edit;
};

const deleteUserPost = () => {
  const deletePost = document.createElement('img');
  deletePost.className = ('delete');
  deletePost.src = './images/deletepost.svg';

  // borrar posts
  deletePost.addEventListener('click', (e) => {
    e.stopPropagation();
    const textId = e.target.parentElement.parentElement.getAttribute('data-id');
    firebaseGetDatabase().collection('post').doc(textId).delete();
  });
  return deletePost;
};

const likeUserPost = () => {
  const like = document.createElement('img');
  like.className = ('likePost');
  like.src = './images/likepost.svg';
  return like;
};

const commentUserPost = () => {
  const comment = document.createElement('img');
  comment.className = ('commentPost');
  comment.src = './images/commentpost.svg';
  return comment;
};

export const realtimeListener = () => {
  firebaseGetDatabase().collection('post').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      // console.log(change.doc.data());
      if (change.type === 'added') {
        viewPost(change.doc);
      } else if (change.type === 'modified'){
        let postsList = publicPost.querySelector('[data-id="' + change.doc.id + '"]');
        postsList.querySelector('#postedTextId').textContent = change.doc.data().textDescription; // reescribir de forma inmediata el texte area. 
      } else if (change.type === 'removed') {
        let postsList = publicPost.querySelector('[data-id="' + change.doc.id + '"]');
        publicPost.removeChild(postsList);
      }
    });
  });
};

