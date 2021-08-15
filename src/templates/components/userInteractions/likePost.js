import { firebaseGetDatabase } from '../../../lib/firebase.js';

export const likePost = async (postId, likeBtn) => {
  const postsRef = firebaseGetDatabase().collection('post');
  const getPostData = await postsRef.doc(postId).get();
  const postData = getPostData.data();
  const currentUserId = firebase.auth().currentUser.uid;
  const buttonLike = likeBtn;

  if (!postData.likes.includes(currentUserId)) {
    // se añade animación de like
    buttonLike.classList.add('is_liked');
    buttonLike.classList.remove('is_not_liked');
    postData.likes.push(currentUserId);

    buttonLike.innerHTML = `<span class="likeCounter">${postData.likes.length}</span>`;
  } else {
    const idIndex = postData.likes.indexOf(currentUserId);

    buttonLike.classList.remove('is_liked');
    buttonLike.classList.add('is_not_liked');
    postData.likes.splice(idIndex, 1);

    if (postData.likes.length === 0) {
      buttonLike.innerHTML = '';
    } else {
      buttonLike.innerHTML = `<span class="likeCounter">${postData.likes.length}</span>`;
    }
  }
  await postsRef.doc(postId).update({
    likes: postData.likes
  });
};

export const likeButton = (likeCount) => {
  const like = document.createElement('div');
  like.className = 'likePost';
  like.src = './images/likepost.svg';
  like.id = 'like';

  if (likeCount > 0) {
    like.innerHTML = `<span class="likeCounter">${likeCount}</span>`;
  }

  like.addEventListener('click', (e) => {
    e.stopPropagation();
    const postId = e.target.parentElement.parentElement.getAttribute('data-id');
    likePost(postId, e.target);
  });
  return like;
};
