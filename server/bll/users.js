const { usersDal } = require('../dal/index');

class UsersBll {

    async login(uname, passwd){
        let data = await usersDal.findAll(uname),
            result = {
                id: null,
                pass: false
            };

        if(data.uname === uname && data.passwd === passwd){
            result.pass = true;
            result.id = data.id;
        }

        return result;
    }

    async change_password(id, passwd){
        return await usersDal.change_password(id, helper.sha1(passwd));
    }
}

module.exports = new UsersBll();