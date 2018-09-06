const { INTEGER, STRING, DATE, TEXT, JSON } = require('sequelize');
// const sequelize = require('../utils/dbUtils');
module.exports = {
    name: 'product',
    columns: {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        p_name: {
            type: STRING(128),
            defaultValue: ''
        },
        p_img: {
            type: JSON
        },
        ty_name: {
            type: STRING(128),
            defaultValue: ''
        },
        content: {
            type: TEXT,
            defaultValue: null
        },
        ct_user: {
            type: STRING(64),
            defaultValue: ''
        },
        ct_time: {
            type: DATE
        },
        mfy_user: {
            type: STRING(64),
            defaultValue: ''
        },
        mfy_time: {
            type: DATE
        }
    },
    options: {
        tableName: 'product',
        timestamps: true,
        createdAt: 'ct_time',
        updatedAt: 'mfy_time',
    }
}

//  module.exports = sequelize.define('product', {
//     id: {
//         type: INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     p_name: {
//         type: STRING(128),
//         defaultValue: ''
//     },
//     p_img: {
//         type: JSON
//     },
//     ty_name: {
//         type: STRING(128),
//         defaultValue: ''
//     },
//     content: {
//         type: TEXT,
//         defaultValue: null
//     },
//     ct_user: {
//         type: STRING(64),
//         defaultValue: ''
//     },
//     ct_time: {
//         type: DATE
//     },
//     mfy_user: {
//         type: STRING(64),
//         defaultValue: ''
//     },
//     mfy_time: {
//         type: DATE
//     }
// }, {
//     tableName: 'product',
//     timestamps: true,
//     createdAt: 'ct_time',
//     updatedAt: 'mfy_time',
// }); 

// module.exports = {
//     id: {
//         type: 'number'
//     },
//     p_name: {
//         type: 'string',
//         length: 128
//     },
//     p_img: {
//         type: 'object'
//     },
//     ty_name: {
//         type: 'string',
//         length: 128
//     },
//     content: {
//         type: 'string'
//     },
//     ct_user: {
//         type: 'string',
//         length: 64
//     },
//     ct_time: {
//         type: 'date',
//     },
//     mfy_user: {
//         type: 'string',
//         length: 64
//     },
//     mfy_time: {
//         type: 'date'
//     }

// }