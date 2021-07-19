// importamos la funcion que vamos a testear
import { initApp } from '../src/lib/index';

describe('initApp', () => {
  it('debería ser una función', () => {
    expect(typeof initApp).toBe('function');
  });
});
