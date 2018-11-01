const {
    bannerBll
} = require('../bll/index');
const Router = require('koa-router');
const config = require('../config/base');
const fs = require('fs');
const path = require('path');

const router = new Router({
    prefix: '/api/banner'
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

//从这里开始的方法都是需要登录权限
router.use(helper.authorize);

//获取上传图片的列表
router.get('/list', async (ctx, next) => {
    ctx.body = await bannerBll.findAll();
});

//删除图片
router.delete('/:id', async (ctx, next) => {
    let id = ctx.params.id;

    if (!id) {
        ctx.body = helper.warpResponseParams([], 500, '参数错误');
    } else {
        let result = await bannerBll.delete(id);
        ctx.body = helper.warpResponseParams([], 0, '');
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
        let stats = fs.statSync(config.uploadPath);

        if (!stats.isDirectory()) {
            fs.mkdirSync(config.uploadPath);
        }

        let name = helper.guid(false),
            ext = path.extname(file.name),
            filename = path.join(config.uploadPath, name + ext),
            readStream = fs.createReadStream(file.path),
            writeStream = fs.createWriteStream(filename),
            remoteUrl = path.join(config.uploadRemotePath, name + ext);

        readStream.pipe(writeStream);

        //save file
        let result = await bannerBll.add(remoteUrl);

        ctx.body = helper.warpResponseParams(result, 0, '');

    } catch (e) {
        ctx.body = helper.warpResponseParams([], 0, '上传失败,请重试.');
    }

});


module.exports = router.routes();