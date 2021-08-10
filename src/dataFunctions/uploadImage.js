const showUploadedImg = (tasks, textDescription, onSecondPromise) => {
  tasks
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      onSecondPromise(textDescription, url);
    })
    .catch(console.error);
};

export const uploadUserImg = (uploadImage, textDescription, onSecondPromise) => {
  const file = uploadImage.files[0];
  const ref = firebase.storage().ref();
  if (file) {
    const nameFile = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(nameFile).put(file, metadata);
    showUploadedImg(task, textDescription, onSecondPromise);
  } else {
    console.log('no existe ningun archivo');
  }
};
