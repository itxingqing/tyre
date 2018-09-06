const Koa = require('koa');
const path = require('path');
// const fs = require('fs');
const views = require('koa-views');
const helper = require('./utils/helper');

//注册全局的helper
global.helper = helper;

const app = new Koa();

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));

helper.autoImportFile([
    path.resolve(__dirname, './api'),
    path.resolve(__dirname, './router')

    // './api',
    // './router'
], (fileContent, fileName) =>{
    app.use(fileContent);
});

// const autoImportFile = function (app, paths) {
//     paths.forEach(p => {
//         var fileDir = path.resolve(__dirname, p),
//             fileList = fs.readdirSync(fileDir),
//             dirArr = [];

//         fileList.forEach(item => {
//             var file = path.resolve(fileDir, item);
//             stat = fs.statSync(file);

//             if (stat.isDirectory()) {
//                 dirArr.push(p + '/' + item);
//             } else if (/\.js$/.test(item)) {
//                 var mod = require(p + '/' + item);
//                 app.use(mod);
//             }
//         });

//         if (dirArr.length) {
//             autoImportFile(app, dirArr);
//         }
//     });
// }

// autoImportFile(app, [
//     './api',
//     './router'
// ]);

app.use(ctx => {
    ctx.body = '测试服务起';
});

app.listen(8888);