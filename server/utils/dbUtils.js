const Sequlize = require('sequelize');
const config = require('../config/db');
module.exports = new Sequlize(
    config.database,
    config.username,
    config.password, {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        pool: config.pool,
        logging: config.logging,
        operatorsAliases: false
    }
);