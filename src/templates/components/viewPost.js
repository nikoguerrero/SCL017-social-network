import { firebaseGetDatabase } from '../../lib/firebase.js';
import { deleteButton } from './userInteractions/deletePost.js';
import { editButton } from './userInteractions/editPost.js';
import { likeButton } from './userInteractions/likePost.js';
import { commentButton } from './userInteractions/commentPost.js';

export const viewPost = async (doc, publicPost, isFirstElement) => {
  const postsList = document.createElement('li');
  const indPostWrapper = document.createElement('div');
  const usernameDisplay = document.createElement('div'); // div para nombre usuario
  const onlyTextWrapper = document.createElement('div');
  const timePost = document.createElement('div');
  const userPicture = document.createElement('img'); // div para imagen de usuario (por defecto por ahora)
  const postedText = document.createElement('span');
  const interactionElements = document.createElement('div');
  const currentUserId = firebase.auth().currentUser.uid; // Id del usuario conectado
  const userDataObject = doc.data(); // guardamos las prop. del objeto post
  const userInfo = await firebaseGetDatabase().collection('userInfo').doc(userDataObject.userId).get();
  const userInfoData = userInfo.data();

  usernameDisplay.id = 'usernameDisplay';
  timePost.id = 'timePost';
  userPicture.id = 'userPicture';
  postedText.id = 'postedTextId';

  postsList.className = 'li';
  indPostWrapper.className = 'indPostWrapper';
  timePost.className = 'timeStamp';
  onlyTextWrapper.className = 'onlyTextWrapper';
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
  usernameDisplay.innerHTML = userInfoData.userName;
  userPicture.src = userInfoData.userPic; // se agrega la foto por defecto en el post publicado

  if (isFirstElement) {
    publicPost.prepend(postsList);
  } else {
    publicPost.appendChild(postsList);
  }

  postsList.appendChild(indPostWrapper);
  indPostWrapper.appendChild(userPicture);
  indPostWrapper.appendChild(onlyTextWrapper);
  onlyTextWrapper.appendChild(usernameDisplay);
  onlyTextWrapper.appendChild(timePost);
  onlyTextWrapper.appendChild(postedText);

  // si el post contiene una imagen, crea el elemento imagen y lo muestra en pantalla
  if (userDataObject.imageURL !== null) {
    const postImage = document.createElement('img');
    postImage.id = 'image-post';
    postImage.className = 'image-preview';
    postImage.src = userDataObject.imageURL;
    onlyTextWrapper.appendChild(postImage);
  }
  postsList.appendChild(interactionElements);

  /* si la id del usuario del post es la misma que la id del usuario conectado,
  se agrega el botón de eliminar y editar */
  if (userDataObject.userId === currentUserId) {
    interactionElements.appendChild(deleteButton());
    interactionElements.appendChild(editButton());
  }

  // se agrega parámetro del largo del array para saber si posee o no likes
  const likeBtn = likeButton(userDataObject.likes.length);

  // si el usuario le hizo like con anticipación, al dibujarse el botón de like...
  if (userDataObject.likes.includes(currentUserId)) {
    // se añade la clase is_red para mantener el rojo del corazón
    likeBtn.classList.add('is_already_liked');
  }
  interactionElements.appendChild(likeBtn);
  interactionElements.appendChild(commentButton());
};
