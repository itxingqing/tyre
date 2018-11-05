const {
    product
} = require('../entity/index');

class ProductDal {

    async findByPage(offset, limit) {
        return await product.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [
                ['ct_time', 'asc']
            ]
        });
    }

    async findByID(id) {
        return await product.find({
            where: {
                id: id
            }
        });
    }

    async add(obj) {
        return await product.create(obj)
    }

    async update(id, obj) {
        return await product.update({
            obj
        }, {
            where: {
                id: id
            }
        })
    }

    async delete(id) {
        return await product.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ProductDal();