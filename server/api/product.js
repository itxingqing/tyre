const { productBll } = require('../bll/index');
const Router = require('koa-router');
const router = new Router({
    prefix: '/api/product'
});

router.get('/', async (ctx, next) => {    

    ctx.body = await productBll.findAll();
});


module.exports = router.routes();