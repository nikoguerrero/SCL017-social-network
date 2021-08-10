import { firebaseGetDatabase } from '../lib/firebase.js';
import { viewPost } from '../templates/components/viewPost.js';

export const realtimeListener = () => {
  firebaseGetDatabase().collection('post')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      const publicPost = document.getElementById('publicPost');
      if (publicPost !== null) {
        const changes = snapshot.docChanges();
        changes.forEach((change) => {
          const postsList = publicPost.querySelector(`[data-id="${change.doc.id}"]`);
          if (change.type === 'modified') {
            if (!postsList) {
              viewPost(change.doc, publicPost, change.newIndex === 0);
            } else {
              postsList.querySelector('#postedTextId').textContent = change.doc.data().textDescription;
              const postTimestamp = change.doc.data().timestamp;
              if (postTimestamp != null) {
                const shortTime = `${postTimestamp.toDate().toDateString()} ${postTimestamp.toDate().toLocaleTimeString()}`;
                postsList.querySelector('#timePost').innerHTML = shortTime;
              }
            }
          } else if (change.type === 'removed') {
            publicPost.removeChild(postsList);
          }
        });
      }
    });
};
