export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('ul');
  publicPost.id = ("#publicPost");
  // const publicPostView = document.querySelector('#publicPost');
 
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <div class="containerPost" id="containerPost">
  <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
  <textarea id="text-description" class="form-control " placeholder="Descríbelo aquí"></textarea>
  <button id="postButton" class="postButtonLink"> enviar </button>
  </div>`;

  containerAddPost.innerHTML = addPost;

  const db = firebase.firestore();

  const viewPost = (doc) =>{
    let li = document.createElement('li');
    let textDescription = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    textDescription.textContent = doc.data().textDescription;
    cross.textContent = 'x';

    li.appendChild(textDescription);
    li.appendChild(cross);

    publicPost.appendChild(li);
    containerAddPost.appendChild(publicPost);

    // borrar posts
    cross.addEventListener('click', (e) => {
      e.stopPropagation();
      let textId = e.target.parentElement.getAttribute('data-id');
      db.collection('post').doc(textId).delete();
    })
  };
  
  const containerPost = containerAddPost.querySelector('#containerPost');
  const textDescription = containerPost.querySelector('#text-description');
  const postButton = containerAddPost.querySelector('#postButton');
  postButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if( textDescription.value.length == '') {
      alert('Recuerda, para conectar necesitas experesarte ')
    }else{
    const response = await db.collection('post').add({
      textDescription: textDescription.value
    });
  }
    textDescription.value = '';
    // console.log(response);
  });
  //real-time listener
  db.collection('post').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      console.log(change.doc.data());
      if(change.type == 'added'){
        viewPost(change.doc);
      } else if(change.type == 'removed'){
        let li = publicPost.querySelector('[data-id=' + change.doc.id + ']');
        publicPost.removeChild(li);
      }
    })
  })

  return containerAddPost;
};