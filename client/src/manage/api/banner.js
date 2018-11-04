
import request from '../common/request';

//获取封面的列表
export function get(data) {
    return request({
        url: '/banner/list',
        method: 'get',
        data: data
    })
}

//删除封面
export function del(data){
    return request({
        url: '/banner/del',
        method: 'post',
        data: data
    })
}