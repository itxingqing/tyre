const {
    users
} = require('../entity/index');

class UsersDal {

    async find(uname) {
        return await users.find({
            where: {
                uname
            }
        });
    }

    async findByID(id) {
        return await users.find({
            where: {
                id
            }
        });
    }

    async change_password(id, passwd) {

        return await users.update({
            passwd
        }, {
            where: {
                id
            }
        })
    }
}

module.exports = new UsersDal();