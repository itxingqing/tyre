const { product } = require('../entity/index');

class ProductDal {

    async findAll() {
        
        product.findAll().then(data => {
            console.log(data)
        })
        return "";
    }
}

module.exports = new ProductDal();