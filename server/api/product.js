const {
    productBll
} = require('../bll/index');
const Router = require('koa-router');
const config = require('../config/base');
const fs = require('fs');
const path = require('path');
const router = new Router({
    prefix: '/api/product'
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

//获取产品的列表
router.get('/list', async (ctx, next) => {
    let query = ctx.request.query,
        pageIndex = query.pageIndex || 1,
        pageSize = query.pageSize || 1;

    if (pageIndex < 0) {
        pageIndex = 1;
    }

    let list = await productBll.findByPage(pageIndex, pageSize);
    ctx.body = helper.warpResponseParams(list, 0, '');
});

//根据id获取数据
router.get('/get_by_id', async (ctx, next) => {
    let query = ctx.request.query,
        id = query.id;

    if (id) {
        let data = await productBll.findByID(id);

        ctx.body = helper.warpResponseParams(data, data ? 0 : 505, data ? '' : '记录不存在.');
    } else {
        ctx.body = helper.warpResponseParams({}, 500, '参数错误');
    }
})

//新增
router.post('/add', async (ctx, next) => {
    let body = ctx.request.body,
        data = {
            p_name: helper.trim(body.p_name),
            p_img: body.p_img,
            ty_name: helper.trim(body.ty_name),
            content: helper.trim(body.content || ''),
            ct_user: ctx._userInfo.uname
        }

    if (!data.p_img.length) {
        ctx.body = helper.warpResponseParams({}, 506, '至少要上传一张图片');
    } else if (!data.p_name || !data.ty_name) {
        ctx.body = helper.warpResponseParams([], 500, '参数错误');
    } else {
        let result = await productBll.add(data);

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
            p_name: helper.trim(body.p_name),
            p_img: body.p_img,
            ty_name: helper.trim(body.ty_name),
            content: helper.trim(body.content || ''),
            mfy_user: ctx._userInfo.uname
        }

    if (id) {
        let result = await productBll.edit(id, data);
        ctx.body = helper.warpResponseParams(result.data, result.message == '' ? 0 : 507, result.message);
    } else {
        ctx.body = helper.warpResponseParams([], 500, '参数错误');
    }
});


//删除
router.post('/del', async (ctx, next) => {
    let id = ctx.request.body.id;

    if (id) {
        let message = await productBll.del(id);
        ctx.body = helper.warpResponseParams([], message == '' ? 0 : 508, message);

    } else {
        ctx.body = helper.warpResponseParams([], 500, '参数错误');
    }
});

//上传图片
router.post('/upload', async (ctx, next) => {
    let req = ctx.request,
        files = req.files;

    if (files instanceof Array) {
        ctx.body = helper.warpResponseParams([], 504, '每次只能上传一个文件.');
        return;
    }

    let file = files.file;

    if (!/^image\//.test(file.type)) {
        ctx.body = helper.warpResponseParams([], 504, '不能上传非图片文件.');
        return;
    }
    try {
        try {
            fs.statSync(config.uploadTempPath);
        } catch (error) {
            fs.mkdirSync(config.uploadTempPath);
        }

        let name = helper.guid(false),
            ext = path.extname(file.name),
            filename = path.join(config.uploadTempPath, name + ext),
            readStream = fs.createReadStream(file.path),
            writeStream = fs.createWriteStream(filename),
            remoteUrl = path.join(config.uploadTempRemotePath, name + ext);

        readStream.pipe(writeStream);

        ctx.body = helper.warpResponseParams({
            url: remoteUrl
        }, 0, '');

    } catch (e) {
        ctx.body = helper.warpResponseParams([], 504, '上传失败,请重试.');
    }

});

//删除上传temp文件, cron 晚上一点调用
router.get('/del_temp', async (ctx, next) => {
    let files = fs.readdirSync(config.uploadTempPath),
        expireTime = 1000 * 60 * 60 * 24 * 2;

    try {
        files.forEach((item) => {

            var fpath = path.resolve(config.uploadTempPath, item),
                fstat = fs.statSync(fpath),
                now = Date.now();

            //超过两天就删除
            if ((now - fstat.ctime.getTime()) > expireTime) {
                fs.unlinkSync(fpath);
            }
        });

    } catch (error) {}

    ctx.body = helper.warpResponseParams({}, 0, '');
})


module.exports = router.routes();