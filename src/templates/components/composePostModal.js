import { saveData } from './post.js';

export const createPostModal = () => {
    const composePostContainer = document.createElement('div');
    composePostContainer.id = 'composePostContainer';
    composePostContainer.className = 'composePostContainer';

    const containerAddPost = document.createElement('section'); 
    containerAddPost.className = 'containerAddPost'; // elemento de post.js, solo funciona en mobile
    composePostContainer.appendChild(containerAddPost);

    const composePostModal = document.createElement('p');
    composePostModal.id = 'containerPost';
    composePostModal.className = 'containerComposePost';
    composePostContainer.appendChild(composePostModal);

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modalHeader';
    composePostModal.appendChild(modalHeader);

    const cancelPostLink = document.createElement('a');
    cancelPostLink.id = 'cancelPostLink';
    cancelPostLink.className = 'backLink';
    cancelPostLink.innerHTML = 'Cancelar';
    modalHeader.appendChild(cancelPostLink);

    const userPicModal = document.createElement('img');
    userPicModal.className = 'feedPicProfile';
    userPicModal.src = './images/ejemploperfilfoto.png';
    composePostModal.appendChild(userPicModal)

    const postBox = document.createElement('textarea');
    postBox.id = 'postBox';
    postBox.className = 'createPostText';
    postBox.placeholder= 'Descríbelo aquí';
    composePostModal.appendChild(postBox);

    const buttonPostModal = document.createElement('button');
    buttonPostModal.id = 'postButton';
    buttonPostModal.className = 'postButtonLink';
    buttonPostModal.innerHTML = 'compartir';
    composePostModal.appendChild(buttonPostModal);
    
    buttonPostModal.addEventListener('click', () => {
      saveData(postBox.value);
      document.getElementById('root').removeChild(composePostContainer);
    });

    cancelPostLink.addEventListener('click', () => {
      document.getElementById('root').removeChild(composePostContainer);
    });
    return composePostContainer;
  };