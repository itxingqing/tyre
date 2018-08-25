const banner = require('../entity/banner');

class bannerDal {

    async findAll() {
        return await banner.findAll();
    }

    save(banner) {
        let that = this;

        banner.create(banner).then((result) => {
            console.log('*****************')
        }).catch((err) => {
            console.log('666666666666666');
        });
    }

    async del(id) {
        return banner.destroy({
            id: id
        });
    }
}

module.exports = bannerDal;