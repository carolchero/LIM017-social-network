import { headerTemplate } from '../../src/components/Header.js';
import { Profile } from '../../src/components/Profile.js';
import { Feed } from '../../src/components/Feed.js';

jest.mock('../../src/lib/imports/firebase-imports.js');

test('use jsdom in this test file', () => {
  const root = document.getElementById('root');
  expect(root).not.toBeNull();
});

describe('headerTemplate', () => {
  it('función que contiene texto HTML', () => {
    expect(typeof headerTemplate().textContent).toBe('string');
  });
});
describe('Profile', () => {
  it('función que contiene texto HTML', () => {
    expect(typeof Profile().textContent).toBe('string');
  });
});
describe('Feed', () => {
  it('función que contiene texto HTML', () => {
    expect(typeof Feed().textContent).toBe('string');
  });
});

/* describe('createNewPassword', () => {
  it('createNewPassword es una función', () => {
    expect(createNewPassword('holi@gmail.com')).toEqual(sendPasswordResetEmail());
  });
  it('la función al ser llamada permite el acceso', () => {

  });
  it('muestra el error si el email no es definido', () => {

  });
}); */

