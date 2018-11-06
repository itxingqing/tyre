import request from '../common/request';

//获取类型列表
export function get(data) {
    return request({
        url: '/type/list',
        method: 'get',
        params: data
    })
}

//获取所有的列表
export function getAllType(data) {
    return request({
        url: '/type/get_all_type',
        method: 'get',
        params: data
    })
}

//根据id获取类型
export function getByID(data) {
    return request({
        url: '/type/get_by_id',
        method: 'get',
        params: data
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

