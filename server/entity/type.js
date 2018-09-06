const {
    INTEGER,
    STRING,
    DATE,
    JSON
} = require('sequelize');

module.exports = {
    name: 'type',
    columns: {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ty_name: {
            type: STRING(128),
            defaultValue: ''
        },
        ty_i18n: {
            type: JSON
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
        tableName: 'type',
        timestamps: true,
        createdAt: 'ct_time',
        updatedAt: 'mfy_time',
    }
}


// module.exports = sequelize.define('type', {
//     id: {
//         type: INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     ty_name: {
//         type: STRING(128),
//         defaultValue: ''
//     },
//     ty_i18n: {
//         type: JSON
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
//     tableName: 'type',
//     timestamps: true,
//     createdAt: 'ct_time',
//     updatedAt: 'mfy_time',
// });

// module.exports = {
//     id: {
//         type: 'number'
//     },
//     ty_name: {
//         type: 'string',
//         length: 128
//     },
//     ty_i18n: {
//         type: 'object'
//     },
//     ct_user: {
//         type: 'string',
//         length: 64
//     },
//     ct_time: {
//         type: 'date'
//     },
//     mfy_user: {
//         type: 'string',
//         length: 64
//     },
//     mfy_time: {
//         type: 'date'
//     }    
// }