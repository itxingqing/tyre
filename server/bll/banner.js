const bannerDal = require('../dal/banner');

class bannerBll {

    findAll(){
        return bannerDal.findAll();
    }
}

module.exports = new bannerBll();