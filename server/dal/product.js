const {
    product
} = require('../entity/index');

class ProductDal {

    async findAll(offset, limit) {
        return await product.findAll({
            offset: offset,
            limit: limit
        });
    }

    async findByID(id) {
        return await product.find({
            where: {
                id: id
            }
        })
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