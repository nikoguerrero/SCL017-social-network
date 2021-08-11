import { saveData } from '../../dataFunctions/dataCollections.js';
import { displayPosts } from '../../dataFunctions/displayPosts.js';

const showUploadedImg = (tasks, textDescription) => {
  tasks
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      saveData(textDescription, url);
    })
    .catch(console.error);
};

export const uploadUserImg = (uploadImage, textDescription) => {
  const file = uploadImage.files[0];
  const ref = firebase.storage().ref();
  if (file) {
    const nameFile = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(nameFile).put(file, metadata);
    showUploadedImg(task, textDescription);
  } else {
    console.log('no existe ningun archivo');
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
  const user = firebase.auth().currentUser;
  if (user != null) {
    const photoURL = user.photoURL;
    feedPostImage.src = `${photoURL}`;
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
