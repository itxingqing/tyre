
import request from '../common/request';

//登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

//登出
export function logout(data) {
    return request({
        url: '/user/logout',
        method: 'post',
        data: data
    })
}

//修改密码
export function changePassword(data) {
    return request({
        url: '/user/chang_password',
        method: 'post',
        data: data
    })
}