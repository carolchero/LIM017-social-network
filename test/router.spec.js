import { onNavigate } from "../src/Router";

describe('Router', () => {
  it('onNavigate carga la ruta correcta ', () => {
    const routes = new Router([
      {
        path: '/ruta-1',
        template: '<div>ruta 1</div>',
      },
    ]);
  });
});
