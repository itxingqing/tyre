const {
    users
} = require('../entity/index');

class UsersDal {

    async find(uname) {
        return await users.find({
            where: {
                uname: uname
            }
        });
    }

    async change_password(id, password) {

        return await users.update({
            password: password
        }, {
            where: {
                id: id
            }
        })
    }
}

module.exports = new UsersDal();