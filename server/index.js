const Koa = require('koa');
const path = require('path');
const static = require('koa-static')
const views = require('koa-views');
const helper = require('./utils/helper');
// const favicon = require('koa-favicon');

//注册全局的helper
global.helper = helper;

const app = new Koa();

// app.use(favicon('../client/dist/favicon.ico'));

//后面改成nginx映射
const staticPath =  '../client/dist'
app.use(static(
    path.join(__dirname, staticPath)
))

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));

helper.autoImportFile([
    path.resolve(__dirname, './api'),
    path.resolve(__dirname, './router')

    // './api',
    // './router'
], (fileContent, fileName) => {
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

// app.use(ctx => {
//     ctx.body = '测试服务起';
// });

app.listen(8888);