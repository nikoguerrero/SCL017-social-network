export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('ul');
  publicPost.id = ('#publicPost');
  publicPost.className = ('containerPublicPost')
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <div class="containerPost" id="containerPost">
  <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
  <img src="./images/ejemploperfilfoto">
  <textarea id="text-description" class="createPostText" placeholder="Descríbelo aquí"></textarea>
  <button id="postButton" class="postButtonLink"> enviar </button>
  </div>`;

  containerAddPost.innerHTML = addPost;

  const db = firebase.firestore(); 
  let editPostId = null; // se declara variable del id del post a editar inicialmente seteada a nulo para que no que se reescriba ningún post
 

  const viewPost = (doc) => {
    let li = document.createElement('li');
    li.className = ('li');
    let postedText = document.createElement('span');
    postedText.id = 'postTextId'; // id para poder identificarlo cuando se quiera reescribir
    postedText.className = ('textDescription')
    let cross = document.createElement('div');
    cross.className = ('delete')
    let edit = document.createElement('button');

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

    edit.addEventListener('click', async (e) => {
      e.stopPropagation();
      editPostId = e.target.parentElement.getAttribute('data-id'); // guarda la id del post
      const postData = await db.collection('post').doc(editPostId).get(); // pasamos la data del post en particular a una variable
      
      textDescription.value = postData.data().textDescription; // leemos la data de postdata y la escribimos en la caja de textarea (textdescription)
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
      if (editPostId === null) { // si no hay post a editar, entonces agrega un nuevo post (en el fondo cuando se quiere crear un nuevo post)
        const response = await db.collection('post').add({
          textDescription: textDescription.value
        });
      } else { // en caso contrario, es decir, cuando sí hay post a editar, se modifica el post seleccionado para ser editado
        await db.collection('post').doc(editPostId).set({  //puede ser update
            textDescription: textDescription.value
        });
        editPostId = null; // reseteamos editPostId a nulo porque este ya se modificó
      }
  }
    textDescription.value = '';
    // console.log(response);
  });

  // real-time listener
  db.collection('post').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      console.log(change.type);
      if (change.type == 'added') {
        viewPost(change.doc);
      } else if (change.type == 'modified') { // si el tipo de cambio es modificado, entonces sobreescribe el texto que contiene
        let li = publicPost.querySelector('[data-id=' + change.doc.id + ']'); // leemos el id del post que vamos a modificar
        li.querySelector('#postTextId').textContent = change.doc.data().textDescription; //reescribimos de forma inmediata la caja de texto únicamente
      } else if (change.type == 'removed') {
        let li = publicPost.querySelector('[data-id=' + change.doc.id + ']');
        publicPost.removeChild(li);
      }
    });
  });
  return containerAddPost;
};