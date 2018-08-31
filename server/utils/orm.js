const msyqlx = require('@mysql/xdevapi');
const config = require('../config/db');

class Model {



    /**
     * @param {Object} where 条件
     * 
     * @return {Object} 返回row
     */
    static findOne(where) {
        

    }

    static find(where, group, order, offset, limit) {

    }


    static add(obj) {

    }


    static batchAdd(arr) {

    }


    static update() {

    }

    static delete(where) {

    }

    static deleteAll() {

    }

    static execute(sql, params) {

    }
}

class Orm {

    constructor(config) {
        this.host = config.host;
        this.port = config.port;
        this.user = config.user;
        this.password = config.password;
        this.schema = config.schema;

        this.modelManage = {};
    }

    async getSesson() {

    }

    async getSchema() {
        let that = this;
        return that.getSesson.getSchema(config.schema);
    }
                                                       
    /**
     * @param {String} name model的名字
     * 
     * @return {Object} Model 的对象
     */
    static getModel(name){


        return ;
    }

    static define(name, columns) {
        // let model = 
    }

}

module.exports = new Orm(config);