const {
    usersBll
} = require('../bll/index');
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
        result = await usersBll.login(helper.trim(body.username), body.password);

    if (result.pass) {
        ctx.session.userInfo = {
            id: result.id,
            uname: body.username
        }

        ctx.body = helper.warpResponseParams(ctx.session.userInfo, 0, '登录成功.');
    } else {
        ctx.body = helper.warpResponseParams([], 500, '账户或密码错误.');
    }
});

router.post('/logout', async (ctx, next) => {
    ctx._userInfo = ctx.session.userInfo = null;

    ctx.body = helper.warpResponseParams([], 0, '退出成功.');
});

//从这里开始的方法都是需要登录权限
router.use(helper.authorize);

router.post('/change_password',async (ctx, next) => {
    let body = ctx.request.body,
        oldPassword = body.oldPass,
        newPassword = body.newPass,
        newPasswordRe = body.newPassRe;

    if (!oldPassword || !newPassword || !newPasswordRe) {
        ctx.body = helper.warpResponseParams([], 500, '参数错误，请重试.');
        return;
    }

    if (newPassword != newPasswordRe) {
        ctx.body = helper.warpResponseParams([], 507, '新密码和重新输入的密码不一致.');
        return;
    }

    let message = await usersBll.change_password(ctx._userInfo.id, oldPassword, newPassword);

    ctx.body = helper.warpResponseParams([], (message == '' ? 0 : 507), message);

});

//获取用户信息
router.get('/get_userInfo', async (ctx, next) => {
    ctx.body = helper.warpResponseParams(ctx._userInfo, 0, '');
});

module.exports = router.routes();