const { usersDal } = require('../dal/index');

class UsersBll {

    async findAll(){
        var data = await usersDal.findAll();

        return data;
    }
}

module.exports = new UsersBll();