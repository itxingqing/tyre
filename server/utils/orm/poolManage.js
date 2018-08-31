const pool = require('./pool');
const config = require('../config/db');

class PoolManage {

    constructor(option) {
        let that = this,
            opStr = JSON.stringify(option);

        that.op = JSON.parse(opStr);

        //pools的对象列表
        that._polls = {};

        let strCall = Object.prototype.toString.call;

        if (strCall(op) == "[object Object]") {
            let poolOp = {
                name: op.name,
                host: op.host,
                port: op.port,
                user: op.user,
                password = op.password,
                // min: op.min,
                max: op.max
            };

            //默认的连接池
            that.defaulPool = poolOp.name || 0;

            that._polls[defaulPool] = new pool(poolOp);

        } else if (strCall(op) == "[object Array]") {

            op.forEach((item, idx) => {
                let poolOp = {
                        name: item.name,
                        host: item.host,
                        port: item.port,
                        user: item.user,
                        password = item.password,
                        // min: item.min,
                        max: item.max
                    },
                    poolKey = idx;

                if (item.default) {
                    poolKey = that.defaulPool = item.name;
                }

                that._polls[poolKey] = new pool(poolOp);
            });
        }
    }

    getDefaultPool(name) {
        let that = that;
        return that._polls[name || that.defaulPool];
    }
}

module.exports = new PoolManage(config);