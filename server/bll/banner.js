const {
    bannerDal
} = require('../dal/index');

class BannerBll {

    async findAll() {
        return await bannerDal.findAll();
    }

    async delete(id) {
        return !!(await bannerDal.delete(id));
    }

    async add(img_url) {
        return await bannerDal.add(img_url);

    }
}

module.exports = new BannerBll();