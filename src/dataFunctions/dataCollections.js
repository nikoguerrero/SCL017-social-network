import { firebaseGetDatabase } from "../lib/firebase.js";
// parámetro textDescription es textDescription.value (es un string)
export const saveData = async (textDescription, imageURL) => {
    if (textDescription.length == '') {  
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