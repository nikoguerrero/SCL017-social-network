
 export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <a href="#feed" id="goBack" class="backLink"></a>
  <input type="text" placeholder="¿Como te sientes hoy?" id="postInput" class="postBox">
  <textarea id="text-description" class="form-control" placeholder="Describelo aqui"></textarea>
  <div id= "postView"> </div>
  <button id="postButton" class="postButtonLink"> enviar </button>`;

  containerAddPost.innerHTML = addPost;
   const db = firebase.firestore()
   
   const getPost = db.collection('post').get().then((snapshot) =>{
console.log(snapshot.docs);
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

  const postInput = document.querySelector('#postInput').value;
  const textDescription = document.querySelector('#text-description').value;

  const response = await db.collection('post').doc().set({
    postInput,
    textDescription
  });   
  console.log(response)                                                                                         
  
  console.log(postInput,textDescription)

 }) ;
  return containerAddPost;
};
