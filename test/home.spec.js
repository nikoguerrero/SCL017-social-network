import { homeTemplate } from '../src/templates/home.js';

describe('homeTemplate', () => {
  it('debería ser una función', () => {
    expect(typeof homeTemplate).toBe('function');
  });
});
