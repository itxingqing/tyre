const {
    typeDal
} = require('../dal/index');

class TypeBll {

    async findByPage(pageIndex, pageSize) {
        return await typeDal.findByPage((pageIndex - 1) * pageSize, pageSize);
    }

    async findByID(id) {
        return await typeDal.findByID(id);
    }

    async add(obj) {
        let ty_name = obj.ty_name,
            exists = !!await typeDal.findByTypeName(ty_name),
            result = {
                data: {},
                message: ''
            }

        if (exists) {
            result.message = '该类型已经存在.';
        } else {
            result.data = await typeDal.add(obj)
        }

        return result;
    }

    async edit(id, obj) {
        let data = await typeDal.findByID(id),
            tyData = await typeDal.findByTypeName(obj.ty_name),
            result = {
                data: null,
                message: ''
            };

        if(data){
            if(tyData && data.id != tyData.id){
                result.message = '该类型已经存在.';
            }else{
                !!await typeDal.update(id, obj);
                result.data = await typeDal.findByID(id);
            }
        }else{
            result.message = '记录不存在.';
        }

        return result;

    }

    async del(id) {
        return !!(await typeDal.delete(id));
    }
}

module.exports = new TypeBll();