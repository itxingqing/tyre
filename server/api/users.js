const { usersBll } = require('../bll/index');
const Router = require('koa-router');
const router = new Router({
    prefix: '/api/users'
});

//0 成功
//403未授权
//参数错误500
//新增错误501
//修改错误502
//删除错误503
//上传错误504
//查询失败505
//新增失败506
//修改失败507
//删除失败508

router.post('/login', async (ctx, next) => {    
    let body = ctx.request.body,
        result = await usersBll.login(body.uname, body.password);

    if(result.pass){
        ctx.session.userInfo = {
            id: result.id,
            uname: body.uname
        }

        ctx.body = helper.warpResponseParams([], 0, '登录成功.');
    }else{
        ctx.body = helper.warpResponseParams([], 500, '账户或密码错误.');
    }
});

router.post('/loginout', async (ctx, next) => {    
    ctx.body.__userInfo__ = ctx.session.userInfo = null;

    ctx.body = helper.warpResponseParams([], 0, '退出成功.');    
});

//从这里开始的方法都是需要登录权限
router.use(helper.authorize);

router.post('/change_password', async (ctx, next) => {
    let body = ctx.request.body,
        password = helper.trim(body.password);

    if(password){
        let rs = await usersBll.change_password(ctx._userInfo.id, password);

        if(rs){
            ctx.body = helper.warpResponseParams([], 0, '修改成功.');
        }else{
            ctx.body = helper.warpResponseParams([], 507, '修改失败，请重试.');
        }
        
    }else{
        ctx.body = helper.warpResponseParams([], 500, '参数错误.');
    }
    
});



module.exports = router.routes();