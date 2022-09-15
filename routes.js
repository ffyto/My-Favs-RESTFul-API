const user = require('./api/users/users.routes');
const healthcheck = require('./api/healthcheck/healthcheck.routes');
const authLocal = require('./auth/local/local.routes');
const favList = require('./api/favLists/favLists.routes');
const fav = require('./api/favs/favs.routes');

function routes(app) {
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/users', user);
  app.use('/api/favLists', favList);
  app.use('/auth/local', authLocal);
  app.use('/api/favs', fav);
}

module.exports = routes;
