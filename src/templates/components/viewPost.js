import { firebaseGetDatabase } from '../../lib/firebase.js';
import { deleteButton } from './userInteractions/deletePost.js';
import { editButton } from './userInteractions/editPost.js';
import { likeButton } from './userInteractions/likePost.js';
import { commentButton } from './userInteractions/commentPost.js';

export const viewPost = async (doc, publicPost, isFirstElement) => {
  const postsList = document.createElement('li');
  const indPostWrapper = document.createElement('div');
  const usernameDisplay = document.createElement('div');
  const onlyTextWrapper = document.createElement('div');
  const timePost = document.createElement('div');
  const userPicture = document.createElement('img');
  const postedText = document.createElement('span');
  const interactionElements = document.createElement('div');
  const currentUserId = firebase.auth().currentUser.uid;
  const userDataObject = doc.data();
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

  usernameDisplay.innerHTML = userInfoData.userName;
  userPicture.src = userInfoData.userPic;

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

  if (userDataObject.imageURL !== null) {
    const postImage = document.createElement('img');
    postImage.id = 'image-post';
    postImage.className = 'image-preview';
    postImage.src = userDataObject.imageURL;
    onlyTextWrapper.appendChild(postImage);
  }
  postsList.appendChild(interactionElements);

  if (userDataObject.userId === currentUserId) {
    interactionElements.appendChild(deleteButton());
    interactionElements.appendChild(editButton());
  }

  const likeBtn = likeButton(userDataObject.likes.length);

  if (userDataObject.likes.includes(currentUserId)) {

    likeBtn.classList.add('is_already_liked');
  }
  interactionElements.appendChild(likeBtn);
  interactionElements.appendChild(commentButton());
};
