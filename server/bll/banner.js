const { bannerDal } = require('../dal/index');

class BannerBll {

    async findAll(){
        var data = await bannerDal.findAll();

        return data;
    }
}

module.exports = new BannerBll();