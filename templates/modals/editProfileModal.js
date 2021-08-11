import { updateAuthProfile, updateUserData } from '../../dataFunctions/updateData.js';

const showUploadedImg = (tasks, userData) => {
  tasks
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((imageURL) => {
      updateUserData(imageURL, userData);
      updateAuthProfile(imageURL, userData.name);
    })
    .catch(console.error);
};

const uploadUserImg = (uploadImage, userData) => {
  const file = uploadImage.files[0];
  const ref = firebase.storage().ref();
  if (file) {
    const nameFile = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(nameFile).put(file, metadata);
    showUploadedImg(task, userData);
  }
};

export const editProfileModal = () => {
  const editProfileContainer = document.createElement('div');
  editProfileContainer.id = 'editProfileContainer';
  editProfileContainer.className = 'composeProfileContainer';

  const profileEditModal = document.createElement('p');
  profileEditModal.id = 'profileEditModal';
  profileEditModal.className = 'containerComposeProfile';
  editProfileContainer.appendChild(profileEditModal);

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modalHeader';
  profileEditModal.appendChild(modalHeader);

  const cancelPostLink = document.createElement('a');
  cancelPostLink.id = 'cancelPostLink';
  cancelPostLink.className = 'backLink';
  cancelPostLink.innerHTML = 'x';
  modalHeader.appendChild(cancelPostLink);

  const topPostButton = document.createElement('button');
  topPostButton.id = 'postButton';
  topPostButton.className = 'topPostButton';
  topPostButton.innerHTML = 'Actualizar';
  modalHeader.appendChild(topPostButton);

  const infoTextContainer = document.createElement('div');
  infoTextContainer.id = 'infoTextContainer';
  infoTextContainer.className = 'infoProfileContainer';
  profileEditModal.appendChild(infoTextContainer);

  const userPicProfile = document.createElement('img');
  userPicProfile.id = 'userPicProfile';
  userPicProfile.className = 'feedPicProfileModal';
  userPicProfile.src = './images/ejemploperfilfoto.png';
  infoTextContainer.appendChild(userPicProfile);

  const uploadPic = document.createElement('div');
  uploadPic.id = 'uploadPicId';
  uploadPic.className = 'uploadPic';

  const uploadPicSvg = `
    <a id="cameraIcon" class="uploadImgBtn">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5352 16C21.8665 16 21.242 16.3342 20.8711 16.8906L19.4648 19H17C15.8954 19 15 19.8954 15 21V30C15 31.1046 15.8954 32 17 32H31C32.1046 32 33 31.1046 33 30V21C33 19.8954 32.1046 19 31 19H28.5352L27.1289 16.8906C26.758 16.3342 26.1335 16 25.4648 16H22.5352ZM22.5352 18H25.4648L26.8711 20.1094C27.242 20.6658 27.8665 21 28.5352 21H31V30H17V21H19.4648C20.1335 21 20.758 20.6658 21.1289 20.1094L22.5352 18ZM26 25C26 26.1046 25.1046 27 24 27C22.8954 27 22 26.1046 22 25C22 23.8954 22.8954 23 24 23C25.1046 23 26 23.8954 26 25ZM28 25C28 27.2091 26.2091 29 24 29C21.7909 29 20 27.2091 20 25C20 22.7909 21.7909 21 24 21C26.2091 21 28 22.7909 28 25Z" fill="#222222"/>
      </svg>
    </a>
    <input style=display:none type="file" id="uploadImage"/>
  `;
  uploadPic.innerHTML = uploadPicSvg;
  infoTextContainer.appendChild(uploadPic);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'nameInput';
  nameInput.className = 'profilePostModal';
  nameInput.placeholder = 'Nombre';
  infoTextContainer.appendChild(nameInput);

  const bioInput = document.createElement('textarea');
  bioInput.id = 'bioInput';
  bioInput.className = 'profilePostModalTextarea';
  bioInput.placeholder = 'Biografia';
  infoTextContainer.appendChild(bioInput);

  const interestsInput = document.createElement('textarea');
  interestsInput.id = 'interestsInput';
  interestsInput.className = 'profilePostModalTextarea';
  interestsInput.placeholder = 'Intereses';
  infoTextContainer.appendChild(interestsInput);

  const modalFooter = document.createElement('div');
  modalFooter.id = 'modalFooter';
  modalFooter.className = 'modalFooter';
  profileEditModal.appendChild(modalFooter);

  const bottomPostButton = document.createElement('button');
  bottomPostButton.id = 'bottomButton';
  bottomPostButton.className = 'bottomPostButton';
  bottomPostButton.innerHTML = 'Actualizar';
  modalFooter.appendChild(bottomPostButton);

  cancelPostLink.addEventListener('click', () => {
    document.getElementById('root').removeChild(editProfileContainer);
  });

  const cameraIconBtn = uploadPic.querySelector('#cameraIcon');
  const uploadImage = uploadPic.querySelector('#uploadImage');
  uploadImage.addEventListener('change', () => {
    const file = uploadImage.files[0];
    userPicProfile.src = URL.createObjectURL(file);
  });

  cameraIconBtn.addEventListener('click', () => {
    uploadImage.click();
  });

  const updateProfile = () => {
    const userData = {
      name: nameInput.value,
      bio: bioInput.value,
      interests: interestsInput.value
    };
    if (uploadImage.files.length === 0) {
      updateUserData(null, userData);
      updateAuthProfile(null, userData.name);
    } else {
      uploadUserImg(uploadImage, userData);
    }
  };

  topPostButton.addEventListener('click', () => {
    updateProfile();
    topPostButton.disabled = true;
  });

  bottomPostButton.addEventListener('click', () => {
    updateProfile();
    bottomPostButton.disabled = true;
  });
  return editProfileContainer;
};
