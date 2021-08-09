const firestore = () => {
    return {
      colection: (nameCollection) => {
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
  
  const firebase = {
    firestore: firestore
  };
  
  export default jest.fn(() => {
      return firebase
  })
  