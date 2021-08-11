import { firebaseGetDatabase } from '../../../lib/firebase.js';
import { editPostModal } from '../../modals/editPostModal.js';

export const saveEditedPost = async (editPostId) => {
  await firebaseGetDatabase().collection('post').doc(editPostId).update({
    textDescription: document.getElementById('editBoxText').value
  });
};

export const cancelEditedPost = () => { // cancela el post editado
  const cancelEdit = document.getElementById('cancelLink');
  cancelEdit.addEventListener('click', async (e) => {
    e.preventDefault();
    const editContainer = document.getElementById('editContainer');
    document.getElementById('root').removeChild(editContainer);
  });
};

export const addEditEvent = (editPostId) => {
  const saveTopButton = document.getElementById('saveTopButton');
  const buttonPostEdit = document.getElementById('buttonPostEdit');
  const editContainer = document.getElementById('editContainer');

  saveTopButton.addEventListener('click', async (e) => {
    e.preventDefault();
    saveEditedPost(editPostId);
    document.getElementById('root').removeChild(editContainer);
  });

  buttonPostEdit.addEventListener('click', async (e) => {
    e.preventDefault();
    saveEditedPost(editPostId);
    document.getElementById('root').removeChild(editContainer);
  });
};

export const editButton = () => {
  const edit = document.createElement('img');
  edit.id = 'editId';
  edit.className = 'edit';
  edit.src = './images/editpost.svg';

  edit.addEventListener('click', async (e) => {
    e.stopPropagation();
    const editPostId = e.target.parentElement.parentElement.getAttribute('data-id'); // guardamos el id del post
    const postData = await firebaseGetDatabase().collection('post').doc(editPostId).get();
    document.getElementById('root').appendChild(editPostModal());
    const editPostBox = document.getElementById('editBoxText');
    editPostBox.value = postData.data().textDescription;
    addEditEvent(editPostId);
    cancelEditedPost();
  });
  return edit;
};
