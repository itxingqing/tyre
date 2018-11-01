const {
    banner
} = require('../entity/index');

class BannerDal {

    async findAll() {
        return await banner.findAll();
    }

    async delete(id) {
        return await banner.destroy({
            where: {
                id: id
            }
        });
    }

    async add(img_url) {
        let {
            dataValues
        } = await banner.create({
            img: img_url
        });

        return dataValues;
    }
}

module.exports = new BannerDal();