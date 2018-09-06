const { users } = require('../entity/index');

class UsersDal {

    async findAll() {
        
        users.findAll().then(data => {
            console.log(data)
        })
        return "";
    }
}

module.exports = new UsersDal();