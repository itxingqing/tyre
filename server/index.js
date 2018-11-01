const Koa = require('koa');
const path = require('path');
const static = require('koa-static')
const views = require('koa-views');
const helper = require('./utils/helper');
const koaBody = require('koa-body');
const session = require('koa-session');
const config = require('./config/base')

//注册全局的helper
global.helper = helper;

const app = new Koa();

//后面改成nginx映射
const staticPath = '../client/dist'
app.use(static(
    path.join(__dirname, staticPath)
))

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));

app.use(koaBody({
    multipart: true
}));

app.keys = ['d415daa5-5cfb-4864-ab73-457e5d478e46'];

app.use(session(config.sessionConfig, app));

helper.autoImportFile([
    path.resolve(__dirname, './api'),
    path.resolve(__dirname, './router')
], [], (fileContent, fileName) => {
    app.use(fileContent);
});


app.listen(8888);