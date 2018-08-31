class Model {

    static init(option) {
        let that = this;
        that.db = option.db;

        delete option.db;

        let opString = JSON.stringify(option),
            op = JSON.parse(opString);

        that.name = op.name;
        that.schema = op.schema;
        that.columns = op.columns;
        that.fields = Object.keys(op.columns);
    }

    static getModelName() {
        return this.name;
    }

    static getSession() {
        return this.db.getConnection().getSchema(this.schema);
    }

    static getTable() {
        return this.getSession().getTable(this.name);
    }

    static buildParams(where) {
        let keys = Object.keys(where),
            arr = [];

        keys.forEach((item) => {
            arr.push(item + ' = :' + item);
        });

        return arr.join('and');
    }

    /**
     * @param {Object} where 条件
     * 
     * @return {Object} 返回row
     */
    static async findOne(where) {
        let that = this,
            row = null,
            error = null;

        try {
            row = await that.getTable()
                .select(that.fields)
                .where(that.buildParams(where))
                .bind(where)
                .execute()
                .limit(1);
        } catch (error) {
            error = error;
        }

        return (row, error);
    }

    static find(where, group, having, order, offset, limit) {
        let that = this,
            row = null,
            error = null,
            strCall = Object.prototype.toString.call;

        try {
            let findTemplate = that.getTable()
                .select(that.fields);                

            if (where) {

                if(strCall == '[object Array]'){
                    throw new Error('where条件不能是数组.');
                }

                if(strCall(where) == '[object String]'){
                    findTemplate.where(where)
                }else{
                    findTemplate.where(that.buildParams(where))
                    .bind(where)
                }
            }

            if (group) {

                if(strCall(group) == '[object String]'){
                    findTemplate.groupBy(group);
                }else if(strCall(group) == '[object Object]'){
                    let gpArr = [],
                        gpKeys = Object.keys(group);

                    gpKeys.forEach((item) =>{
                        if(group[item] == 'asc' || group[item] == 'desc'){
                            gpArr.push(item + ' ' + group[item]);
                        }else{
                            gpArr.push(item);
                        }
                    });

                    findTemplate.groupBy(gpArr);
                }

                if (having) {
                    findTemplate.having(having);
                }
            }

            if (order) {
                let odKeys = Object.keys(order),
                    odArr = [];

                odKeys.forEach((item) => {
                    let oValue = order[item].toLowerCase();

                    if(oValue == 'asc' || oValue == 'desc'){
                        odArr.push(item + ' ' + oValue);
                    }
                });

                findTemplate.orderBy(odArr);
            }

            if (offset && limit) {
                findTemplate.limit(limit, offset);
            } else if (offset) {
                findTemplate.limit(10000, offset);
            } else if (limit) {
                findTemplate.limit(limit, 0);
            }


        } catch (error) {
            error = error;
        }

        return (row, error);
    }

    static async add(obj) {
        let that = this,
            objArr = [],
            row = null,
            error = null;

        if (Object.prototype.toString.call(obj) == '[object Object]') {
            objArr = [obj];
        }

        try {
            let insertTemplate = await that.getTable()
                .insert(Object.keys(objArr[0]));

            objArr.forEach((item) => {
                insertTemplate.value(item);
            });

            row = await insertTemplate.execute();
        } catch (error) {
            error = error;
        }

        return {
            row,
            error
        };
    }

    static async update(value, where) {
        let that = this,
            row = null,
            error = null;

        try {
            let updateTemplate = that.getTable()
                .update(!!where) //是否更新全部
                .where(that.buildParams(where))
                .bind(where);

            let keys = Object.keys(value);

            keys.forEach((item) => {
                updateTemplate.set(item, value[item]);
            });

            row = await updateTemplate.execute();

        } catch (error) {
            error = error;
        }

        return {
            row,
            error
        };
    }

    static async delete(where) {
        let that = this,
            row = null,
            error = null;

        try {
            if (where == null) {
                throw new Error('delete方法的删除条件必须填写.')
            }

            row = await that.getTable()
                .delete()
                .where(that.buildParams(where))
                .bind(where)
                .execute();
        } catch (error) {
            error = error;
        }

        return {
            row,
            error
        };
    }

    static async deleteAll() {
        let that = this,
            row = null,
            error = null;

        try {
            row = await that.getTable()
                .delete("true")
                .execute();
        } catch (error) {
            error = error;
        }

        return {
            row,
            error
        };
    }

    static async execute(sql, params) {
        let that = this,
            row = null,
            error = null;

        try {
            row = await that.getSession()
                .sql(sql)
                .bind(params)
                .execute();
        } catch (error) {
            error = error;
        }

        return {
            row,
            error
        };
    }
}

module.exports = Model;