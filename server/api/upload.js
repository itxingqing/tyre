const Router = require('koa-router');
const router = new Router({
    prefix: '/upload'
});

router.get('/', async (ctx, next) => {    

    ctx.body = await typeBll.findAll();
});



module.exports = router.routes();