const Connection = require('./connection');

class Pool {

    constructor(option) {
        let opString = JSON.stringify(option),
            op = JSON.parse(opString);

        this.name = op.name; //pool name
        this.host = op.host;
        this.port = op.port;
        this.user = op.user;
        this.password = op.password;

        // this.min = op.min;
        this.max = op.max;

        this._connection = [];
    }

    getPoolName(){
        return this.poolName;
    }

    async checkConnection(connection) {
        let row = await connection.sql('select 1').execute();
        return row !== null;
    }

    getConnection() {
        let that = this,
            connection = null;

        if (that.connection.length) {
            connection = that._connection.splice(0);
        }

        if (!that.checkConnection(connection)) {
            try {
                connection = connection.getConnection({
                    password: that.password,
                    user: that.user,
                    host: that.host,
                    port: that.port
                });
            } catch (error) {
                throw new Error('获取连接失败.');
            }
        }

        return connection;
    }

    releaseConnection(connection) {
        let that = this;

        if (that.connection.length == that.max) {
            connection.close();
        } else {
            that._connection.push(connection);
        }
    }

}

module.exports = Pool;