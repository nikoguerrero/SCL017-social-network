import { firebaseGetDatabase } from '../lib/firebase.js';
import { getUserData } from './dataCollections.js';

export const updateUserData = (userPic, userData) => {
  getUserData().then((doc) => {
    const user = firebase.auth().currentUser;
    if (doc.exists) {
      const userDataUpdate = {
        userName: userData.name,
        userBio: userData.bio,
        userInterests: userData.interests
      };
      if (userPic !== null) {
        userDataUpdate.userPic = userPic;
      }
      firebaseGetDatabase().collection('userInfo').doc(user.uid).update(userDataUpdate)
        .then(() => {
          if (userPic !== null) {
            document.getElementById('userPhotoDisplay').src = userPic;
          }
          document.getElementById('usernameDisplay').innerHTML = userData.name;
          document.getElementById('bioText').innerHTML = userData.bio;
          document.getElementById('interestsText').innerHTML = userData.interests;

          const editProfileModal = document.getElementById('editProfileContainer');
          document.getElementById('root').removeChild(editProfileModal);
        });
    }
  });
};

export const updateAuthProfile = (imageURL, username) => {
  const user = firebase.auth().currentUser;
  const userDataUpdate = {
    displayName: username
  };
  if (imageURL !== null) {
    userDataUpdate.photoURL = imageURL;
  }
  user.updateProfile(userDataUpdate).then(() => {
  }).catch((error) => {
    console.error(error);
  });
};
