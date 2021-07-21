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

  db.collection('post').get().then((snapshot) =>{
    console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
      viewPost(doc);
    });
  });

  //  window.addEventListener('DOMContentLoaded', async (e) =>{
  //   await getPost();
  //   //querySnapshot.forEach(doc => {
  //    //console.log(doc.data())
  //  // });
  //  });
  
  const containerPost = containerAddPost.querySelector('#containerPost');
  const textDescription = containerPost.querySelector('#text-description');
  const postButton = containerAddPost.querySelector('#postButton');
  postButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await db.collection('post').add({
      textDescription: textDescription.value
    });
    textDescription.value = '';
    console.log(response);

  // const textDescription = document.querySelector('#text-description').value;
  // const response = await db.collection('post').doc().set({
  //   textDescription
  // });   
  // console.log(response)                                                                                         
  // console.log(textDescription)
  });
  return containerAddPost;
};
