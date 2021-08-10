import { firebaseGetDatabase } from '../lib/firebase.js';
import { viewPost } from '../templates/components/viewPost.js';

export const displayPosts = async (publicPost, userId) => {
  if (publicPost !== null) {
    let collection = null;
    if (!userId) {
      collection = await firebaseGetDatabase().collection('post').orderBy('timestamp', 'desc').get();
    } else {
      const collectionFilter = await firebaseGetDatabase().collection('post').where('userId', '==', userId);
      const orderCollection = await collectionFilter.orderBy('timestamp', 'desc');
      collection = await orderCollection.get();
    }
    collection.docs.forEach((doc) => {
      viewPost(doc, publicPost, false);
    });
  }
};
