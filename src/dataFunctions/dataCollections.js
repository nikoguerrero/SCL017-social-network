import { firebaseGetDatabase } from '../lib/firebase.js';
// parámetro textDescription es textDescription.value (es un string)
export const saveData = async (textDescription, imageURL) => {
  if (textDescription.length == '') { // esto se puede testear
    alert('Recuerda, para conectar necesitas expresarte ');
  } else {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const userId = firebase.auth().currentUser.uid;
    await firebaseGetDatabase().collection('post').add({
      textDescription,
      timestamp,
      userId, // ID de usuario
      likes: [], // like
      imageURL
    });
  }
};

export const getUserData = async () => {
  const user = firebase.auth().currentUser;
  const docRef = await firebaseGetDatabase().collection('userInfo').doc(user.uid);
  return docRef.get();
};
