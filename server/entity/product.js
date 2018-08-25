const Sequlize = require('sequelize');
const sequelize = require('../utils/dbUtils');

module.exports = sequelize.define('product', {
    id: {
        type: Sequlize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    p_name: {
        type: Sequlize.STRING(128),
        defaultValue: ''
    },
    p_img: {
        type: Sequlize.JSON
    },
    ty_name: {
        type: Sequlize.STRING(128),
        defaultValue: ''
    },
    content: {
        type: Sequelize.TEXT,
        defaultValue: null
    },
    ct_user: {
        type: Sequlize.STRING(64),
        defaultValue: ''
    },
    ct_time: {
        type: Sequlize.DATE,
    },
    mfy_user: {
        type: Sequlize.STRING(64),
        defaultValue: ''
    },
    mfy_time: {
        type: Sequlize.DATE
    }
});