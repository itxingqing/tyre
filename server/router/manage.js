const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const router = new Router({
    prefix: '/manage'
});

router.get('/', async (ctx, next) => {    
    let managePath = path.join(helper.getClientPath(), './manage/index.html');

    ctx.body = await fs.readFileSync(managePath, {
        encoding: 'utf-8'
    });
});

module.exports = router.routes();