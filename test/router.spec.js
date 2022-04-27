import { onNavigate } from '../src/Router';

jest.mock('../src/lib/imports/firebase-imports.js');

console.log(onNavigate);

const routes = [
  {
    path: '/ruta-1',
    template: '<div>ruta 1</div>',
  },
  {
    path: '/ruta-2',
    template: '<div>ruta 2</div>',
  },
];
describe('Router', () => {
  it('onNavigate carga la ruta correcta ', () => {
    expect(onNavigate(routes.path[0])).toBe('/ruta-1');
  });
  it('onNavigate carga la vista correcta ', () => {
    document.body.innerHTML = routes.template[1];
    expect(onNavigate(routes.path[0])).toBe(document.body.innerHTML = routes[0].template);
  });
});
