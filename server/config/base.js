const path = require('path');

module.exports = {
    uploadRemotePath: '/upload',
    uploadPath: path.join(__dirname, '../../client/dist/upload'),
    sessionConfig: {
        key: 'koa:sess',
        /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 10800000,
        autoCommit: true,
        /** （boolean）自动提交头文件（默认为true） */
        overwrite: true,
        /** (boolean) can overwrite or not (default true) */
        httpOnly: true,
        /**  true表示只有服务器端可以获取cookie */
        signed: true,
        /** 默认 签名 */
        rolling: true,
        /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）*/
        renew: false,
        /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    }
}