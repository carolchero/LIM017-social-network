import {
  dataUser, likePublication, lovePublication,
  getUser, getUsers, onGetUser, updateDataUsers, dataPublication,
  onGetPublication, onGetPublicationUser,
  deletePublication, getOnlyPublication, updatePublication, getPublication,
  publicationLikeUnion, publicationLikeRemove, publicationLoveRemove,
  publicationLoveUnion,
} from '../../src/lib/cloudFirebase';
import { deleteDoc } from '../../src/lib/imports/firebase-imports.js';

jest.mock('../../src/lib/imports/firebase-imports.js');

describe('cloudfirebase', () => {
  it('dataUser', async () => {
    const data = await dataUser('id', 'email', 'password', 'url', 'url');
    expect(data).toBe('id');
  });
  it('dataUser error', async () => {
    const error = new Error('error');
    await expect(dataUser(null)).resolves.toEqual(error);
  });
  it('likePublication', async () => {
    expect(typeof publicationLikeUnion()).toBe('object');
    expect(typeof publicationLikeRemove()).toBe('object');
  });
  it('lovePublication', async () => {
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
  it('Feed onGetPublication', async () => {
    onGetPublication(jest.fn());
    expect(typeof onGetPublication()).toBe('object');
    expect(typeof onGetPublicationUser()).toBe('object');
  });
  it('get', () => {
    expect(typeof getOnlyPublication('xxxxxyyyyzzzz')).toBe('object');
    expect(typeof updatePublication('xxxxxyyyyzzzz')).toBe('object');
  });
});

describe('deletePublication', () => {
  it('debería retornar una funcion', () => {
    expect(deletePublication('xxxxxyyyyzzzz')).toEqual(deleteDoc());
  });
  it('Debería enviar un correo de verificacion', () => {
    expect(deleteDoc).toHaveBeenCalled();
    // eslint-disable-next-line quote-props
    expect(deleteDoc.mock.calls[0][0]).toEqual({ dataPublication: 'xxxxxyyyyzzzz' });
  });
});

describe('likePublication', () => {
  const id = 'Umn8appNPisPz4eBhswX';
  const uid = 'Umn8appNPisPz4eBhswX';
  it('funcionalidad', async () => {
    const like = await getOnlyPublication(id);
    expect(likePublication(id)).toStrictEqual(publicationLikeUnion(id, uid));
    expect(like.data().like).toStrictEqual([{ dataPublication: 'Umn8appNPisPz4eBhswX' }]);
    expect(await likePublication(id)).toBe(true);
  });
});
describe('likePublication no like', () => {
  const id = 0;
  const uid = 'Umn8appNPisPz4eBhswX';
  it('funcionalidad', async () => {
    const like = await getOnlyPublication(id);
    expect(likePublication(id)).toStrictEqual(publicationLikeUnion(id, uid));
    expect(like.data().like).toBeUndefined();
    expect(await likePublication(id)).toBe(false);
  });
});
describe('lovePublication', () => {
  it('love', async () => {
    const id = 'Umn8appNPisPz4eBhswX';
    const uid = 'Umn8appNPisPz4eBhswX';
    const love = await getOnlyPublication(id);
    expect(lovePublication(id)).toStrictEqual(publicationLikeUnion(id, uid));
    expect(love.data().love).toStrictEqual([{ dataPublication: 'Umn8appNPisPz4eBhswX' }]);
    expect(await lovePublication(id)).toBe(true);
  });
});
/* describe('likePublication no love', () => {
  it('love', async () => {
    const id = 0;
    const uid = 'Umn8appNPisPz4eBhswX';
    const love = await getOnlyPublication(id);
    expect(lovePublication(id)).toStrictEqual(publicationLikeUnion(id, uid));
    expect(love.data().love).toBeUndefined();
    expect(await lovePublication(id)).toBe(false);
  });
}); */
