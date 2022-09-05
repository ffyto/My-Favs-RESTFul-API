const user = require('./api/users/users.routes');

function routes(app) {
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/users', user);

  // auth routes
  // app.use('/auth/local', authLocal);
}

module.exports = routes;
