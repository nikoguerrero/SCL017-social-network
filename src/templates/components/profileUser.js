import { firebaseGetDatabase } from '/lib/firebase.js';

export const profileTemplate = (container) => {
  const containerFeed = container.querySelector('#containerFeedId');
  const containerAddPost = containerFeed.querySelector('#containerAddPostId');
  containerFeed.removeChild(containerAddPost);
  containerFeed.appendChild(profile());
};

const profile = () => {
  const containerProfile = document.createElement('section');
  containerProfile.id = 'containerProfileId';
  containerProfile.className = 'containerProfile';
  const profile = `
  <div class="userProfileWrapper">
    <div id="upperContainerId" class="upperContainer">
      <div id="profilePicContainer" class="profilePicWrapper">
        <img src="./images/ejemploperfilfoto.png" id="userPic" class="userPhoto"> 
      </div>
      <div id="usernameProfile" class="profileUsername"></div>
      <div class="profileCounter">
        <div class="userFriendsCounter"><strong>10</strong><br><span style="font-size:0.9rem">amigos</div>
        <div class="userPostCounter"><strong>2</strong><br><span style="font-size:0.9rem">posts</div>
      </div>
    </div>
    <div id="profileBoxId" class="profileBoxId">
      <div id="middleContainerId" class="middleContainer">
        <a id="editProfileBtn" class="editProfileButton">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1" fill="black">
              <path d="M26.8853 16.0853C26.9178 16.0528 26.952 16.0228 26.9903 15.9974C27.3586 15.7525 29.485 14.5145 31.799 16.8284C34.113 19.1424 32.8749 21.2688 32.6301 21.6371C32.6046 21.6754 32.5746 21.7096 32.5421 21.7421L22.8217 31.4625C22.6993 31.585 22.5471 31.6736 22.3801 31.7195L16.5253 33.3317C15.7772 33.5377 15.0897 32.8503 15.2957 32.1021L16.9079 26.2473C16.9539 26.0803 17.0424 25.9281 17.1649 25.8057L26.8853 16.0853Z"/>
            </mask>
            <path d="M25.2279 19.299L29.4706 23.5416L30.8848 22.1274L26.6422 17.8848L25.2279 19.299ZM16.5253 33.3317L15.9943 31.4035L16.5253 33.3317ZM15.2957 32.1021L17.2239 32.6331L15.2957 32.1021ZM16.9079 26.2473L18.8361 26.7783L16.9079 26.2473ZM22.3801 31.7195L21.8492 29.7913L22.3801 31.7195ZM32.6301 21.6371L34.2956 22.7443L32.6301 21.6371ZM31.1279 20.3279L21.4075 30.0483L24.236 32.8767L33.9564 23.1563L31.1279 20.3279ZM18.5791 27.2199L28.2995 17.4995L25.4711 14.6711L15.7507 24.3915L18.5791 27.2199ZM21.8492 29.7913L15.9943 31.4035L17.0562 35.26L22.9111 33.6478L21.8492 29.7913ZM17.2239 32.6331L18.8361 26.7783L14.9796 25.7163L13.3674 31.5712L17.2239 32.6331ZM28.0975 17.6629C28.1292 17.6418 28.4074 17.4719 28.7822 17.4499C29.0609 17.4335 29.6188 17.4767 30.3848 18.2426L33.2132 15.4142C31.6652 13.8662 30.0029 13.3714 28.5479 13.4568C27.1889 13.5365 26.2197 14.108 25.8831 14.3318L28.0975 17.6629ZM30.3848 18.2426C31.1508 19.0086 31.1939 19.5665 31.1775 19.8452C31.1555 20.22 30.9856 20.4982 30.9645 20.5299L34.2956 22.7443C34.5194 22.4077 35.0909 21.4386 35.1706 20.0796C35.256 18.6245 34.7612 16.9622 33.2132 15.4142L30.3848 18.2426ZM15.9943 31.4035C16.7424 31.1975 17.4299 31.885 17.2239 32.6331L13.3674 31.5712C12.7494 33.8155 14.8119 35.878 17.0562 35.26L15.9943 31.4035ZM15.7507 24.3915C15.3833 24.7589 15.1176 25.2154 14.9796 25.7163L18.8361 26.7783C18.7901 26.9452 18.7016 27.0974 18.5791 27.2199L15.7507 24.3915ZM21.4075 30.0483C21.53 29.9258 21.6822 29.8373 21.8492 29.7913L22.9111 33.6478C23.412 33.5098 23.8686 33.2441 24.236 32.8767L21.4075 30.0483ZM33.9564 23.1563C34.0484 23.0643 34.1741 22.9271 34.2956 22.7443L30.9645 20.5299C31.0351 20.4237 31.1009 20.355 31.1279 20.3279L33.9564 23.1563ZM28.2995 17.4995C28.2725 17.5265 28.2037 17.5923 28.0975 17.6629L25.8831 14.3318C25.7003 14.4533 25.5631 14.579 25.4711 14.6711L28.2995 17.4995Z" fill="#808080" mask="url(#path-1-inside-1)"/>
          </svg>
        </a>
      </div>
      <div id="bottomContainerId" class="bottomContainer">
        <div id="userBio" class="userAbout"></div>
        <p id="userBioText" class="userBiotextBox">
          Soy Bear, tengo 23 años. Vivo en Puerto Montt
        </p>
        <div id="userInterestsId" class="userInterests"></div>
          <ul id="usesInterests" class="userInterestsBox">
              <li>Me gusta andar en bicicleta</li>
              <li>Me gusta leer</li>
              <li>Me gusta bailar</li>
          </ul>
      </div>
    </div>
  </div>`;
  containerProfile.innerHTML = profile;

  const usernameDisplay = containerProfile.querySelector('#usernameProfile');
  const userPhotoDisplay = containerProfile.querySelector('#userPic');
  const editProfileBtn = containerProfile.querySelector('#editProfileBtn');

  usernameDisplay.id = 'usernameDisplay';

  const bioText =  containerProfile.querySelector('#userBioText');

  editProfileBtn.addEventListener('click', () => {
    getUserData();
    document.getElementById('root').appendChild(editProfileModal());
  })

  const user = firebase.auth().currentUser;
  if (user != null) {
    const displayName = user.displayName;
    const photoURL = user.photoURL;
    usernameDisplay.innerHTML = `${displayName}`;
    userPhotoDisplay.src= `${photoURL}`;

    let usernameText = usernameDisplay.innerHTML; // para pasar el valor de lo escrito al modal
  }
  return containerProfile;
};

