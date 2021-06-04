const Koa = require('koa');
const json = require('koa-json');
const mongoose = require('mongoose');
const logger = require('koa-morgan');
const router = require('./routes/index');
const createError = require('http-errors');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/admin',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

const app = new Koa();

app
  .use(logger('dev'))
  .use(json())
  .use(router.routes())
  .use(router.allowedMethods());

app.use(ctx => {
  ctx.body = {
    success: true,
    data: ctx.data,
  };
});

app.on('error', (err, ctx) => {
  ctx.body = createError(500, 'Unknown thing happened. Try to restart your application');
  ctx.body.success = false;
  console.error(err);
});

module.exports = app;