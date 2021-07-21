export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('ul');
  publicPost.id = ("#publicPost");
  // const publicPostView = document.querySelector('#publicPost');
 
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <div class="containerPost">
  <a href="#feed" id="goBack" class="backLink"> Volver al feed</a>
  <textarea id="text-description" class="form-control " placeholder="Descríbelo aquí"></textarea>
  <button id="postButton" class="postButtonLink"> enviar </button>
  </div>`;

  containerAddPost.innerHTML = addPost;

  const db = firebase.firestore(); 

  const postButton = containerAddPost.querySelector('#postButton');
  const textDescription= containerAddPost.querySelector('#text-description');

  postButton.addEventListener('click', async (e) => {
    e.preventDefault()
    if (textDescription.value.length == ''){
      alert("campos vacios");
    }else{
    const response = await db.collection('post').add({
      textDescription : textDescription.value
      
    })};
    console.log(response)
  });   


   const createPost = db.collection('post').get();
   const refreshPost = db.collection('post').onSnapshot();
   //.then((snapshot) =>{
  //   console.log(snapshot.docs);
  //   snapshot.docs.forEach(doc => {

  //     viewPost(doc);
  //   });
  // });
  const viewPost = (doc) =>{
    let li = document.createElement('li');
    let textDescription = document.createElement('span');
    li.setAttribute('data-id', doc.id);
    textDescription.textContent = doc.data().textDescription;

    li.appendChild(textDescription);
    publicPost.appendChild(li);
    containerAddPost.appendChild(publicPost);
  };
  // db.settings({timestampsInSnapshots: true});

  

  //  window.addEventListener('DOMContentLoaded', async (e) =>{
  //   await getPost();
  //   //querySnapshot.forEach(doc => {
  //    //console.log(doc.data())
  //  // });
  //  });
   
  
  return containerAddPost;
};
