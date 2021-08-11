const firestore = () => {
    return {
      collection: (nameCollection) => {
        return {
          add: (objData) => {
            return new Promise((resolve) => {
              resolve("add post");
            });
          },
        };
      },
    };
  };
  firestore.FieldValue = {
    serverTimestamp: () => {
      return 'hola'
    }
  }

  let firebase = {
    firestore: firestore
    // auth: () => {
    //   return 'hola'
    // }
  };

 

  export default jest.fn(() => {
      return firebase
  })
  