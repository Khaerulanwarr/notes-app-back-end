/* eslint-disable linebreak-style */
/**
 * import modul modul yang dibutuhkan
 * framework Hapi untuk web server
 * routes yang menanagani routing
 */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

/**
 * konfigurasi server menggunakan framework Hapi pada fungsi init
 * port 5000
 * host localhost
 */
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// jalankan fungsi web server
init();
