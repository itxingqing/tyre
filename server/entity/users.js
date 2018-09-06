const {
    INTEGER,
    STRING,
    DATE
} = require('sequelize');
// const sequelize = require('../utils/dbUtils');

module.exports = {
    name: 'users',
    columns: {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uanme: {
            type: STRING(64),
            allowNull: false
        },
        passwd: {
            type: STRING(128),
            allowNull: false
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
        tableName: 'users',
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
//     uanme: {
//         type: STRING(64),
//         allowNull: false
//     },
//     passwd: {
//         type: STRING(128),
//         allowNull: false
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
//     tableName: 'users',
//     timestamps: true,
//     createdAt: 'ct_time',
//     updatedAt: 'mfy_time',
// });

// module.exports = {
//     id: {
//         type: 'number'
//     },
//     uanme: {
//         type: 'string',
//         length: 64
//     },
//     passwd: {
//         type: 'string',
//         length: 128
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