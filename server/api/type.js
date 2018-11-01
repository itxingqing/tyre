const { typeBll } = require('../bll/index');
const Router = require('koa-router');
const router = new Router({
    prefix: '/api/type'
});

//从这里开始的方法都是需要登录权限
router.use(helper.authorize);

router.get('/list', async (ctx, next) => {    

    ctx.body = await typeBll.findAll();
});

router.get('/:id', async (ctx, next) => {    

    ctx.body = await typeBll.findAll();
});


router.post('/add', async (ctx, next) => {    

    ctx.body = await typeBll.findAll();
});


router.put('/:id', async (ctx, next) => {    

    ctx.body = await typeBll.findAll();
});


module.exports = router.routes();