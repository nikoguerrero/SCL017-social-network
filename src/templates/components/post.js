import { firebaseGetDatabase } from '../../lib/firebase.js';
import { deleteButton } from './deletePost.js';
import { editButton } from './editPost.js';

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
    <textarea id="text-description" class="createPostText" maxlength ="260" rows="2" colums="20" placeholder ="Descríbelo aquí"></textarea>
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
  const usernameDisplay = document.createElement('div'); // div para nombre usuario
  const timePost = document.createElement('div');
  const postAndPicContainer = document.createElement('div');
  const userPicture = document.createElement('img'); // div para imagen de usuario (por defecto por ahora)
  const postedText = document.createElement('span');
  const interactionElements = document.createElement('div');
  const currentUserId = firebase.auth().currentUser.uid; // Id del usuario conectado
  const userDataObject = doc.data(); // guardamos las prop. del objeto post

  usernameDisplay.id = 'usernameDisplay';
  timePost.id = 'timePost';
  userPicture.id = 'userPicture';
  postedText.id = 'postedTextId';

  postsList.className = 'li';
  timePost.className = 'timeStamp';
  postAndPicContainer.className = 'postAndPic';
  userPicture.className = 'userProfilePic';
  usernameDisplay.className = 'nameDisplay';
  postedText.className = 'postedText';
  interactionElements.className = 'interactionWrapper';

  postsList.setAttribute('data-id', doc.id);
  postedText.textContent = userDataObject.textDescription;
  const postTimestamp = userDataObject.timestamp;
  if (postTimestamp != null) {
    const shortTime = `${postTimestamp.toDate().toDateString()} ${postTimestamp.toDate().toLocaleTimeString()}`;
    timePost.innerHTML = shortTime;
  }

  // se imprime el nombre de usuario en los posts publicados
  usernameDisplay.innerHTML = userDataObject.username;
  userPicture.src = userDataObject.userPic; // se agrega la foto por defecto en el post publicado

  if (isFirstElement) {
    publicPost.prepend(postsList);
  } else {
    publicPost.appendChild(postsList);
  }

  postsList.appendChild(usernameDisplay);
  postsList.appendChild(timePost);
  postsList.appendChild(postAndPicContainer);
  postAndPicContainer.appendChild(userPicture);
  postAndPicContainer.appendChild(postedText);
  postsList.appendChild(interactionElements);

  /* si la id del usuario del post es la misma que la id del usuario conectado,
  se agrega el botón de eliminar y editar */
  if (userDataObject.userId === currentUserId) {
    interactionElements.appendChild(deleteButton());
    interactionElements.appendChild(editButton());
  }
  interactionElements.appendChild(likeButton());
  interactionElements.appendChild(commentButton());
};

// parámetro textDescription es textDescription.value (es un string)
export const saveData = async (textDescription) => {
  if (textDescription.length == '') {
    alert('Recuerda, para conectar necesitas expresarte ');
  } else {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const userId = firebase.auth().currentUser.uid;
    const username = firebase.auth().currentUser.displayName;
    const userPic = firebase.auth().currentUser.photoURL;
    await firebaseGetDatabase().collection('post').add({
      textDescription: textDescription,
      timestamp: timestamp,
      userId: userId, // ID de usuario
      username: username, // nombre usuario
      userPic: userPic, // foto por defecto usuario
      likes:[], // like
    });
  
  }
};

export const likeButton = () => {
  const like = document.createElement('img');
  like.className = 'likePost';
  like.src = './images/likepost.svg';
  like.id = 'like';

  like.addEventListener('click',  (e) => {
    e.stopPropagation();
    const postId = e.target.parentElement.parentElement.getAttribute('data-id');
    console.log(postId);
    likePost(postId, e.target);
  });
  return like;
};

export const likePost = async (postId, likeBtn) => {
  const postsRef = firebaseGetDatabase().collection('post');
  const getPostData = await postsRef.doc(postId).get();
  const postData = getPostData.data(); // obtenemos el objeto con la data del post
  const currentUserId = firebase.auth().currentUser.uid; // obtenemos el id del usuario conectado

  // si la propiedad "likes" no contiene la id del usuario, empuje la id al array
  if (!postData.likes.includes(currentUserId)) {
    likeBtn.classList.toggle('is_animating');
    postData.likes.push(currentUserId); // push agrega el id al array
    console.log('hiciste like');
  } else {
    // si la propiedad "likes" sí contiene la id del usuario, elimina el id del array
    const idIndex = postData.likes.indexOf(currentUserId); // aquí buscamos el id del usuario en el array
    likeBtn.classList.remove('is_animating');
    console.log('quitaste el like');
    postData.likes.splice(idIndex, 1); // splice elimina el id del array
  }
  const result = await postsRef.doc(postId).update({ // actualizamos la propiedad like del post
    likes: postData.likes
  });
};

const commentButton = () => {
  const comment = document.createElement('img');
  comment.className = ('commentPost');
  comment.src = './images/commentpost.svg';
  return comment;
};

export const realtimeListener = () => {
  firebaseGetDatabase().collection('post')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      const publicPost = document.getElementById('publicPost');
      if (publicPost != null) {
        const changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type === 'added') {
            viewPost(change.doc, publicPost, change.newIndex === 0);
          } else if (change.type === 'modified') {
            const postsList = publicPost.querySelector(`[data-id="${change.doc.id}"]`);
            postsList.querySelector('#postedTextId').textContent = change.doc.data().textDescription;
            const postTimestamp = change.doc.data().timestamp;
            if (postTimestamp != null) {
              const shortTime = `${postTimestamp.toDate().toDateString()} ${postTimestamp.toDate().toLocaleTimeString()}`;
              postsList.querySelector('#timePost').innerHTML = shortTime;
            }
          } else if (change.type === 'removed') {
            const postsList = publicPost.querySelector(`[data-id="${change.doc.id}"]`);
            publicPost.removeChild(postsList);
          }
        });
      }
    });
};
