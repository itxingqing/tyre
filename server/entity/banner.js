const {
    INTEGER,
    STRING,
    DATE
} = require('sequelize');

module.exports = {
    name: 'banner',
    columns: {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        img: {
            type: STRING(128),
            allowNull: false
        },
        ct_time: {
            type: DATE
        },
        mfy_time: {
            type: DATE
        }
    },
    options: {
        tableName: 'banner',
        timestamps: true,
        createdAt: 'ct_time',
        updatedAt: 'mfy_time',
    }
}
