const {
    usersDal
} = require('../dal/index');

class UsersBll {

    async login(uname, passwd) {

        let data = await usersDal.find(uname),
            result = {
                id: null,
                pass: false
            };

        if (data && data.uname === uname && data.passwd === helper.sha1(passwd)) {
            result.pass = true;
            result.id = data.id;
        }

        return await result;
    }

    async change_password(id, oldPasswd, newPasswd) {
        let userInfo = (await usersDal.findByID(id)) || {},
            sha1oldPass = helper.sha1(oldPasswd),
            sha1newPass = helper.sha1(newPasswd),
            message = '';

        if (sha1oldPass != userInfo.passwd) {
            message = '请输入正确的旧密码';
        } else if (sha1oldPass != sha1newPass) {
            let effect = !!(await usersDal.change_password(id, sha1newPass));
            message = effect ? '' : '修改失败, 请重试.';
        }
        
        return message;
    }
}

module.exports = new UsersBll();