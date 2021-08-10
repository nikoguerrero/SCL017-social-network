import { navbarMenu } from '../src/templates/components/navbar.js';

describe('navbarMenu', () => {
  it('debería ser una función', () => {
    expect(typeof navbarMenu).toBe('function');
  });
});
