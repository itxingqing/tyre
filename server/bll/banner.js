const bannerDal = require('../dal/banner');

class bannerBll {

    findAll(){
        return bannerDal.findAll();
    }
}

console.log('***************');
console.log(bannerBll);

module.exports = bannerBll;