const { type } = require('../entity/index');

class TypeDal {

    async findAll() {
        
        type.findAll().then(data => {
            console.log(data)
        })
        return "";
    }
}

module.exports = new TypeDal();