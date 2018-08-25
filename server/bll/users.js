const users = require('../entity/users');

class userDal{

    async findByID(id){
        return await users.find({
            where: {
                id: id
            }
        });
    }

    async findByName(){
        return await users.find({
            where: {
                uname: uname
            }
        });
    }

    
}

module.exports = userDal;