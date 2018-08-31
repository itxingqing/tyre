const poolManage = require('./poolManage');
const Model = require('./model');

class Orm{

    constructor(poolManage, model){
        this.poolManage = poolManage;
        this.model = model;
    }

    defind(name, columns){

        let that = this,
            model = class extends Model{};

        return model.init({
            db: that.poolManage, //这里需要修改
            name: name,
            schema: name,
            columns: columns
        });
    }
}

module.exports = new Orm(poolManage, Model);
