const Sequlize = require('sequelize');
const sequelize = require('../utils/dbUtils');

module.exports = sequelize.define('type', {
    id: {
        type: Sequlize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uanme: {
        type: Sequlize.STRING(64),
        allowNull: false
    },
    passwd: {
        type: Sequlize.STRING(128),
        allowNull: false
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