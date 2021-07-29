import{ firebaseGetDatabase } from '/lib/firebase.js';
import { editPostModal } from './editPostModal.js';

export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('ul');
  publicPost.id = 'publicPost';
  publicPost.className = 'containerPublicPost';
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <div class="containerPost" id="containerPost">
  <div class="feedPostInfo" id="feedPostInfo">
    <img src="./images/ejemploperfilfoto.png" class="feedPicProfile"> 
    <textarea id="text-description" class="createPostText" placeholder="Descríbelo aquí"></textarea>
  </div>
  <div class="footerPost" id="footerPost">
    <button id="postButton" class="postButtonLink">Compartir</button>
  </div>
  </div>`;

  containerAddPost.innerHTML = addPost;

  const containerPost = containerAddPost.querySelector('#containerPost');
  const textDescription = containerPost.querySelector('#text-description');
  const postButton = containerAddPost.querySelector('#postButton');
  postButton.addEventListener('click', async (e) => {
    e.preventDefault();
    saveData(textDescription.value);
    textDescription.value = '';
  });

  containerAddPost.appendChild(publicPost);
  return containerAddPost;
};

export const viewPost = (doc, publicPost, isFirstElement) => {
  const postsList = document.createElement('li');
  const postedText = document.createElement('span');
  const interactionElements = document.createElement('div');
  const timePost = document.createElement('div');

  postedText.id = 'postedTextId';
  timePost.id = 'timePost';
  postsList.setAttribute('data-id', doc.id);
  postedText.textContent = doc.data().textDescription;
  const postTimestamp = doc.data().timestamp;
  if(postTimestamp != null) {
    const shortTime = postTimestamp.toDate().toDateString() + ' ' + postTimestamp.toDate().toLocaleTimeString(); // pasa el objeto del tiempo a un string
    timePost.innerHTML = shortTime; // imprimo en pantalla el string del tiempo
  }

  postsList.className = 'li';
  postedText.className = 'postedText';
  timePost.className = 'timeStamp';
  interactionElements.className = 'interactionWrapper';
  
  if (isFirstElement) {
    publicPost.prepend(postsList);
  } else {
    publicPost.appendChild(postsList);
  }  

  postsList.appendChild(timePost);
  postsList.appendChild(postedText);
  postsList.appendChild(interactionElements);
  interactionElements.appendChild(deleteUserPost());
  interactionElements.appendChild(editUserPost());
  interactionElements.appendChild(likeUserPost());
  interactionElements.appendChild(commentUserPost());
};

export const saveData = async (textDescription) => { // parametro textDescription es textDescription.value (es un string)
  if (textDescription.length == '') {
    alert('Recuerda, para conectar necesitas expresarte ');
  } else {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    await firebaseGetDatabase().collection('post').add({
      textDescription: textDescription,
      timestamp: timestamp
    });
  }
};


const editUserPost = () => {
  const edit = document.createElement('img');
  edit.className = 'edit';
  edit.src = './images/editpost.svg';

  // editar posts
  edit.addEventListener('click', async (e) => { // click a boton de lapiz
    e.stopPropagation();
    const editPostId = e.target.parentElement.parentElement.getAttribute('data-id'); // guardamos el id del post
    const postData = await firebaseGetDatabase().collection('post').doc(editPostId).get(); // pasamos la data del post a la variable postData
    document.getElementById('root').appendChild(editPostModal());
    const editPostBox = document.getElementById('editBoxText');
    editPostBox.value = postData.data().textDescription;
    addEditEvent(editPostId);
    cancelEditedPost();
  });
  return edit;
};

const addEditEvent = (editPostId) => {
  const saveTopButton = document.getElementById('saveTopButton');
  const buttonPostEdit = document.getElementById('buttonPostEdit');
  const editContainer = document.getElementById('editContainer');
  
  saveTopButton.addEventListener('click', async (e) => {
    e.preventDefault();
    saveEditedPost(editPostId);
    document.getElementById('root').removeChild(editContainer);
  });

  buttonPostEdit.addEventListener('click', async (e) => {
    e.preventDefault();
    saveEditedPost(editPostId);
    cancelEditedPost();
    document.getElementById('root').removeChild(editContainer);
  });
};

const saveEditedPost = async (editPostId) => { // guarda el post ya editado
    await firebaseGetDatabase().collection('post').doc(editPostId).update({
      textDescription: document.getElementById('editBoxText').value
    });
};

const cancelEditedPost = () => { // cancela el post editado
  const cancelEdit = document.getElementById('cancelLink');
  cancelEdit.addEventListener('click', async (e) => {
    e.preventDefault();
    const editContainer = document.getElementById('editContainer');
    document.getElementById('root').removeChild(editContainer);    
  }); 
};

const deleteUserPost = () => {
  const deletePost = document.createElement('img');
  const deletePostText = document.createElement('span');
  deletePost.className = 'delete';
  deletePostText.className = 'deletePostText';
  deletePostText.innerText = 'borrar';
  deletePost.src = './images/deletepost.svg';

  // borrar posts
  deletePost.addEventListener('click', (e) => {
    e.stopPropagation();
    const textId = e.target.parentElement.parentElement.getAttribute('data-id');
    firebaseGetDatabase().collection('post').doc(textId).delete();
  });
  deletePost.appendChild(deletePostText);
  return deletePost;
};

const likeUserPost = () => {
  const like = document.createElement('img');
  like.className = 'likePost';
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
  firebaseGetDatabase().collection('post')
  .orderBy('timestamp', 'desc')
  .onSnapshot(snapshot => {
    const publicPost = document.getElementById('publicPost');
    if (publicPost != null) {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        console.log(change);
        if (change.type === 'added') {
          viewPost(change.doc, publicPost, change.newIndex === 0);
        } else if (change.type === 'modified') {
          let postsList = publicPost.querySelector('[data-id="' + change.doc.id + '"]');
          postsList.querySelector('#postedTextId').textContent = change.doc.data().textDescription; // reescribir de forma inmediata el texte area. 
          const postTimestamp = change.doc.data().timestamp;
          if(postTimestamp != null) {
            const shortTime = postTimestamp.toDate().toDateString() + ' ' + postTimestamp.toDate().toLocaleTimeString();
            postsList.querySelector('#timePost').innerHTML = shortTime;
          }
          
        } else if (change.type === 'removed') {
          let postsList = publicPost.querySelector('[data-id="' + change.doc.id + '"]');
          publicPost.removeChild(postsList);
        }
      });
    }
  });
};

