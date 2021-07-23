export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('ul');
  publicPost.id = ('#publicPost');
  publicPost.className = ('containerPublicPost')
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <div class="containerPost" id="containerPost">
  <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
  <textarea id="text-description" class="form-control " placeholder="Descríbelo aquí"></textarea>
  <button id="postButton" class="postButtonLink"> enviar </button>
  </div>`;

  containerAddPost.innerHTML = addPost;

  const db = firebase.firestore(); 
  let editPostId = null // declara que el id post a editar es seteado  a nulo, para que no reescriba ningun post 

  const viewPost = (doc) => {
    let li = document.createElement('li');
    li.className = ('li');
    let postedText = document.createElement('span');
    postedText.className = ('postedText');
    postedText.id = ('postedTextId');
    let cross = document.createElement('div');
    cross.className = ('delete');
    let edit = document.createElement('button');
    edit.className = ('edit')

    li.setAttribute('data-id', doc.id);
    postedText.textContent = doc.data().textDescription;
    cross.textContent = 'X';
    edit.textContent = 'editar';


    li.appendChild(postedText);
    li.appendChild(cross);
    li.appendChild(edit);
    publicPost.appendChild(li);
    containerAddPost.appendChild(publicPost);

    // borrar posts
    cross.addEventListener('click', (e) => {
      e.stopPropagation();
      let textId = e.target.parentElement.getAttribute('data-id');
      db.collection('post').doc(textId).delete();
    });
    
    edit.addEventListener('click',async (e) => {
      e.stopPropagation();
      editPostId = e.target.parentElement.getAttribute('data-id'); // guardamos el id del post
      const postData =  await  db.collection('post').doc(editPostId).get(); // pasamos la data del post a la variable postData
      textDescription.value = postData.data().textDescription;
    });

  };

  const containerPost = containerAddPost.querySelector('#containerPost');
  const textDescription = containerPost.querySelector('#text-description');
  const postButton = containerAddPost.querySelector('#postButton');
  postButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (textDescription.value.length == '') {
      alert('Recuerda, para conectar necesitas experesarte ');
    } else {
      if( editPostId === null){ // si no hay post a editar, agrega un nuevo post
        await db.collection('post').add({
          textDescription: textDescription.value
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
  db.collection('post').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      // console.log(change.doc.data());
      if (change.type === 'added') {
        viewPost(change.doc);
      } else if (change.type === 'modified'){
        let li = publicPost.querySelector('[data-id=' + change.doc.id + ']');
        li.querySelector('#postedTextId').textContent = change.doc.data().textDescription; // reescribir de forma inmediata el texte area. 
      } else if (change.type === 'removed') {
        let li = publicPost.querySelector('[data-id=' + change.doc.id + ']');
        publicPost.removeChild(li);
      }

    });
  });
 

  return containerAddPost;
};