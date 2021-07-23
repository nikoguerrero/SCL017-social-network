export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('ul');
  publicPost.id = ('#publicPost');
  publicPost.className = ('containerPublicPost');
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <div class="containerPost" id="containerPost">
  <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
  <img src="./images/ejemploperfilfoto.png" class="feedPicProfile"> 
  <textarea id="text-description" class="createPostText" placeholder="Descríbelo aquí"></textarea>
  <button id="postButton" class="postButtonLink">compartir</button>
  </div>`;

  containerAddPost.innerHTML = addPost;
  const db = firebase.firestore();
  let editPostId = null; // declara que el id post a editar es nulo, para que no se reescriba ningún post

  const viewPost = (doc) => {
    const postsList = document.createElement('li');
    const postedText = document.createElement('span');
    const interactionElements = document.createElement('div');
    const deletePost = document.createElement('img');
    const edit = document.createElement('img');
    const like = document.createElement('img');
    const comment = document.createElement('img');
    
    postedText.id = ('postedTextId');
    postsList.setAttribute('data-id', doc.id);
    postedText.textContent = doc.data().textDescription;
    edit.textContent = 'editar';

    postsList.className = ('li');
    postedText.className = ('postedText');
    interactionElements.className = 'interactionWrapper';
    deletePost.className = ('delete');
    edit.className = ('edit');
    like.className = ('likePost');
    comment.className = ('commentPost');

    deletePost.src = './images/deletepost.svg';
    edit.src = './images/editpost.svg';
    like.src = './images/likepost.svg';
    comment.src = './images/commentpost.svg';

    containerAddPost.appendChild(publicPost);
    publicPost.appendChild(postsList);
    postsList.appendChild(postedText);
    postsList.appendChild(interactionElements);
    interactionElements.appendChild(deletePost);
    interactionElements.appendChild(edit);
    interactionElements.appendChild(like);
    interactionElements.appendChild(comment);

    // borrar posts
    deletePost.addEventListener('click', (e) => {
      e.stopPropagation();
      const textId = e.target.parentElement.parentElement.getAttribute('data-id');
      db.collection('post').doc(textId).delete();
    });
    
    // editar posts
    edit.addEventListener('click', async (e) => {
      e.stopPropagation();
      editPostId = e.target.parentElement.parentElement.getAttribute('data-id'); // guardamos el id del post
      const postData = await db.collection('post').doc(editPostId).get(); // pasamos la data del post a la variable postData
      textDescription.value = postData.data().textDescription;
    });
  };

  const containerPost = containerAddPost.querySelector('#containerPost');
  const textDescription = containerPost.querySelector('#text-description');
  const postButton = containerAddPost.querySelector('#postButton');

     //creando tiempo
     let day = new Date();
     let time = day.getTime();
     let counterDay = time;
  postButton.addEventListener('click', async (e) => {
    e.preventDefault();
      counterDay-=1 // le sumamos 1 para que cambie en cada creacion
      console.log(counterDay);
    if (textDescription.value.length == '') {
      alert('Recuerda, para conectar necesitas experesarte ');
    } else {
      if( editPostId === null) { // si no hay post a editar, agrega un nuevo post
        await db.collection('post').add({
          textDescription: textDescription.value,
          id: counterDay // asignamos nuestro id 
        });
      } else { // cuando se edita, se modifica el post selecionado
        await db.collection('post').doc(editPostId).set({
          textDescription: textDescription.value
        });
      editPostId = null;
    }
  }
  textDescription.value = '';
  });

  // real-time listener
  db.collection('post').orderBy('id','desc').limit(10).onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      // console.log(change.doc.data());
      if (change.type === 'added') {
        viewPost(change.doc);
      } else if (change.type === 'modified'){
        let postsList = publicPost.querySelector('[data-id="' + change.doc.id + '"]');
        postsList.querySelector('#postedTextId').textContent = change.doc.data().textDescription; // reescribir de forma inmediata el texte area. 
      } else if (change.type === 'removed') {
        let postsList = publicPost.querySelector('[data-id="' + change.doc.id + '"]');
        publicPost.removeChild(postsList);
      }

    });
  });
 

  return containerAddPost;
};
