const { typeDal } = require('../dal/index');

class TypeBll {

    async findAll(){
        var data = await typeDal.findAll();

        return data;
    }
}

module.exports = new TypeBll();