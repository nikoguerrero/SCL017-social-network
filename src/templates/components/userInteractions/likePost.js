import { firebaseGetDatabase } from '/lib/firebase.js';

export const likeButton = (likeCount) => {
  const like = document.createElement('div');
  like.className = 'likePost';
  like.src = './images/likepost.svg';
  like.id = 'like';

  // si la cuenta de likes es mayor a 0, se imprime en pantalla
  if (likeCount > 0) {
    like.innerHTML = '<span class="likeCounter">' + likeCount + '</span>';
  }

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
    // se añade animación de like
    likeBtn.classList.add('is_liked');
    likeBtn.classList.remove('is_not_liked');
    postData.likes.push(currentUserId); // push agrega el id al array

    // se agrega número de like si se hace like
    likeBtn.innerHTML = '<span class="likeCounter">' + postData.likes.length  + '</span>';
    console.log('hiciste like');
  } else {
    // si la propiedad "likes" sí contiene la id del usuario, elimina el id del array
    const idIndex = postData.likes.indexOf(currentUserId); // aquí buscamos el id del usuario en el array

    // se quita animación de like (no funcionando bien)
    likeBtn.classList.remove('is_liked');
    likeBtn.classList.add('is_not_liked');
    console.log('quitaste el like');
    postData.likes.splice(idIndex, 1); // splice elimina el id del array

    // se disminuye número de like si se hace dislike
    if (postData.likes.length === 0) {
      likeBtn.innerHTML = '';
    } else {
      likeBtn.innerHTML = '<span class="likeCounter">' + postData.likes.length  + '</span>';
    }
  }
  const result = await postsRef.doc(postId).update({ // actualizamos la propiedad like del post
    likes: postData.likes
  });
};