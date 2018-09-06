const { usersBll } = require('../bll/index');
const Router = require('koa-router');
const router = new Router({
    prefix: '/api/users'
});

router.get('/', async (ctx, next) => {    

    ctx.body = await usersBll.findAll();
});



module.exports = router.routes();