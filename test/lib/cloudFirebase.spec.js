import { dataUser, likePublication, lovePublication } from '../../src/lib/cloudFirebase';

jest.mock('../../src/lib/imports/firebase-imports.js');

describe('cloudfirebase', () => {
  it('dataUser', async () => {
    const data = await dataUser('id', 'email', 'password', 'url', 'url');
    expect(data).toBe('id');
  });
  it('likePublication', async () => {
    sessionStorage.setItem('uid', 'Umn8appNPisPz4eBhswX');
    const like = await likePublication('Umn8appNPisPz4eBhswX');
    expect(like).toBe(true);
  });
  it('lovePublication', async () => {
    sessionStorage.setItem('uid', 'Umn8appNPisPz4eBhswX');
    const love = await lovePublication('Umn8appNPisPz4eBhswX');
    expect(love).toBe(true);
  });
});
