const Sequlize = require('sequelize');
const sequelize = require('../utils/dbUtils');

module.exports = sequelize.define('banner', {
    id: {
        type: Sequlize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    img: {
        type: Sequlize.STRING(128),
        allowNull: false
    }
});
