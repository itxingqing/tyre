module.exports = {
    database: 'tyre',
    username: 'postgres',
    password: 'mypg',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: true,
    //连接池    
    pool: {
        min: 0,
        max: 20
    }
} 

// //支持多个数据库
// // module.exports = [{        
// //     host: 'localhost',
// //     port: 3306,
// //     user: 'root',
// //     password: 'mymysql',
// //     schema: 'tyre',
// //     pool:{
// //         name: 'localDB',
// //         max: 20
// //     },
// //     default: true //默认的db
// // }]

// module.exports = {        
//     host: 'localhost',
//     port: 33060,
//     user: 'root',
//     password: 'mymysql',
//     schema: 'tyre',
//     pool:{
//         name: 'localDB',
//         max: 20
//     },
//     default: true //默认的db
// }