const Sequlize = require('sequelize');
const sequelize = require('../utils/dbUtils');

module.exports = sequelize.define('type', {
    id: {
        type: Sequlize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ty_name: {
        type: Sequlize.STRING(128),
        defaultValue: ''
    },
    ty_i18n: {
        type: Sequlize.JSON
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