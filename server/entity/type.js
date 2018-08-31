module.exports = {
    id: {
        type: 'number'
    },
    ty_name: {
        type: 'string',
        length: 128
    },
    ty_i18n: {
        type: 'object'
    },
    ct_user: {
        type: 'string',
        length: 64
    },
    ct_time: {
        type: 'date'
    },
    mfy_user: {
        type: 'string',
        length: 64
    },
    mfy_time: {
        type: 'date'
    }    
}