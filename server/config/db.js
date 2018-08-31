//支持多个数据库
module.exports = [{
    name: 'localDB',    
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mymysql',
    schema: 'tyre',
    pool:{
        // min: 0,
        max: 20
    },
    default: true //默认的db
}]