export const editProfileModal = () => {
  const composePostContainer = document.createElement('div');
  composePostContainer.id = 'composePostContainer';
  composePostContainer.className = 'composeProfileContainer';

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

  const userPicProfile = document.createElement('img');
  userPicProfile.id = 'userPicProfile';
  userPicProfile.className = 'feedPicProfile';
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
  nameInput.type ='text';
  nameInput.id = 'nameInput';
  nameInput.className = 'textPostModal';
  nameInput.placeholder = 'Descríbelo aquí';
  infoTextContainer.appendChild(nameInput);

  const bioInput = document.createElement('input');
  bioInput.type ='text';
  bioInput.id = 'bioInput';
  bioInput.className = 'textPostModal';
  bioInput.placeholder = 'Descríbelo aquí';
  infoTextContainer.appendChild(bioInput);

  const interestsInput = document.createElement('input');
  interestsInput.type ='text';
  interestsInput.id = 'interestsInput';
  interestsInput.className = 'textPostModal';
  interestsInput.placeholder = 'Descríbelo aquí';
  infoTextContainer.appendChild(interestsInput);

  const modalFooter = document.createElement('div');
  modalFooter.id = 'modalFooter';
  modalFooter.className = 'modalFooter';
  composePostModal.appendChild(modalFooter);

  const bottomPostButton = document.createElement('button');
  bottomPostButton.id = 'bottomButton';
  bottomPostButton.className = 'bottomPostButton';
  bottomPostButton.innerHTML = 'Compartir';
  modalFooter.appendChild(bottomPostButton);

  cancelPostLink.addEventListener('click', () => {
    document.getElementById('root').removeChild(composePostContainer);
  });

  const cameraIconBtn = uploadPic.querySelector('#cameraIcon');
  const uploadImage = uploadPic.querySelector('#uploadImage');
  cameraIconBtn.addEventListener('click', () => {
    uploadImage.click();
  });

  bottomPostButton.addEventListener('click', async () => {
    uploadUserImg(uploadImage, nameInput);
    document.getElementById('root').removeChild(composePostContainer);
    window.location.reaload; // no funcionando aun, falta hacer esperar a lo que sucede en uploaduserimg
  });
  
  return composePostContainer;
};

const getUserData = (bioText) => {
  const user = firebase.auth().currentUser;
  const docRef = firebaseGetDatabase().collection('userInfo').doc(user.uid);
  docRef.get().then((doc) => {
    if (doc.exists) {
      firebaseGetDatabase().collection('userInfo').doc(user.uid).update({
      userBio: 
      });
      console.log('doc existe');
    }
    console.log(doc);
  }); 
};


const uploadUserImg = (uploadImage, nameInput) => {
  const file = uploadImage.files[0];
  const ref = firebase.storage().ref();
  if (file) {
    const nameFile = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type,
    };
    const task =  ref.child(nameFile).put(file, metadata);
    showUploadedImg(task, nameInput);
  } else {
    console.log('no existe ningun archivo');
  }
}; 

const showUploadedImg = (tasks, nameInput) => {
  tasks
  .then((snapshot) => {
    return snapshot.ref.getDownloadURL();
  })
  .then((url) => {
    const profilePhoto = url;
    const username = nameInput.value;
    console.log(username);
    const user = firebase.auth().currentUser;
    user.updateProfile({
      photoURL: profilePhoto,
      displayName: username
    }).then(() => {
      console.log('updatelogrado');
    }).catch((error) => {
    });
  })
  .catch(console.error);
};

