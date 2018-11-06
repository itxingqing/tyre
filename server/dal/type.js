const { type } = require('../entity/index');

class TypeDal {

    async findByPage(offset, limit) {
        return await type.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [
                ['ct_time', 'asc']
            ]
        });
    }

    async findAllType() {
        return await type.findAll({
            attributes: ['ty_name'],
            order: [
                ['ct_time', 'asc']
            ]
        });
    }

    async findByID(id) {
        return await type.find({
            where: {
                id: id
            }
        });
    }

    async findByTypeName(ty_name){
        return await type.find({
            where: {
                ty_name
            }
        })
    }

    async add(obj) {
        return await type.create(obj)
    }

    async update(id, obj) {
        return await type.update(obj, {
            where: {
                id: id
            }
        })
    }

    async delete(id) {
        return await type.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new TypeDal();