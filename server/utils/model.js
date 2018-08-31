module.exports = class Model {

    /**
     * @param {Object} options 
     *          name: model name
     *          db: 连接数据库
     */
    static init(options) {
        this._name = options.name;
        this.db = options.db;
        this.columns = options.columns;
        this.fields = Object.keys(options.columns);
    }

    /**
     * @return name: string，model的名字
     */
    static getModelName() {
        return this._name;
    }

    /**
     * @param {Object} where where对象
     * 
     * @return {String} 拼接完成的where条件
     * 
     * @private
     */
    static buildWhere(where) {
        let keys = Object.keys(where),
            arr = [];

        keys.forEach((item) => {
            arr.push(item + ' = :' + item);
        });

        return arr.join('and');
    }

    /**
     * @param {Objcet} where where条件
     * 
     * @return objcet
     *          row: object: 行数据
     *          error： object 错误信息
     */
    static async findOne(where) {
        let that = this,
            row = null,
            error = null;

        try {
            row = await db.getSchema()
                .getTable(that._name)
                .select(that.fields)
                .execute().offset(1);
        } catch (error) {
            error = error;
        }

        return { row, error }
    }

    /**
     * 
     * @param {Object} where where条件
     *          e.g: {
     *                  field: vlaue
     *               }
     * @param {Object} group groupby条件
     *          e.g {
     *                  
     *              }
     * @param {Object} order 
     * @param {Number} offset 
     * @param {Number} limit 
     */
    static async find(where, group, order, offset, limit){

    }

    static async execute(sql, params){
        
    }

    /**
     * findOne(where)
     * find({where, group, order, offset, limit})
     * countwhere)
     * 
     * add()
     * batchAdd()
     * 
     * update(where)
     * 
     * delete(where)
     * deleteAll()
     * 
     * execute(sql, params)
     * 
     */

}