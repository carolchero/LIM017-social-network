/*import { getUsers } from '../../src/lib/cloudFirebase.js';
import { collection } from '../../src/lib/firebase-utils.js';

jest.mock('../../src/lib/firebase-utils.js');

describe('this is for getUsers', () => {
  it('deberia ser una función', async () => {
    const dbTest = {};
    const result = await getUsers(dbTest);
    console.log(collection.mock);
    console.log(collection);
    console.log(collection.mock.calls[0]);
    console.log(result);
    expect(collection.mock.calls[0]).toEqual(dbTest, 'dataUsers');
    // collection de firebase se llamo una vez con dbTest
    // getDocs se llamó con el valor de retorno de collection
    // retorna una promesa que resuelva a un array
  });
});*/

import { getUsers } from '../../src/lib/cloudFirebase.js';

jest.mock('../../src/lib/imports/firebase-cloudFirebase.js');
