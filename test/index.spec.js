// importamos la funcion que vamos a testear
// import { initApp } from '../src/lib/index';
import mockFirebase from '../_mocks_/firebase-mock.js';
import { saveData } from '../src/templates/components/post.js';

global.firebase = mockFirebase();
// describe('initApp', () => {
//   it('debería ser una función', () => {
//     expect(typeof initApp).toBe('function');
//   });
// });

describe('saveData', () => {
  it('collection post', async () => {
    const data = await saveData('ratata');
    expect(data).toBe('ratata');
  });
});
