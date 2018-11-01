const { productBll } = require('../bll/index');
const Router = require('koa-router');
const router = new Router({
    prefix: '/api/product'
});

//从这里开始的方法都是需要登录权限
router.use(helper.authorize);

//获取产品的列表
router.get('/list', async (ctx, next) => {    

    ctx.body = await productBll.findAll();
});

router.get('/:id', async (ctx, next) => {    

    ctx.body = await productBll.findAll();
});


router.post('/add', async (ctx, next) => {    

    ctx.body = await productBll.findAll();
});


router.put('/:id', async (ctx, next) => {    

    ctx.body = await productBll.findAll();
});


module.exports = router.routes();