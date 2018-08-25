const bannerDll = require('../bll/banner');
const Router = require('koa-router');
const router = new Router({
    prefix: '/api/banner'
});

router.get('/', (ctx, next) => {
    console.log('&&&&&&&&&&&&&&&&&&')
    console.log(bannerDll.toString());

    ctx.body = bannerDll.findAll();
});



module.exports = router.routes();