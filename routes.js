const user = require('./api/users/users.routes');
const healthcheck = require('./api/healthcheck/index');
const authLocal = require('./auth/local/local.routes');
const favList = require('./api/favLists/favLists.routes');

function routes(app) {
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/users', user);
  app.use('/api/favList', favList);
  app.use('/auth/local', authLocal);
}

module.exports = routes;
