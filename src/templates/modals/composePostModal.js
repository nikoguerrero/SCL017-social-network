import { uploadUserImg } from '../components/createPost.js';
import { saveData } from '../../dataFunctions/dataCollections.js';

export const createPostModal = () => {
  const composePostContainer = document.createElement('div');
  composePostContainer.id = 'composePostContainer';
  composePostContainer.className = 'composePostContainer';

  const containerAddPost = document.createElement('section');
  containerAddPost.className = 'containerModalPost'; // elemento de post.js, solo funciona en mobile
  composePostContainer.appendChild(containerAddPost);

  const composePostModal = document.createElement('p');
  composePostModal.id = 'containerPost';
  composePostModal.className = 'containerComposePost';
  composePostContainer.appendChild(composePostModal);

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modalHeader';
  composePostModal.appendChild(modalHeader);

  const cancelPostLink = document.createElement('a');
  cancelPostLink.id = 'cancelPostLink';
  cancelPostLink.className = 'backLink';
  cancelPostLink.innerHTML = 'x';
  modalHeader.appendChild(cancelPostLink);

  const topPostButton = document.createElement('button');
  topPostButton.id = 'postButton';
  topPostButton.className = 'topPostButton';
  topPostButton.innerHTML = 'Compartir';
  modalHeader.appendChild(topPostButton);

  const infoTextContainer = document.createElement('div');
  infoTextContainer.id = 'infoTextContainer';
  infoTextContainer.className = 'infoTextContainer';
  composePostModal.appendChild(infoTextContainer);

  const userPicModal = document.createElement('img');
  const user = firebase.auth().currentUser;
  const photoURL = user.photoURL;
  userPicModal.className = 'feedPicProfile';
  userPicModal.src = `${photoURL}`;
  userPicModal.id = '#feedPostImageModal';
  infoTextContainer.appendChild(userPicModal);

  const postBox = document.createElement('textarea');
  postBox.id = 'postBox';
  postBox.className = 'textPostModal';
  postBox.placeholder = 'Descríbelo aquí';
  infoTextContainer.appendChild(postBox);

  const modalFooter = document.createElement('div');
  modalFooter.id = 'modalFooter';
  modalFooter.className = 'modalFooter';
  composePostModal.appendChild(modalFooter);

  const uploadImg = document.createElement('div');
  uploadImg.className = 'uploadImgBtn';

  const uploadImgSv = `
    <a id="cameraIcon" class="uploadImgBtn">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5352 16C21.8665 16 21.242 16.3342 20.8711 16.8906L19.4648 19H17C15.8954 19 15 19.8954 15 21V30C15 31.1046 15.8954 32 17 32H31C32.1046 32 33 31.1046 33 30V21C33 19.8954 32.1046 19 31 19H28.5352L27.1289 16.8906C26.758 16.3342 26.1335 16 25.4648 16H22.5352ZM22.5352 18H25.4648L26.8711 20.1094C27.242 20.6658 27.8665 21 28.5352 21H31V30H17V21H19.4648C20.1335 21 20.758 20.6658 21.1289 20.1094L22.5352 18ZM26 25C26 26.1046 25.1046 27 24 27C22.8954 27 22 26.1046 22 25C22 23.8954 22.8954 23 24 23C25.1046 23 26 23.8954 26 25ZM28 25C28 27.2091 26.2091 29 24 29C21.7909 29 20 27.2091 20 25C20 22.7909 21.7909 21 24 21C26.2091 21 28 22.7909 28 25Z" fill="#222222"/>
      </svg>
    </a>
    <input style=display:none type="file" id="uploadImage"/>
  `;
  uploadImg.innerHTML = uploadImgSv;
  modalFooter.appendChild(uploadImg);

  const bottomPostButton = document.createElement('button');
  bottomPostButton.id = 'bottomButton';
  bottomPostButton.className = 'bottomPostButton';
  bottomPostButton.innerHTML = 'Compartir';
  modalFooter.appendChild(bottomPostButton);

  const cameraIconBtn = uploadImg.querySelector('#cameraIcon');
  const uploadImage = uploadImg.querySelector('#uploadImage');
  cameraIconBtn.addEventListener('click', () => {
    uploadImage.click();
  });

  const sharePost = () => { // función de postear desde el modal
    if (uploadImage.files.length === 0) {
      saveData(postBox.value, null);
    } else {
      uploadUserImg(uploadImage, postBox.value);
    }
    document.getElementById('root').removeChild(composePostContainer);
  };

  // botón superior de "compartir" desde escritorio y celular, llaman a la función de postear
  topPostButton.addEventListener('click', (e) => {
    e.preventDefault();
    sharePost();
  });

  // botón inferior de "compartir" desde modal, llaman a la función de postear
  bottomPostButton.addEventListener('click', (e) => {
    e.preventDefault();
    sharePost();
  });

  cancelPostLink.addEventListener('click', () => {
    document.getElementById('root').removeChild(composePostContainer);
  });
  return composePostContainer;
};
