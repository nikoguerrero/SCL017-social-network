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
    cancelPostLink.innerHTML = 'x';
    modalHeader.appendChild(cancelPostLink);

    const topPostButton = document.createElement('button');
    topPostButton.id = 'postButton';
    topPostButton.className = 'topPostButton';
    topPostButton.innerHTML = 'Compartir';
    modalHeader.appendChild(topPostButton);

    const infoTextContainer = document.createElement('div');
    infoTextContainer.id = 'infoTextContainer';
    infoTextContainer.className = 'infoTextContainer';
    composePostModal.appendChild(infoTextContainer);

    const userPicModal = document.createElement('img');
    userPicModal.className = 'feedPicProfile';
    userPicModal.src = './images/ejemploperfilfoto.png';
    infoTextContainer.appendChild(userPicModal)

    const postBox = document.createElement('textarea');
    postBox.id = 'postBox';
    postBox.className = 'textPostModal';
    postBox.placeholder= 'Descríbelo aquí';
    infoTextContainer.appendChild(postBox);

    const modalFooter = document.createElement('div');
    modalFooter.id = 'modalFooter';
    modalFooter.className = 'modalFooter';
    composePostModal.appendChild(modalFooter);

    const bottomPostButton = document.createElement('button');
    bottomPostButton.id = 'bottomButton';
    bottomPostButton.className = 'bottomPostButton';
    bottomPostButton.innerHTML = 'Compartir';
    modalFooter.appendChild(bottomPostButton);

    const sharePost = () => { // función de postear desde el modal
      saveData(postBox.value);
      document.getElementById('root').removeChild(composePostContainer);
    }

    // botón superior de "compartir" desde escritorio y celular, llaman a la función de postear
    topPostButton.addEventListener('click', () => {
      sharePost(); 
    });

    // botón inferior de "compartir" desde modal, llaman a la función de postear
    bottomPostButton.addEventListener('click', () => {
      sharePost();
    });

    cancelPostLink.addEventListener('click', () => {
      document.getElementById('root').removeChild(composePostContainer);
    });
    return composePostContainer;
  };