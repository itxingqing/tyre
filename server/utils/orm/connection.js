const config = require('../config/db');
const msyqlx = require('@mysql/xdevapi');

class Connection{

    // constructor(options){
    //     this.host = options.host;
    //     this.port = options.port;
    //     this.user = options.user;
    //     this.password = options.password;
    // }

    static getConnection(options){
        let that = this;
        return await msyqlx.getSession(options);
    }   

    static closeConnection(connection){
        connection.close();
    }
}

module.exports = new Connection();