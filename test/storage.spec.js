const { dowloadImagePhoto } = require('../src/lib/storage.js');

jest.mock('../src/lib/imports/firebase-imports.js');
// jest.mock('../src/lib/storage.js');

describe('dowloadImagePhoto', () => {
  it('The function dowloadImagePhoto return a photo when exists.', () => dowloadImagePhoto('exist')
    .then((data) => {
      expect(data ).toEqual('urlPhoto');
    }));

  it('The function dowloadImagePhoto throws a exception when not exists.', () => dowloadImagePhoto('asdasdasdasd.jpg')
    .then((data) => {
      expect(data).toEqual('');
        }));
  });
