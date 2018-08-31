module.exports = {
    id: {
        type: 'number'
    },
    p_name: {
        type: 'string',
        length: 128
    },
    p_img: {
        type: 'object'
    },
    ty_name: {
        type: 'string',
        length: 128
    },
    content: {
        type: 'string'
    },
    ct_user: {
        type: 'string',
        length: 64
    },
    ct_time: {
        type: 'date',
    },
    mfy_user: {
        type: 'string',
        length: 64
    },
    mfy_time: {
        type: 'date'
    }

}