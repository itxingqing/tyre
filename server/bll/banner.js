const {
    bannerDal
} = require('../dal/index');

class BannerBll {

    async findAll() {
        return await bannerDal.findAll();
    }

    async findByID(id){
        return await bannerDal.findByID(id);
    }

    async delete(id) {
        let data = await this.findByID(id),
            result = {
                img: '',
                act: true
            }

        if(data){
            result.img = data.img;
            result.act = !!(await bannerDal.delete(id));
        }

        return result;        
    }

    async add(obj) {
        return await bannerDal.add(obj);

    }
}

module.exports = new BannerBll();