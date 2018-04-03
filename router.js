const Handler = require('./controllers/handler');

module.exports = function (app) {
  app.get('/handler', Handler.handler);
};