const { type } = require('../entity/index');

class TypeDal {

    async findAll(offset, limit) {
        return await type.findAll({
            offset: offset,
            limit: limit
        });
    }

    async findByID(id) {
        return await type.find({
            where: {
                id: id
            }
        })
    }

    async add(obj) {
        return await type.create(obj)
    }

    async update(id, obj) {
        return await type.update({
            obj
        }, {
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