const { typeBll } = require('../bll/index');
const Router = require('koa-router');
const router = new Router({
    prefix: '/api/type'
});

router.get('/', async (ctx, next) => {    

    ctx.body = await typeBll.findAll();
});



module.exports = router.routes();