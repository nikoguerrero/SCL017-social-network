export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('div')
  publicPost.id = ("#publicPost")
  const publicPostView = document.querySelector('#publicPost')
 
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <div class="containerPost">
  <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
  <textarea id="text-description" class="form-control " placeholder="Descríbelo aquí"></textarea>
  <button id="postButton" class="postButtonLink"> enviar </button>
  </div>`;

  containerAddPost.innerHTML = addPost;
  containerAddPost.appendChild(publicPost)
  const viewPost = (doc) =>{
    let li = document.createElement('li');
    let text = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    text.textContent = doc.data().tetextDescription;
     li.appendChild(text)
  publicPost.appendChild(containerAddPost)

  };
   const db = firebase.firestore()


   const getPost = db.collection('post').get().then((snapshot) =>{
     snapshot.docs.forEach(doc => {
            console.log(doc.data())
     });
   });
  //  window.addEventListener('DOMContentLoaded', async (e) =>{
  //   await getPost();
  //   //querySnapshot.forEach(doc => {
  //    //console.log(doc.data())
  //  // });
  //  });
   
  const postButton = containerAddPost.querySelector('#postButton');
  postButton.addEventListener('click', async (e) => {
  e.preventDefault()
  const textDescription = document.querySelector('#text-description').value;
  const response = await db.collection('post').doc().set({
    textDescription
  });   
  console.log(response)                                                                                         
  console.log(textDescription)
  });
  return containerAddPost;
};
