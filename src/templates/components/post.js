import { firebaseGetDatabase } from '../../lib/firebase.js';
import { deleteButton } from './deletePost.js';
import { editButton } from './editPost.js';
import { likeButton } from './likePost.js';


export const displayPosts = async (publicPost, userId) => {
  if (publicPost !== null) {
    let collection = null;
    if (!userId) {
      collection = await firebaseGetDatabase().collection('post').orderBy('timestamp', 'desc').get();
    } else {
      const collectionFilter = await firebaseGetDatabase().collection('post').where('userId', '==', userId);
      // const orderCollection = await collectionFilter.orderBy('timestamp', 'desc');
      collection = await collectionFilter.get();
    }
    collection.docs.forEach((doc) => {
      viewPost(doc, publicPost, false);
    });
  }
};

export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('ul');
  
  containerAddPost.id = 'containerAddPostId';
  publicPost.id = 'publicPost';

  containerAddPost.className = 'containerAddPost';
  publicPost.className = 'containerPublicPost';

  const addPost = `
  <div class="containerPost" id="containerPost">
  <div class="feedPostInfo" id="feedPostInfo">
    <img src="./images/ejemploperfilfoto.png" class="feedPicProfile" id = "feedPostImage"> 
    <textarea id="text-description" class="createPostText" maxlength ="260" rows="2" colums="20" placeholder ="Descríbelo aquí"></textarea>
  </div>
  <div class="footerPost" id="footerPost">
    <a id="cameraIcon" class="uploadImgBtn">
      <span class="tooltiptext">imagen</span>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5352 16C21.8665 16 21.242 16.3342 20.8711 16.8906L19.4648 19H17C15.8954 19 15 19.8954 15 21V30C15 31.1046 15.8954 32 17 32H31C32.1046 32 33 31.1046 33 30V21C33 19.8954 32.1046 19 31 19H28.5352L27.1289 16.8906C26.758 16.3342 26.1335 16 25.4648 16H22.5352ZM22.5352 18H25.4648L26.8711 20.1094C27.242 20.6658 27.8665 21 28.5352 21H31V30H17V21H19.4648C20.1335 21 20.758 20.6658 21.1289 20.1094L22.5352 18ZM26 25C26 26.1046 25.1046 27 24 27C22.8954 27 22 26.1046 22 25C22 23.8954 22.8954 23 24 23C25.1046 23 26 23.8954 26 25ZM28 25C28 27.2091 26.2091 29 24 29C21.7909 29 20 27.2091 20 25C20 22.7909 21.7909 21 24 21C26.2091 21 28 22.7909 28 25Z" fill="#222222"/>
      </svg>
    </a>
    <input style="display:none" type="file" id="uploadImage"/>
    <button id="postButton" class="postButtonLink">Compartir</button>
  </div>
  </div>`;

  containerAddPost.innerHTML = addPost;
  
  const containerPost = containerAddPost.querySelector('#containerPost');
  const textDescription = containerPost.querySelector('#text-description');
  const cameraIconBtn = containerAddPost.querySelector('#cameraIcon');
  const postButton = containerAddPost.querySelector('#postButton');
  const uploadImage = containerAddPost.querySelector('#uploadImage');
  const feedPostImage = containerAddPost.querySelector('#feedPostImage');
  //  Foto User 
  const user = firebase.auth().currentUser;
  if (user != null) {
    const photoURL = user.photoURL;
    feedPostImage.src= `${photoURL}`;
  }

  cameraIconBtn.addEventListener('click', () => {
    uploadImage.click();
  });

  postButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (uploadImage.files.length === 0) {
      saveData(textDescription.value, null); // null es cuando no hay imagen y solo se guarda texto
    } else {
      uploadUserImg(uploadImage, textDescription.value);
    }
    textDescription.value = '';
  });
  containerAddPost.appendChild(publicPost);
  displayPosts(publicPost);
  return containerAddPost;
};

export const uploadUserImg = (uploadImage, textDescription) => {
  const file = uploadImage.files[0];
  const ref = firebase.storage().ref();
  if (file) {
    const nameFile = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type,
    };
    const task =  ref.child(nameFile).put(file, metadata);
    showUploadedImg(task, textDescription);
  } else {
    console.log('no existe ningun archivo');
  }
}; 

const showUploadedImg = (tasks, textDescription) => {
  tasks
  .then((snapshot) => {
    console.log(snapshot.ref.getDownloadURL());
    return snapshot.ref.getDownloadURL();
  })
  .then((url) => {
    saveData(textDescription, url);
  })
  .catch(console.error);
};

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

// parámetro textDescription es textDescription.value (es un string)
export const saveData = async (textDescription, imageURL) => {
  if (textDescription.length == '') {
    alert('Recuerda, para conectar necesitas expresarte ');
  } else {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const userId = firebase.auth().currentUser.uid;
    await firebaseGetDatabase().collection('post').add({
      textDescription: textDescription,
      timestamp: timestamp,
      userId: userId, // ID de usuario
      likes:[], // like
      imageURL: imageURL
    });
  
  }
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
      if (publicPost !== null) {
        const changes = snapshot.docChanges();
        changes.forEach((change) => {
          const postsList = publicPost.querySelector(`[data-id="${change.doc.id}"]`);
          if (change.type === 'modified') {
            if (!postsList) {
              viewPost(change.doc, publicPost, change.newIndex === 0);
            } else {
              postsList.querySelector('#postedTextId').textContent = change.doc.data().textDescription;
              const postTimestamp = change.doc.data().timestamp;
              if (postTimestamp != null) {
                const shortTime = `${postTimestamp.toDate().toDateString()} ${postTimestamp.toDate().toLocaleTimeString()}`;
                postsList.querySelector('#timePost').innerHTML = shortTime;
              }
            }
          } else if (change.type === 'removed') {
            publicPost.removeChild(postsList);
          }
        });
      }
    });
};
