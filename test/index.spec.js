import { initApp } from '../src/lib/index';
import mockFirebase from '../__mocks__/firebase-mock.js';
import { saveData } from '../src/dataFunctions/dataCollections.js';

global.firebase = mockFirebase();
describe('initApp', () => {
  it('debería ser una función', () => {
    expect(typeof initApp).toBe('function');
  });
});

describe('saveData', () => {
  it('collection post', async () => {
    const data = await saveData('ratata');
    expect(data).toBe('ratata');
  });
});
