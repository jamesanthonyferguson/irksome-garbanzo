/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/auburns', require('./api/auburn'));
  app.use('/api/ekms', require('./api/ekm'));
  app.use('/api/parsers', require('./api/parser'));
  app.use('/api/meters', require('./api/meter'));
  // app.use('/api/news', require('./api/news'));
  // app.use('/api/users', require('./api/user'));
  // app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
