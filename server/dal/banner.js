const { banner } = require('../entity/index');

class BannerDal {

    async findAll() {
        
        banner.findAll().then(data => {
            console.log(data)
        })
        return "";
    }
}

module.exports = new BannerDal();