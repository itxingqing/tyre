const {
    banner
} = require('../entity/index');

class BannerDal {

    async findAll() {
        return await banner.findAll({
            //设置别名
            attributes: ['id', ['img', 'url']],
            order: [
                ['ct_time', 'asc']
            ]
        });
    }

    async findByID(id) {
        return await banner.find({
            where: {
                id
            }
        })
    }

    async delete(id) {
        return await banner.destroy({
            where: {
                id: id
            }
        });
    }

    async add(obj) {
        let {
            dataValues
        } = await banner.create(obj);

        return dataValues;
    }
}

module.exports = new BannerDal();