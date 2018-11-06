import request from '../common/request';

//获取产品列表
export function get(data) {
    return request({
        url: '/product/list',
        method: 'get',
        params: data
    })
}

//根据id获取类型
export function getByID(data) {
    return request({
        url: '/product/get_by_id',
        method: 'get',
        params: data
    })
}

//新增产品
export function add(data) {
    return request({
        url: '/product/add',
        method: 'post',
        data: data
    })
}

//修改产品
export function edit(data) {
    return request({
        url: '/product/edit',
        method: 'post',
        data: data
    })
}

//删除产品
export function del(data) {
    return request({
        url: '/product/del',
        method: 'post',
        data: data
    })
}


//测试删除temp
// export function del_temp(data) {
//     return request({
//         url: '/product/del_temp',
//         method: 'get',
//         params: data
//     })
// }

