export const editPostModal = () => {
  const editContainer = document.createElement('div');
  editContainer.id = 'editContainer';
  editContainer.className = 'editContainer';
  document.getElementById('root').appendChild(editContainer);

  const editModal = document.createElement('p');
  editModal.className = 'editModal';
  editContainer.appendChild(editModal);
  
  const backLink = document.createElement('a');
  backLink.className = 'backLink';
  backLink.href = '#feed';
  backLink.innerHTML = 'Volver al feed';
  editModal.appendChild(backLink);

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
