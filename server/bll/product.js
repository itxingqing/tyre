const { productDal } = require('../dal/index');

class ProductBll {

    async findByPage(pageIndex, pageSize){
        return await productDal.findByPage((pageIndex - 1) * pageSize, pageSize); 
    }

    async findByID(id) {
        return await productDal.findByID(id);
    }

    async add(obj){
        return await productDal.add(obj);
    }

    async edit(id, obj){
        let data = productDal.findByID(id),
            result = {
                data: null,
                message: ''
            };

        if(data){
            !!await productDal.update(id, obj);
            result.data = await productDal.findByID(id);
        }else{
            result.message = '记录不存在';
        }

        return result.message;
    }

    async del(id){
        return !!(await productDal.delete(id));
    }
}

module.exports = new ProductBll();