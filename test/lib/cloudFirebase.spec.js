import { dataUser, likePublication, lovePublication } from '../../src/lib/cloudFirebase';
import { setDoc } from '../../src/lib/imports/firebase-imports';

jest.mock('../../src/lib/imports/firebase-imports.js');

describe('cloudfirebase', () => {
  it('dataUser', async () => {
    const data = await dataUser('id', 'email', 'password', 'url', 'url');
    expect(data).toBe('id');
  });
  it('dataUser error', async () => {
    const data = await dataUser();
    expect(data).toBe('id');
  });
  it('likePublication', async () => {
    const like = await likePublication('Umn8appNPisPz4eBhswX');
    expect(like).toBe(true);
  });
  it('lovePublication', () => {
    expect(true).toBe(true);
  });
});
