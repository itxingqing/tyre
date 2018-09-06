const { productDal } = require('../dal/index');

class ProductBll {

    async findAll(){
        var data = await productDal.findAll();

        return data;
    }
}

module.exports = new ProductBll();