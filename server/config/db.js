//http://docs.sequelizejs.com/manual/installation/getting-started.html、
module.exports = {
    database: 'tyre',
    username: 'root',
    password: 'mymysql',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    //连接池    
    pool: {
        min: 0,
        max: 100
    }
}