import request from '../common/request';

//获取类型列表
export function get(data) {
    return request({
        url: '/type/get',
        method: 'get',
        data: data
    })
}

//新增类型
export function add(data) {
    return request({
        url: '/type/add',
        method: 'post',
        data: data
    })
}

//修改类型
export function edit(data) {
    return request({
        url: '/type/edit',
        method: 'post',
        data: data
    })
}

//删除类型
export function del(data) {
    return request({
        url: '/type/del',
        method: 'post',
        data: data
    })
}

