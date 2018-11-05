const {
    typeBll
} = require('../bll/index');
const Router = require('koa-router');
const router = new Router({
    prefix: '/api/type'
});

//从这里开始的方法都是需要登录权限
router.use(helper.authorize);

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

//获取列表
router.get('/list', async (ctx, next) => {
    let query = ctx.request.query,
        pageIndex = query.pageIndex,
        pageSize = query.pageSize;

    if (pageIndex < 0) {
        pageIndex = 1;
    }

    let list = await typeBll.findByPage(pageIndex, pageSize);
    ctx.body = helper.warpResponseParams(list, 0, '');
});

//根据id获取数据
router.get('/get_by_id', async (ctx, next) => {
    let query = ctx.request.query,
        id = query.id;

    if (id) {
        let data = await typeBll.findByID(id);

        ctx.body = helper.warpResponseParams(data, data ? 0 : 505, data ? '' : '记录不存在.');
    } else {
        ctx.body = helper.warpResponseParams({}, 500, '参数错误');
    }
})

//新增
router.post('/add', async (ctx, next) => {
    let body = ctx.request.body,
        data = {
            ty_name: helper.trim(body.ty_name),
            ty_i18n: {
                zh_cn: helper.trim(body.ty_i18n.zh_cn),
                en_us: helper.trim(body.ty_i18n.en_us)
            },
            ct_user: ctx._userInfo.uname
        }

    if (!data.ty_name || !data.ty_i18n.zh_cn || !data.ty_i18n.en_us) {
        ctx.body = helper.warpResponseParams([], 500, '参数错误');
    } else {
        let result = await typeBll.add(data);

        if (result.message) {
            ctx.body = helper.warpResponseParams({}, 506, result.message);;
        } else {
            ctx.body = helper.warpResponseParams(result.data, 0, '');;
        }
    }
});

//修改
router.post('/edit', async (ctx, next) => {
    let body = ctx.request.body,
        id = body.id,
        data = {
            ty_name: helper.trim(body.ty_name),
            ty_i18n: {
                zh_cn: helper.trim(body.ty_i18n.zh_cn),
                en_us: helper.trim(body.ty_i18n.en_us)
            },
            mfy_user: ctx._userInfo.uname
        }

    if (id) {
        let result = await typeBll.edit(id, data);
        ctx.body = helper.warpResponseParams(result.data, result.message == '' ? 0 : 506, result.message);
    } else {
        ctx.body = helper.warpResponseParams([], 500, '参数错误');
    }
});


//删除
router.post('/del', async (ctx, next) => {
    let id = ctx.request.body.id;

    if (id) {
        await typeBll.del(id);
        ctx.body = helper.warpResponseParams([], 0, '');

    } else {
        ctx.body = helper.warpResponseParams([], 500, '参数错误');
    }
});

module.exports = router.routes();