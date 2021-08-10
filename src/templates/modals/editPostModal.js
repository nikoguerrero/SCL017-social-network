export const editPostModal = () => {
  const editContainer = document.createElement('div');
  editContainer.id = 'editContainer';
  editContainer.className = 'composePostContainer';

  const containerAddPost = document.createElement('section');
  containerAddPost.className = 'containerModalPost';
  editContainer.appendChild(containerAddPost);

  const editModal = document.createElement('p');
  editModal.className = 'containerComposePost';
  editContainer.appendChild(editModal);

  const modalHeaderEdit = document.createElement('div');
  modalHeaderEdit.className = 'modalHeader';
  editModal.appendChild(modalHeaderEdit);

  const backLink = document.createElement('a');
  backLink.id = 'cancelLink';
  backLink.className = 'backLink';
  backLink.innerHTML = 'x';
  modalHeaderEdit.appendChild(backLink);

  const saveTopButton = document.createElement('button');
  saveTopButton.id = 'saveTopButton';
  saveTopButton.className = 'topPostButton';
  saveTopButton.innerHTML = 'Guardar';
  modalHeaderEdit.appendChild(saveTopButton);

  const infoTextContainer = document.createElement('div');
  infoTextContainer.id = 'infoTextContainer';
  infoTextContainer.className = 'infoTextContainer';
  editModal.appendChild(infoTextContainer);

  const editBoxText = document.createElement('textarea');
  editBoxText.id = 'editBoxText';
  editBoxText.className = 'editBoxArea';
  editModal.appendChild(editBoxText);

  const modalFooter = document.createElement('div');
  modalFooter.id = 'modalFooter';
  modalFooter.className = 'modalFooter';
  editModal.appendChild(modalFooter);

  const buttonPostEdit = document.createElement('button');
  buttonPostEdit.id = 'buttonPostEdit';
  buttonPostEdit.className = 'bottomPostButton';
  buttonPostEdit.innerHTML = 'Guardar';
  modalFooter.appendChild(buttonPostEdit);

  return editContainer;
};
