const { bannerBll } = require('../bll/index');
const Router = require('koa-router');
const router = new Router({
    prefix: '/api/banner'
});

router.get('/', async (ctx, next) => {    

    ctx.body = await bannerBll.findAll();
});


module.exports = router.routes();