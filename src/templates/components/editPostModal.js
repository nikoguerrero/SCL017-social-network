export const editPostModal = () => {
  const editContainer = document.createElement('div');
  editContainer.id = 'editContainer';
  editContainer.className = 'editContainer';
  // document.getElementById('root').appendChild(editContainer);

  const containerAddPost = document.createElement('section');
  containerAddPost.className = 'containerAddPost'; // elemento de post.js, solo funciona en mobile
  editContainer.appendChild(containerAddPost);

  const editModal = document.createElement('p');
  editModal.className = 'editModal';
  editContainer.appendChild(editModal);

  const modalHeaderEdit = document.createElement('div');
  modalHeaderEdit.className = 'modalHeader';
  editModal.appendChild(modalHeaderEdit);
  
  const backLink = document.createElement('a');
  backLink.id = 'cancelLink';
  backLink.className = 'backLink';
  backLink.innerHTML = 'Cancelar';
  modalHeaderEdit.appendChild(backLink);

  const editBoxText = document.createElement('textarea');
  editBoxText.id = 'editBoxText';
  editBoxText.className = 'createPostText';
  editModal.appendChild(editBoxText);

  const buttonPostEdit = document.createElement('button');
  buttonPostEdit.id = 'buttonPostEdit';
  buttonPostEdit.className = 'postButtonLink';
  buttonPostEdit.innerHTML = 'Guardar';
  editModal.appendChild(buttonPostEdit);

  return editContainer;
};
