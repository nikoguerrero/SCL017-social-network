import { homeTemplate} from '../src/templates/home.js'

describe('homeTemplate', () => {
  it('debería ser una función', () => {
    expect(typeof homeTemplate).toBe('function');
  });
});

describe('homeTemplate', () => {
    it('deberia ser un elemento HTML', () => {
      const viewLogin = homeTemplate();
      expect(viewLogin instanceof HTMLElement).toBe(true);
    });
  });