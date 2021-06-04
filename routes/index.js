const Router = require('@koa/router');
const user = require('./user');

const indexRouter = new Router({
  prefix: '/api',
}).use(user);

module.exports = indexRouter;