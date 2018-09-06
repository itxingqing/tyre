const path = require('path');
const sequelize = require('../utils/dbUtils');

const models = {};

helper.autoImportFile([
    path.resolve(__dirname, './'),
], (fileContent, fileName, pathArray) =>{
    models[fileName.replace(/\.js$/, '')] = sequelize.define(fileContent.name, fileContent.columns, fileContent.options);;
});

module.exports = models;