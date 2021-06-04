const Router = require('@koa/router');

const userRouter = Router({
  prefix: '/user',
});

userRouter.get('/', async (ctx, next) => {
  ctx.data = { name: 'George' };
  ctx.status = 200;
  return next(ctx);
});

module.exports = userRouter.routes();