module.exports = {
    id: {
        type: 'number'
    },
    uanme: {
        type: 'string',
        length: 64
    },
    passwd: {
        type: 'string',
        length: 128
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