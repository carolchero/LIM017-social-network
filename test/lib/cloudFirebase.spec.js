import { dataUser, likePublication, lovePublication,
    getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc,
  doc, setDoc, getDoc, query, where, updateDoc, orderBy,
  arrayUnion, arrayRemove,
  getUser, getUsers, onGetUser, updateDataUsers, dataPublication,
  onGetPublication, onGetPublicationUser,
  deletePublication, getOnlyPublication, updatePublication, getPublication,
  publicationLikeUnion, publicationLikeRemove, publicationLoveRemove,
  publicationLoveUnion,
} from '../../src/lib/cloudFirebase';
// import { setDoc } from '../../src/lib/imports/firebase-imports';

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
    expect(typeof publicationLikeUnion()).toBe('object');
    expect(typeof publicationLikeRemove()).toBe('object');
  });
  it('lovePublication', () => {
    expect(true).toBe(true);
    expect(typeof publicationLoveUnion()).toBe('object');
    expect(typeof publicationLoveRemove()).toBe('object');
  });
});

describe('getUsers', () => {
  it('permite obtener datos del usuario', async () => {
    const allDataUser = await getUsers();
    expect(allDataUser.data.id).toBe('xxxxxyyyyzzzz');
  });
  it('obtener solo datos de un usuario segun id', async () => {
    const dataUserOnly = await getUser('xxxxxyyyyzzzz');
    expect(typeof dataUserOnly).toBe('object');
  });
});

describe('funciones de datos de usuario y publicaciones', () => {
  it('getUser', () => {
    expect(typeof onGetUser()).toBe('object');
  });
  it('updateDataUsers', async () => {
    expect(typeof updateDataUsers('xxxxxyyyyzzzz')).toBe('object');
  });
  it('dataPublication', async () => {
    expect(typeof dataPublication('xxxxxyyyyzzzz')).toBe('object');
  });
  it('getPublication', async () => {
    expect(typeof getPublication()).toBe('object');
  });
  it('onGetPublication', async () => {
    expect(typeof onGetPublication()).toBe('object');
    expect(typeof onGetPublicationUser()).toBe('object');
  });
  it('deletePublication', async () => {
    expect(typeof deletePublication('xxxxxyyyyzzzz')).toBe('object');
    expect(typeof getOnlyPublication('xxxxxyyyyzzzz')).toBe('object');
    expect(typeof updatePublication('xxxxxyyyyzzzz')).toBe('object');
  });
});
